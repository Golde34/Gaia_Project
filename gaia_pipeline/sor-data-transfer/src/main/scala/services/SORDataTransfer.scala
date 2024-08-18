package services

import scala.collection.mutable.ArrayBuffer
import entities.LabelEntity
import entities.SpacyData
import kernel.utils.TextPreprocessing.{
  removeSpecialCharacters,
  stem,
  stemWithPositionMapping,
  stemStrings
}

import scala.collection.mutable
import java.awt.Label

object SORDataTransfer {

  def writeOutputToJSONFile(): Unit = {
    val data = Seq(
      (
        "Please set a task in the Artemis project, about creating a user feedback system. This is an important task but not urgent.",
        "Artemis",
        "creating a user feedback system",
        "Medium",
        "Pending",
        "null",
        "null",
        "null"
      ),
      (
        "Create task to verify database integrity after recent updates. This is a star priority.",
        "null",
        "verifying database integrity",
        "Star",
        "In Progress",
        "now",
        "null",
        "null"
      )
    )

    val spacyDataset = data.map(processRow)

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

    val outputFilePath = os.pwd / "spacy_dataset.json"
    if (outputFilePath != null) os.remove(outputFilePath)
    os.write(outputFilePath, ujson.write(ujson.Arr(jsonOutput: _*)))

    println(s"Data written to $outputFilePath")

    // Beautify json file and print
    val jsonContent = os.read(outputFilePath)
    val jsonParsed = ujson.read(jsonContent)
    println(ujson.write(jsonParsed, indent = 4))
  }

  def processRow(
      row: (String, String, String, String, String, String, String, String)
  ): SpacyData = {
    val (
      sentence,
      project,
      title,
      priority,
      status,
      startDate,
      deadline,
      duration
    ) = row

    val labels = ArrayBuffer[LabelEntity]()

    // Find positions of each entity
    if (project != "null") {
      findEntityPositions(sentence, project, "PROJECT").foreach(labels += _)
    }
    if (title != "null") {
      findEntityPositions(sentence, title, "TASK").foreach(labels += _)
    }
    if (priority != "null") {
      priority match {
        case "Star"   => labels += LabelEntity(0, 0, "STAR")
        case "Medium" => labels += LabelEntity(0, 0, "MEDIUM")
        case "Low"    => labels += LabelEntity(0, 0, "LOW")
        case _        => labels += LabelEntity(0, 0, "UNKNOWN")
      }
    }
    if (status != "null") {
      status match {
        case "To do"       => labels += LabelEntity(0, 0, "TO_DO")
        case "Pending"     => labels += LabelEntity(0, 0, "PENDING")
        case "In Progress" => labels += LabelEntity(0, 0, "IN_PROGRESS")
        case "Completed"   => labels += LabelEntity(0, 0, "COMPLETED")
        case _             => labels += LabelEntity(0, 0, "UNKNOWN")
      }
    }
    if (startDate != "null") {
      findEntityPositions(sentence, startDate, "START_DATE").foreach(
        labels += _
      )
    }
    if (deadline != "null") {
      findEntityPositions(sentence, deadline, "DEADLINE").foreach(labels += _)
    }
    if (duration != "null") {
      findEntityPositions(sentence, duration, "DURATION").foreach(labels += _)
    }

    SpacyData(sentence, labels.toSeq) // Convert ArrayBuffer to Seq
  }

  def findEntityPositions(
      sentence: String,
      entityValue: String,
      label: String
  ): Option[LabelEntity] = {
    if (entityValue == "null") {
      return None
    }
    val preProcessingSentence = removeSpecialCharacters(sentence) 
    val (stemmedSentence, positionMapping) = stemWithPositionMapping(preProcessingSentence)
    val stemmedEntityValue = stemStrings(entityValue)

    val entity = findLabelInStemmedSentence(
      stemmedSentence,
      stemmedEntityValue,
      positionMapping,
      sentence,
      label 
    )
    println(s"entity: $entity")

    return entity
  }

  def findLabelInStemmedSentence(
      stemmedSentence: String,
      stemmedLabel: String,
      originalMapping: mutable.Map[Int, String],
      originalSentence: String,
      label: String
  ): Option[LabelEntity] = {
    println(s"stemmedSentence: $stemmedSentence")
    println(s"stemmedLabel: $stemmedLabel")
    val wordsInSentence = stemmedSentence.split(" ")
    val wordsInLabel = stemmedLabel.split(" ")

    var currentWordIndex = 0
    var startPosOriginal = -1
    var endPosOriginal = -1
    var wordsMatched = 0

    for (i <- wordsInSentence.indices) {
      println(s"After for loop wordsMatch: $wordsMatched")
      println(s"wordsInSentence(i): ${wordsInSentence(i)} with i = $i")
      println(s"wordsInLabel(wordsMatched): ${wordsInLabel(wordsMatched)}")
      println(wordsMatched < wordsInLabel.length)
      println(wordsInSentence(i) == wordsInLabel(wordsMatched))
      if (
        wordsMatched < wordsInLabel.length &&
        wordsInSentence(i) == wordsInLabel(wordsMatched)
      ) {
        println(s"wordsMatched: $wordsMatched")
        println(s"wordsInLabel.length: ${wordsInLabel.length}")
        if (startPosOriginal == -1) {
          startPosOriginal = i
        }
        wordsMatched += 1
        endPosOriginal = i

        // Nếu đã khớp toàn bộ nhãn, kết thúc vòng lặp
        if (wordsMatched == wordsInLabel.length) {
          println(s"startPosOriginal: $startPosOriginal")
          println(s"endPosOriginal: $endPosOriginal")
          println(s"originalMapping: $originalMapping")
          println(s"originalSentence: $originalSentence")
          println(s"wordsMatched: $wordsMatched")


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
          
          println(s"originalStart: $originalStart")
          println(s"originalEnd: $originalEnd")

          return Some(LabelEntity(originalStart, originalEnd, label))
        }
      } else if (wordsMatched > 0) {
        // Nếu một phần của nhãn đã khớp nhưng từ tiếp theo không khớp, reset lại
        wordsMatched = 0
        startPosOriginal = -1
        endPosOriginal = -1
      }
    }

    None
  }

  def getOriginalPosition(stemmedIndex: Int, originalMapping: mutable.Map[Int, String], originalSentence: String): Int = {
    val wordsInOriginalSentence = originalSentence.split(" ")

    // Tính toán độ dài của các từ trước từ hiện tại để xác định vị trí bắt đầu
    var position = 0
    for (i <- 0 until stemmedIndex) {
      position += wordsInOriginalSentence(i).length + 1 // +1 để tính khoảng trắng
    }

    position
  }
}
