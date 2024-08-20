package database

import scala.concurrent.Await
import scala.concurrent.duration._
import scala.concurrent.ExecutionContext.Implicits.global
import com.typesafe.config.ConfigFactory
import slick.basic.DatabaseConfig
import slick.jdbc.JdbcProfile
import slick.jdbc.MySQLProfile.api._
import slick.lifted.{ProvenShape, Tag}

class TaskData(tag: Tag) extends Table[(Int, Option[Int], String, String, Option[String], String, String, String, Option[String], Option[String], Option[String], Option[String], Option[String], Option[String])](tag, "task") {
  def id: Rep[Int] = column[Int]("id", O.PrimaryKey, O.AutoInc)
  def sentenceId: Rep[Option[Int]] = column[Option[Int]]("sentenceId", O.Default(None))
  def sentence: Rep[String] = column[String]("sentence")
  def project: Rep[String] = column[String]("project")
  def groupTask: Rep[Option[String]] = column[Option[String]]("groupTask", O.Default(None))
  def title: Rep[String] = column[String]("title")
  def priority: Rep[String] = column[String]("priority")
  def status: Rep[String] = column[String]("status")
  def startDate: Rep[Option[String]] = column[Option[String]]("startDate", O.Default(None))
  def deadline: Rep[Option[String]] = column[Option[String]]("deadline", O.Default(None))
  def duration: Rep[Option[String]] = column[Option[String]]("duration", O.Default(None))
  def taskId: Rep[Option[String]] = column[Option[String]]("taskId", O.Default(None))
  def scheduleTaskId: Rep[Option[String]] = column[Option[String]]("scheduleTaskId", O.Default(None))
  def taskConfigId: Rep[Option[String]] = column[Option[String]]("taskConfigId", O.Default(None))

  def * : ProvenShape[(Int, Option[Int], String, String, Option[String], String, String, String, Option[String], Option[String], Option[String], Option[String], Option[String], Option[String])] =
    (id, sentenceId, sentence, project, groupTask, title, priority, status, startDate, deadline, duration, taskId, scheduleTaskId, taskConfigId)
}


object TaskDatabaseService {
  val dbConfig: DatabaseConfig[JdbcProfile] = DatabaseConfig.forConfig[JdbcProfile]("slick.dbs.default")
  val db = dbConfig.db

  def init(): Unit = {
    val entities = TableQuery[TaskData]
    val setup = DBIO.seq(entities.schema.createIfNotExists)
    Await.result(db.run(setup), 10.seconds)
  }

  def getAll(): Seq[(Int, Option[Int], String, String, Option[String], String, String, String, Option[String], Option[String], Option[String], Option[String], Option[String], Option[String])] = {
    val entities = TableQuery[TaskData]
    val query = entities.result
    Await.result(db.run(query), 10.seconds)
  }

  def insert(sentenceId: Option[Int], sentence: String, project: String, groupTask: Option[String], 
             title: String, priority: String, status: String, startDate: Option[String], deadline: Option[String], 
             duration: Option[String], taskId: Option[String], scheduleTaskId: Option[String], taskConfigId: Option[String]): Unit = {
    val entities = TableQuery[TaskData]
    val insertAction = entities += (0, sentenceId, sentence, project, groupTask, title, priority, status, startDate, deadline, duration, taskId, scheduleTaskId, taskConfigId)
    Await.result(db.run(insertAction), 10.seconds)
  }
}