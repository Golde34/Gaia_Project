package utils

import scala.collection.immutable.ArraySeq
import scala.io.Source
import os._
import com.github.tototoshi.csv._

object GAIACSVReader {
  def readSORCSV(filePath: os.Path): Seq[(String, String, String, String, String, String, String, String)] = {
    val reader = CSVReader.open(filePath.toString())

    val data = reader.allWithHeaders().map { row =>
      val sentence = row.getOrElse("Sentence", "null")
      val project = row.getOrElse("Project", "null")
      val title = row.getOrElse("Title", "null")
      val priority = row.getOrElse("Priority", "null")
      val status = row.getOrElse("Status", "null")
      val startDate = row.getOrElse("StartDate", "null")
      val deadline = row.getOrElse("Deadline", "null")
      val duration = row.getOrElse("Duration", "null")

      (sentence, project, title, priority, status, startDate, deadline, duration)
    }

    reader.close()
    data
  }
}