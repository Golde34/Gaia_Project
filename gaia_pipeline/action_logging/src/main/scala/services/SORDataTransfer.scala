package services

import scala.collection.mutable.ArrayBuffer
import scala.collection.immutable.ArraySeq
import scala.collection.mutable
import java.awt.Label

import domains.LabelEntity
import domains.SpacyData
import kernel.utils.TextPreprocessing.{
  removeSpecialCharacters,
  stem,
  stemWithPositionMapping,
  stemStrings,
  lowerCase
}
import database.TaskDatabaseService
import database.TaskData
import kernel.utils.SORCSVUtils.{readSORCSV, writeSORCSV}
import kernel.utils.SORJsonUtils.writeJsonFile
import os.write
import kernel.utils.SORCSVUtils.writeSORCSV2
import kernel.utils.TextPreprocessing.deleteStopWords

object SORDataTransfer {

  def saveOutputToDatabase(): Unit = {
    // Get last record store in database
    TaskDatabaseService.init()
    val lastRecord: Option[Int] = TaskDatabaseService.getLastSentenceId();
    // Dữ liệu đầu vào
    val location =
      os.pwd / os.up / os.up / "data_lake" / "task_detection" / "NER_Task_Assistant_Dataset.csv"
    val data = readSORCSV(location)

    // Store processed data to MySQL database
    TaskDatabaseService.init()
    data.foreach { row =>
      TaskDatabaseService.insert(
        sentenceId = Some(row._1.toInt),
        sentence = removeSpecialCharacters(row._2),
        project = row._3,
        groupTask = Some(row._4),
        title = row._5,
        priority = row._6,
        status = row._7,
        startDate = Some(row._8),
        deadline = Some(row._9),
        duration = Some(row._10),
        taskId = None,
        scheduleTaskId = None,
        taskConfigId = None,
        isDataLakeSync = true
      )
    }
  }

  def saveOutputToDataLake(): Unit = {
    // Get last record store in database
    TaskDatabaseService.init()
    val lastRecord: Option[Int] = TaskDatabaseService.getLastSentenceId();
    // Read data from file location
    val location =
      os.pwd / os.up / os.up / "data_lake" / "task_detection" / "NER_Task_Assistant_Dataset.csv"
    val data = readSORCSV(location)

    // Process data with EntityFinder
    val spacyDataset = data.map(EntityFinder.processRow)

    // Convert processed data to JSON
    val jsonOutput = spacyDataset.map { spacyData =>
      ujson.Obj(
        "sentence" -> spacyData.sentence,
        "labels" -> spacyData.labels.map { e =>
          ujson.Obj(
            "start" -> e.start,
            "end" -> e.end,
            "label" -> e.label,
            "value" -> e.value
          )
        }
      )
    }

    // Write JSON output to file
    writeJsonFile("spacy_dataset.json", jsonOutput, isPrintedOutput = true)

    // writeSORCSV("spacy_dataset_old.csv", jsonOutput)
    val outputLocation =
      os.pwd / os.up / os.up / "data_lake" / "task_detection" / "spacy_dataset.csv"
    writeSORCSV2(outputLocation, jsonOutput)
    val spacyDatasetLocation = os.pwd / "spacy_dataset.csv"
    writeSORCSV2(spacyDatasetLocation, jsonOutput)
  }
}

object EntityFinder {

  def processRow(
      row: (
          String,
          String,
          String,
          String,
          String,
          String,
          String,
          String,
          String,
          String
      )
  ): SpacyData = {
    val (
      sentenceId,
      sentence,
      project,
      groupTask,
      title,
      priority,
      status,
      startDate,
      deadline,
      duration
    ) = row

    val labels = ArrayBuffer[LabelEntity]()

    // Remove special " characters from start and end of the sentence
    val modifiedSentence = removeQuotationMark(sentence)

    // Find positions of each entity
    if (project != "null") {
      findEntityPositions(sentenceId, modifiedSentence, project, "PROJECT")
        .foreach(labels += _)
    }
    if (title != "null") {
      findEntityPositions(sentenceId, modifiedSentence, title, "TASK")
        .foreach(labels += _)
    }
    if (groupTask != "null") {
      // labels += LabelEntity(0, 0, "GROUPTASK", groupTask)
      val groupTaskLabel = findEntityPositions(sentenceId, modifiedSentence, groupTask, "GROUPTASK")
      if (isOverlapping(labels, groupTaskLabel)) {
        println(
          s"Overlapping detected: $groupTaskLabel \nSentence: $modifiedSentence (sentenceId: $sentenceId)"
        )
      } else {
        groupTaskLabel.foreach(labels += _)
      }
    }
    if (priority != "null") {
      lowerCase(priority) match {
        case "star"   => labels += LabelEntity(0, 0, "PRIORITY", "STAR")
        case "high"   => labels += LabelEntity(0, 0, "PRIORITY", "HIGH")
        case "medium" => labels += LabelEntity(0, 0, "PRIORITY", "MEDIUM")
        case "low"    => labels += LabelEntity(0, 0, "PRIORITY", "LOW")
      }
    }
    if (status != "null") {
      lowerCase(status) match {
        case "to do"   => labels += LabelEntity(0, 0, "STATUS", "TO_DO")
        case "pending" => labels += LabelEntity(0, 0, "STATUS", "PENDING")
        case "in progress" =>
          labels += LabelEntity(0, 0, "STATUS", "IN_PROGRESS")
        case "done" => labels += LabelEntity(0, 0, "STATUS", "DONE")
      }
    }
    if (startDate != "null") {
      labels += LabelEntity(0, 0, "STARTDATE", startDate)
    }
    if (deadline != "null") {
      labels += LabelEntity(0, 0, "DEADLINE", deadline)
    }
    if (duration != "null") {
      findEntityPositions(sentenceId, modifiedSentence, duration, "DURATION")
        .foreach(
          labels += _
        )
    }
    SpacyData(modifiedSentence, labels.toSeq)
  }

