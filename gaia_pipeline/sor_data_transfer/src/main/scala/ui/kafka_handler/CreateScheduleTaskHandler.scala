package kafka_handler

import ujson._
import domains.Constants.{ KafkaCmd, KafkaTopic }
import services.TaskDataStorage.{ updateTaskScheduleId }
import ui.KafkaHandler

object CreateScheduleTaskHandler extends KafkaHandler {
    override def getTopic: String = KafkaTopic.SCHEDULE_CREATE_TASK

    override def handleMessage(message: String): Unit = {
        val jsonObject = ujson.read(message)
        // Access the nested "data" object first
        val dataObject = jsonObject("data")
        val cmd = jsonObject.obj.get("cmd").map(_.str).getOrElse("")

        cmd match {
            case KafkaCmd.CREATE_SCHEDULE_TASK => {
                val taskId = dataObject("taskId").str
                val scheduleTaskId = dataObject("scheduleTaskId").str
                updateTaskScheduleId(taskId, scheduleTaskId)
            }
            case other => {
                println(s"Unknown command received: $other")
            }
        }
    } 
}