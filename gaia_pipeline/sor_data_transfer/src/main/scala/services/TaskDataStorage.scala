package services

import scala.collection.mutable.ArrayBuffer
import scala.collection.immutable.ArraySeq
import scala.collection.mutable
import java.awt.Label
import java.io.{PrintWriter, File}

import domains.TaskInput
import domains.Constants.KafkaCmd
import domains.Constants.StringConstants
import database.TaskDatabaseService

object TaskDataStorage {

  def saveToDBFromGaiaRequest(task: TaskInput): Unit = {
    TaskDatabaseService.init()
    TaskDatabaseService.insert(
        sentenceId = None,
        sentence = task.sentence,
        project = task.project,
        groupTask = Some(task.groupTask),
        title = task.task.title,
        priority = task.task.priority,
        status = task.task.status,
        startDate = Some(task.task.startDate),
        deadline = Some(task.task.deadline),
        duration = Some(task.task.duration),
        taskId = task.taskId,
        scheduleTaskId = None,
        taskConfigId = None,
        isDataLakeSync = false
    )
  }

  def saveToDBFromTMRequest(task: TaskInput): Unit = {
    TaskDatabaseService.init()
    TaskDatabaseService.insert(
        sentenceId = None,
        sentence = StringConstants.EMPTY_SENTENCE,
        project = task.project,
        groupTask = Some(task.groupTask),
        title = task.task.title,
        priority = task.task.priority,
        status = task.task.status,
        startDate = Some(task.task.startDate),
        deadline = Some(task.task.deadline),
        duration = Some(task.task.duration),
        taskId = task.taskId,
        scheduleTaskId = None,
        taskConfigId = None,
        isDataLakeSync = false
    )
  }

  def updateTaskScheduleId(taskId: String, scheduleTaskId: String): Unit = {
    TaskDatabaseService.init()
    TaskDatabaseService.updateTaskScheduleId(taskId, scheduleTaskId)
  }
} 