package kafka_handler

import ujson._
import domains.{TaskInput, TaskObject}

object CreateTaskHandler {
  def handleMessage(message: String): Unit = {
    val jsonObject = ujson.read(message) 

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
    println(s"Received message: ${taskInput}")
    
  }
}