package kafka_handler

import ujson._
import domains.{TaskInput, TaskObject}
import domains.Constants.KafkaCmd
import services.TaskDataStorage.{saveToDBFromGaiaRequest, saveToDBFromTMRequest}
import domains.Constants.KafkaTopic
import ui.KafkaHandler

object CreateTaskHandler extends KafkaHandler {
  override def getTopic: String = KafkaTopic.CREATE_TASK

  override def handleMessage(message: String): Unit = {
    val jsonObject = ujson.read(message)
    // Access the nested "data" object first
    val dataObject = jsonObject("data")
    val taskInput = mappingMessage(dataObject)
    val cmd = jsonObject.obj.get("cmd").map(_.str).getOrElse("")
    
    cmd match {
      case KafkaCmd.GAIA_CREATE_TASK => {
        saveToDBFromGaiaRequest(taskInput)
      }
      case KafkaCmd.TM_CREATE_TASK => {
        saveToDBFromTMRequest(taskInput)
      }
      case other => {
        println(s"Unknown command received: $other")
      }
    }
  }

  def mappingMessage(jsonObject: ujson.Value): TaskInput = {
    // If jsonObject is flat, use it directly
    val priority = jsonObject("task")("priority") match {
      case ujson.Arr(arr) if arr.nonEmpty => arr.head.str   // Handle if it's an array and not empty
      case ujson.Str(str) => str                            // Handle if it's a string
      case _ => "Default Priority"                          // Fallback if it's neither
    }

    println(s"Mapping message: $jsonObject")
    val task = TaskObject(
      jsonObject("task")("title").str,
      priority,
      jsonObject("task")("status").str,
      jsonObject("task")("startDate").str,
      jsonObject("task")("deadline").str,
      jsonObject("task")("duration").num.toInt.toString
    )

    // Handling other fields that are not part of task
    val sentence = jsonObject.obj.get("sentence").map(_.str).getOrElse("")
    val project = jsonObject.obj.get("project").map(_.str.trim).filter(_.nonEmpty).getOrElse("Default Project")
    val groupTask = jsonObject.obj.get("groupTask").map(_.str.trim).filter(_.nonEmpty).getOrElse("Default Group Task")

    val taskInput = TaskInput(
      sentence,
      project,
      groupTask,
      task,
      jsonObject.obj.get("taskId").map(_.str),
      jsonObject.obj.get("scheduleId").map(_.str),
      jsonObject.obj.get("taskConfig").map(_.str)
    )
    taskInput
  }
}