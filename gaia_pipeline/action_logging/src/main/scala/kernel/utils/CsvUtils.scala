package kernel.utils

import scala.collection.immutable.ArraySeq
import scala.io.Source
import os._
import com.github.tototoshi.csv._
import java.io.{PrintWriter, File}

object SORCSVUtils {
  def readSORCSV(filePath: os.Path): Seq[
    (
        String,
        String,
        String,
        String,
        String,
        String,
        String,
        String,
        String,
        String
    )
  ] = {
    val reader = CSVReader.open(filePath.toString())

    val data = reader.allWithHeaders().map { row =>
      val sentenceId = row.getOrElse("SentenceId", "null")
      val sentence = row.getOrElse("Sentence", "null")
      val project = row.getOrElse("Project", "null")
      val groupTask = row.getOrElse("GroupTask", "null")
      val title = row.getOrElse("Title", "null")
      val priority = row.getOrElse("Priority", "null")
      val status = row.getOrElse("Status", "null")
      val startDate = row.getOrElse("StartDate", "null")
      val deadline = row.getOrElse("Deadline", "null")
      val duration = row.getOrElse("Duration", "null")

      (
        sentenceId,
        sentence,
        project,
        groupTask,
        title,
        priority,
        status,
        startDate,
        deadline,
        duration
      )
    }

    reader.close()
    data
  }

  def writeSORCSV(filePath: String, jsonOutput: Seq[ujson.Obj]): Unit = {
    val outputFilePathCsv = os.pwd / filePath
    if (os.exists(outputFilePathCsv)) os.remove(outputFilePathCsv)
    val writer = new PrintWriter(new File(outputFilePathCsv.toString))
    writer.println("Sentence,Start,End,Label")
    val csvOutput = jsonOutput.flatMap { spacyData =>
      spacyData("labels").arr.map { label =>
        s""""${spacyData("sentence").str}","${label("start").num}","${label(
            "end"
          ).num}","${label("label").str}""""
      }
    }
    csvOutput.foreach(writer.println)
    writer.close()

    println(s"Data written to $outputFilePathCsv")
  }

  def writeSORCSV2(filePath: Path, jsonOutput: Seq[ujson.Obj]): Unit = {

    if (os.exists(filePath)) os.remove(filePath)
    val writer = new PrintWriter(new File(filePath.toString))

    // Write header with semicolon separator
    writer.println("text;entities")

    val csvOutput = jsonOutput.map { spacyData =>
      val entities = spacyData("labels").arr
        .map { label =>
          s"""{"start": ${label("start").num}, "end": ${label(
              "end"
            ).num}, "label": "${label("label").str}", "value": "${label("value").str}"}"""
        }
        .mkString("[", ", ", "]")

      val sentence = spacyData("sentence").str.replace("\"", "\"\"")
      s""""$sentence";$entities"""
    }

    csvOutput.foreach(writer.println)
    writer.close()

    println(s"Data written to $filePath")
  }
}
