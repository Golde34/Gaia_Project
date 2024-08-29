package kafka_handler

import ujson._
import domains.{TaskInput, TaskObject}
import domains.Constants.KafkaCmd
import services.TaskDataStorage.{saveToDBFromGaiaRequest, saveToDBFromTMRequest}

object CreateTaskHandler {
  def handleMessage(message: String): Unit = {
    val jsonObject = ujson.read(message)
    println(s"Received message: $jsonObject")

    val taskInput = mappingMessage(ujson.read(jsonObject("data")))
    val cmd = jsonObject("cmd").str
    cmd match {
      case KafkaCmd.GAIA_CREATE_TASK => {
        saveToDBFromGaiaRequest(taskInput)
      }
      case KafkaCmd.TM_CREATE_TASK => {
        saveToDBFromTMRequest(taskInput)
      }
      case other => {
        println(s"Received message: $other")
      }
    }
  }

  def mappingMessage(jsonObject: ujson.Value): TaskInput = {
    val task = TaskObject(
      jsonObject("title").str,
      jsonObject("priority").arr.head.str,
      jsonObject("status").str,
      jsonObject("startDate").str,
      jsonObject("deadline").str,
      jsonObject("duration").num.toInt.toString
    )

    val sentence = jsonObject.obj.get("sentence").map(_.str).getOrElse("")
    val project = jsonObject.obj.get("project").map(_.str.trim).filter(_.nonEmpty).getOrElse("Default Project")
    val groupTask = jsonObject.obj.get("groupTask").map(_.str.trim).filter(_.nonEmpty).getOrElse("Default Group Task")

    TaskInput(
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
