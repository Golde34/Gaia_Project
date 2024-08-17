package services

import scala.collection.mutable.ArrayBuffer
import entities.LabelEntity
import entities.SpacyData

object SORDataTransfer {

  def findEntityPosisions(
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
      findEntityPosisions(sentence, project, "PROJECT").foreach(labels += _)
    }
    if (title != "null") {
      findEntityPosisions(sentence, title, "TASK").foreach(labels += _)
    }
    if (priority != "null") {
      priority match {
        case "Star" => labels += LabelEntity(0, 0, "STAR")
        case "Medium" => labels += LabelEntity(0, 0, "MEDIUM")
        case "Low" => labels += LabelEntity(0, 0, "LOW")
        case _ => labels += LabelEntity(0, 0, "UNKNOWN")
      }
    }
    if (status != "null") {
      status match {
        case "To do" => labels += LabelEntity(0, 0, "TO_DO")
        case "Pending" => labels += LabelEntity(0, 0, "PENDING")
        case "In Progress" => labels += LabelEntity(0, 0, "IN_PROGRESS")
        case "Completed" => labels += LabelEntity(0, 0, "COMPLETED")
        case _ => labels += LabelEntity(0, 0, "UNKNOWN")
      }
    }
    if (startDate != "null") {
      findEntityPosisions(sentence, startDate, "START_DATE").foreach(
        labels += _
      )
    }
    if (deadline != "null") {
      findEntityPosisions(sentence, deadline, "DEADLINE").foreach(labels += _)
    }
    if (duration != "null") {
      findEntityPosisions(sentence, duration, "DURATION").foreach(labels += _)
    }

    SpacyData(sentence, labels.toSeq) // Convert ArrayBuffer to Seq
  }

}
