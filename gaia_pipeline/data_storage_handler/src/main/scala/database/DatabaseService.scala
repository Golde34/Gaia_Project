package database

import scala.concurrent.Await
import scala.concurrent.duration._
import scala.concurrent.ExecutionContext.Implicits.global
import com.typesafe.config.ConfigFactory
import slick.basic.DatabaseConfig
import slick.jdbc.JdbcProfile
import slick.jdbc.MySQLProfile.api._
import slick.lifted.{ProvenShape, Tag}
import domains.entities.FileEntity

class FileData(tag: Tag) extends Table[FileEntity](tag, "file") {
  def fileId: Rep[String] = column[String]("fileId", O.PrimaryKey)
  def fileName: Rep[String] = column[String]("fileName")
  def filePath: Rep[String] = column[String]("filePath")
  def fileType: Rep[String] = column[String]("fileType")
  def fileSize: Rep[Int] = column[Int]("fileSize")
  def fileHash: Rep[String] = column[String]("fileHash")
  def status: Rep[String] = column[String]("status")
  def chunkNumber: Rep[Int] = column[Int]("chunkNumber")
  def totalChunks: Rep[Int] = column[Int]("totalChunks")
  def `type`: Rep[String] = column[String]("type")

  def * : ProvenShape[FileEntity] = (fileId, fileName, filePath, fileType, fileSize, fileHash, status, chunkNumber, totalChunks, `type`) <> (FileEntity.tupled, FileEntity.unapply)
}

object FileDatabaseService {
    val dbConfig: DatabaseConfig[JdbcProfile] = DatabaseConfig.forConfig[JdbcProfile]("slick.dbs.default")
    val db = dbConfig.db

    def init(): Unit = {
        val entities = TableQuery[FileData]
        val setup = DBIO.seq(entities.schema.createIfNotExists)
        Await.result(db.run(setup), 10.seconds)
    }

    def getAll(): Seq[FileEntity] = {
        val entities = TableQuery[FileData]
        val query = entities.result
        Await.result(db.run(query), 10.seconds)
    }

    def insert(fileId: String, fileName: String, filePath: String, fileType: String, fileSize: Int, fileHash: String, status: String, chunkNumber: Int, totalChunks: Int, `type`: String): Unit = {
        val entities = TableQuery[FileData]
        val insertAction = entities += FileEntity(fileId, fileName, filePath, fileType, fileSize, fileHash, status, chunkNumber, totalChunks, `type`)
        Await.result(db.run(insertAction), 10.seconds)
    }

    def getFileById(fileId: String): Option[FileEntity] = {
        val entities = TableQuery[FileData]
        val query = entities.filter(_.fileId === fileId).result.headOption
        Await.result(db.run(query), 10.seconds)
    }
}