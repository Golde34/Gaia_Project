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
    val sentence = if (jsonObject.obj.contains("sentence")) jsonObject("sentence").str else ""

    val taskInput = TaskInput(
      sentence,
      jsonObject("project").str,
      jsonObject("groupTask").str,
      task,
      Option(jsonObject("taskId").str),
      Option(jsonObject("scheduleId").str),
      Option(jsonObject("taskConfigId").str)
    )

    taskInput
  }
}