  def removeQuotationMark(sentence: String): String = {
    if (sentence.startsWith("\"") && sentence.endsWith("\"")) {
      return sentence.substring(1, sentence.length - 1)
    }
    return sentence
  }

  def findEntityPositions(
      sentenceId: String,
      sentence: String,
      entityValue: String,
      label: String
  ): Option[LabelEntity] = {
    if (entityValue == "null") {
      return None
    }
    val preprocessingSentence = preprocessSentence(sentence)
    val preProcessingEntityValue = preprocessSentence(entityValue)

    val stemmedSentence = stemWithPositionMapping(preprocessingSentence)
    val positionMapping = mapStemToOriginal(stemmedSentence, sentence)
    val stemmedEntityValue = stemStrings(preProcessingEntityValue)

    val entity = findLabelInSentence(
      positionMapping,
      stemmedEntityValue,
      sentence,
      label
    )

    if (entity.isEmpty && label == "TASK") {
      println(
        s"Cannot find entity: $stemmedEntityValue \nSentence: $stemmedSentence (sentenceId: $sentenceId)"
      )
    }

    return entity
  }

  def preprocessSentence(sentence: String): String = {
    var preProcessingSentence = removeSpecialCharacters(sentence)
    preProcessingSentence = lowerCase(preProcessingSentence)
    preProcessingSentence = deleteStopWords(preProcessingSentence)
    return preProcessingSentence
  }

  def mapStemToOriginal(
      stemSentence: String,
      originalSentence: String
  ): mutable.Map[Int, String] = {
    val stemWords = stemSentence.split(" ")
    val originalWords = originalSentence.split(" ")

    val result = mutable.Map[Int, String]()

    for (index <- originalWords.indices) {
      val originalWord = originalWords(index)
      if (stemWords.contains(stem(preprocessSentence(originalWord)))) {
        result(index) = preprocessSentence(
          originalWord
        )
      }
    }

    result
  }

  def findLabelInSentence(
      positionMapping: mutable.Map[Int, String],
      stemmedEntityValue: String,
      sentence: String,
      label: String
  ): Option[LabelEntity] = {
    val wordsInLabel = stemmedEntityValue.split(" ")

    var currentWordIndex = 0;
    var startPosOriginal = -1;
    var endPosOriginal = -1;
    var wordsMatched = 0;

    for (word <- positionMapping) {
      if (
        wordsMatched < wordsInLabel.length
        && stem(word._2) == wordsInLabel(wordsMatched)
      ) {
        if (startPosOriginal == -1) {
          startPosOriginal = word._1;
        }
        wordsMatched += 1;
        endPosOriginal = word._1;

        if (wordsMatched == wordsInLabel.length) {
          val originalStart =
            getOriginalPosition(startPosOriginal, positionMapping, sentence);
          val originalEnd =
            getOriginalPosition(
              endPosOriginal,
              positionMapping,
              sentence
            ) + positionMapping(endPosOriginal).length;
          return Some(
            LabelEntity(originalStart, originalEnd, label, stemmedEntityValue)
          );
        }
      } else if (wordsMatched > 0) {
        wordsMatched = 0;
        startPosOriginal = -1;
        endPosOriginal = -1;
      }
    }
    None
  }

  def getOriginalPosition(
      stemmedIndex: Int,
      originalMapping: mutable.Map[Int, String],
      originalSentence: String
  ): Int = {
    val wordsInOriginalSentence = originalSentence.split(" ")

    var position = 0
    for (i <- 0 until stemmedIndex) {
      position += wordsInOriginalSentence(
        i
      ).length + 1
    }
    position
  }

  def isOverlapping(
      labels: ArrayBuffer[LabelEntity],
      newLabel: Option[LabelEntity]
  ): Boolean = {
    if (newLabel.isEmpty) {
      return false
    }
    for (label <- labels) {
      if (
        label.start <= newLabel.get.start
        && newLabel.get.start <= label.end
      ) {
        return true
      }
      if (
        label.start <= newLabel.get.end
        && newLabel.get.end <= label.end
      ) {
        return true
      }
    }
    return false
  }
}
