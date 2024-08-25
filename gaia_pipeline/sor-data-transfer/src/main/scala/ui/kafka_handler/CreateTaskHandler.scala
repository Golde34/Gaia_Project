package kafka_handler

import ujson._
import domains.{TaskInput, TaskObject}
import services.TaskDataStorage.{saveToDBFromGaiaRequest, saveToDBFromTMRequest}

object CreateTaskHandler {
  def handleMessage(message: String): Unit = {
    val jsonObject = ujson.read(message)
    println(s"Received message: $jsonObject")

    val taskInput = mappingMessage(ujson.read(jsonObject("data")))
    val cmd = jsonObject("cmd").str
    cmd match {
      case KafkaCmd.KafkaCmd.GAIA_CREATE_TASK => {
        saveToDBFromGaiaRequest(taskInput)
      }
      case KafkaCmd.KafkaCmd.TM_CREATE_TASK => {
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
      jsonObject("priority").str,
      jsonObject("status").str,
      jsonObject("startDate").str,
      jsonObject("deadline").str,
      jsonObject("duration").str
    )
    val taskInput = TaskInput(
      jsonObject("sentence").str,
      jsonObject("project").str,
      jsonObject("groupTask").str,
      task
    )
    taskInput
  }
}
