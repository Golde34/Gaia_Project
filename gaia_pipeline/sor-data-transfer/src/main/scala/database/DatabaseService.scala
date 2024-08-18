package database

import scala.concurrent.Await
import scala.concurrent.duration._
import scala.concurrent.ExecutionContext.Implicits.global
import com.typesafe.config.ConfigFactory
import slick.basic.DatabaseConfig
import slick.jdbc.JdbcProfile
import slick.jdbc.MySQLProfile.api._
import slick.lifted.{ProvenShape, Tag}

class TaskData(tag: Tag) extends Table[(Int, String, String, String, String, String, String, String, String, String)](tag, "task") {
  def id: Rep[Int] = column[Int]("id", O.PrimaryKey, O.AutoInc)
  def sentence: Rep[String] = column[String]("sentence")
  def project: Rep[String] = column[String]("project")
  def groupTask: Rep[String] = column[String]("groupTask")
  def title: Rep[String] = column[String]("title")
  def priority: Rep[String] = column[String]("priority")
  def status: Rep[String] = column[String]("status")
  def startDate: Rep[String] = column[String]("startDate")
  def deadline: Rep[String] = column[String]("deadline")
  def duration: Rep[String] = column[String]("duration")

  def * : ProvenShape[(Int, String, String, String, String, String, String, String, String, String)] =
    (id, sentence, project, groupTask, title, priority, status, startDate, deadline, duration)
}


object TaskDatabaseService {
  val dbConfig = DatabaseConfig.forConfig[JdbcProfile]("slick.dbs.default")
  val db = dbConfig.db

  def init(): Unit = {
    val entities = TableQuery[TaskData]
    val setup = DBIO.seq(entities.schema.createIfNotExists)
    Await.result(db.run(setup), 10.seconds)
  }

  def insert(sentence: String, project: String, groupTask: String, title: String, priority: String, status: String, startDate: String, deadline: String, duration: String): Unit = {
    val entities = TableQuery[TaskData]
    val insertAction = entities += (0, sentence, project, groupTask, title, priority, status, startDate, deadline, duration)
    Await.result(db.run(insertAction), 10.seconds)
  }

  def getAll(): Seq[(Int, String, String, String, String, String, String, String, String, String)] = {
    val entities = TableQuery[TaskData]
    val query = entities.result
    Await.result(db.run(query), 10.seconds)
  } 
}