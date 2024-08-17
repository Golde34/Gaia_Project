package services

import scala.collection.mutable.ArrayBuffer
import entities.LabelEntity
import entities.SpacyData
import kernel.utils.TextPreprocessing.{stem, stemWithPositionMapping}

import scala.collection.mutable


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
      findEntityPositions2(sentence, title, "TASK").foreach(labels += _)
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
    val startPos = sentence.indexOf(entityValue)
    if (startPos != -1) {
      val endPos = startPos + entityValue.length
      Some(LabelEntity(startPos, endPos, label))
    } else {
      None
    }
  }

  def findEntityPositions2(sentence: String, entityValue: String, label: String): Option[LabelEntity] = {
    val (stemmedSentence, positionMapping) = stemWithPositionMapping(sentence)
    val stemmedEntityValue = stemWithPositionMapping(entityValue)._1

    // Tìm vị trí của cụm từ đã stemmed trong câu stemmed
    val startPosStemmed = stemmedSentence.indexOf(stemmedEntityValue)
    if (startPosStemmed != -1) {
      val endPosStemmed = startPosStemmed + stemmedEntityValue.length - 1

      // Chuyển đổi vị trí stemmed về vị trí thực trong câu gốc
      val originalPositions = stemmedSentence.split(" ").zipWithIndex.flatMap {
        case (word, idx) =>
          if (stemmedEntityValue.contains(word) && positionMapping.contains(idx)) {
            Some(idx -> positionMapping(idx))
          } else {
            None
          }
      }

      // Tìm vị trí thực sự trong câu gốc
      val startPosOriginal = originalPositions.headOption.map(_._1).getOrElse(startPosStemmed)
      val endPosOriginal = originalPositions.lastOption.map(_._1).getOrElse(endPosStemmed)

      Some(LabelEntity(startPosOriginal, endPosOriginal, label))
    } else {
      None
    }
  }
}
