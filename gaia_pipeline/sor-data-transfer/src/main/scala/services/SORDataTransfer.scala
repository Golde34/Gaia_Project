package services

import scala.collection.mutable.ArrayBuffer
import scala.collection.immutable.ArraySeq
import scala.collection.mutable
import java.awt.Label

import domains.LabelEntity
import domains.SpacyData
import utils.TextPreprocessing.{
  removeSpecialCharacters,
  stem,
  stemWithPositionMapping,
  stemStrings,
  lowerCase
}
import database.TaskDatabaseService
import database.TaskData
import utils.SORCSVUtils.{readSORCSV, writeSORCSV}
import utils.SORJsonUtils.writeJsonFile
import os.write
import utils.SORCSVUtils.writeSORCSV2

object SORDataTransfer {

  def saveOutputToDatabase(): Unit = {
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
            "label" -> e.label
          )
        }
      )
    }

    // Write JSON output to file
    writeJsonFile("spacy_dataset.json", jsonOutput, isPrintedOutput = true)

    // writeSORCSV("spacy_dataset_old.csv", jsonOutput)
    val outputLocation = os.pwd / os.up / os.up / "data_lake" / "task_detection" / "spacy_dataset.csv"
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
      findEntityPositions(sentence, project, "PROJECT").foreach(labels += _)
    }
    if (groupTask != "null") {
      // labels += LabelEntity(0, 0, "GROUPTASK")
      findEntityPositions(sentence, groupTask, "GROUPTASK").foreach(labels += _)
    }
    if (title != "null") {
      findEntityPositions(sentence, title, "TASK").foreach(labels += _)
    }
    if (priority != "null") {
      lowerCase(priority) match {
        case "star"   => labels += LabelEntity(0, 0, "STAR")
        case "high"   => labels += LabelEntity(0, 0, "HIGH")
        case "medium" => labels += LabelEntity(0, 0, "MEDIUM")
        case "low"    => labels += LabelEntity(0, 0, "LOW")
      }
    }
    if (status != "null") {
      lowerCase(status) match {
        case "to do"       => labels += LabelEntity(0, 0, "TO_DO")
        case "pending"     => labels += LabelEntity(0, 0, "PENDING")
        case "in progress" => labels += LabelEntity(0, 0, "IN_PROGRESS")
        case "done"        => labels += LabelEntity(0, 0, "DONE")
      }
    }
    if (startDate != "null") {
      labels += LabelEntity(0, 0, "STARTDATE")
    }
    if (deadline != "null") {
      labels += LabelEntity(0, 0, "DEADLINE")
    }
    if (duration != "null") {
      findEntityPositions(sentence, duration, "DURATION").foreach(labels += _)
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
      sentence: String,
      entityValue: String,
      label: String
  ): Option[LabelEntity] = {
    if (entityValue == "null") {
      return None
    }
    val preprocessingSentence = preprocessSentence(sentence)
    val preProcessingEntityValue = preprocessSentence(entityValue)

    val (stemmedSentence, positionMapping) = stemWithPositionMapping(
      preprocessingSentence
    )
    val stemmedEntityValue = stemStrings(preProcessingEntityValue)
    val entity = findLabelInStemmedSentence(
      stemmedSentence,
      stemmedEntityValue,
      positionMapping,
      sentence,
      label
    )

    return entity
  }

  def preprocessSentence(sentence: String): String = {
    var preProcessingSentence = removeSpecialCharacters(sentence)
    preProcessingSentence = lowerCase(preProcessingSentence)
    return preProcessingSentence
  }

  def findLabelInStemmedSentence(
      stemmedSentence: String,
      stemmedLabel: String,
      originalMapping: mutable.Map[Int, String],
      originalSentence: String,
      label: String
  ): Option[LabelEntity] = {
    val wordsInSentence = stemmedSentence.split(" ")
    val wordsInLabel = stemmedLabel.split(" ")

    var currentWordIndex = 0
    var startPosOriginal = -1
    var endPosOriginal = -1
    var wordsMatched = 0

    for (i <- wordsInSentence.indices) {
      if (
        wordsMatched < wordsInLabel.length &&
        wordsInSentence(i) == wordsInLabel(wordsMatched)
      ) {
        if (startPosOriginal == -1) {
          startPosOriginal = i
        }
        wordsMatched += 1
        endPosOriginal = i

        if (wordsMatched == wordsInLabel.length) {
          val originalStart = getOriginalPosition(
            startPosOriginal,
            originalMapping,
            originalSentence
          )
          val originalEnd = getOriginalPosition(
            endPosOriginal,
            originalMapping,
            originalSentence
          ) + originalMapping(endPosOriginal).length

          return Some(LabelEntity(originalStart, originalEnd, label))
        }
      } else if (wordsMatched > 0) {
        wordsMatched = 0
        startPosOriginal = -1
        endPosOriginal = -1
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
}
