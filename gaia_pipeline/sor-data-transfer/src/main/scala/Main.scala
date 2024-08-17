import ujson._
import scala.collection.mutable.ArrayBuffer
import os._

case class Entity(start: Int, end: Int, label: String)

case class SpacyData(sentence: String, entities: Seq[Entity])

object DataPipeline {

  def findEntityPositions(sentence: String, entityValue: String, label: String): Option[Entity] = {
    val startPos = sentence.indexOf(entityValue)
    if (startPos != -1) {
      val endPos = startPos + entityValue.length
      Some(Entity(startPos, endPos, label))
    } else {
      None
    }
  }

  def processRow(row: (String, String, String, String, String, String, String, String)): SpacyData = {
    val (sentence, project, title, priority, status, startDate, deadline, duration) = row

    val entities = ArrayBuffer[Entity]()

    // Find positions of each entity
    if (project != "null") {
      findEntityPositions(sentence, project, "PROJECT").foreach(entities += _)
    }
    if (title != "null") {
      findEntityPositions(sentence, title, "TASK").foreach(entities += _)
    }
    if (priority != "null") {
      findEntityPositions(sentence, priority, "PRIORITY").foreach(entities += _)
    }

    SpacyData(sentence, entities.toSeq)  // Chuyển đổi ArrayBuffer thành Seq
  }

  def main(args: Array[String]): Unit = {
    // Example data rows as tuples (sentence, project, title, priority, status, startDate, deadline, duration)
    val data = Seq(
      ("Please set a task in the Artemis project, about creating a user feedback system. This is an important task but not urgent.", 
       "Artemis", "creating a user feedback system", "Medium", "Pending", "null", "null", "null"),
      ("Create task to verify database integrity after recent updates. This is a star priority.", 
       "null", "verifying database integrity", "Star", "In Progress", "now", "null", "null")
      // Add more rows as needed
    )

    val spacyDataset = data.map(processRow)

    // Create JSON structure using ujson
    val jsonOutput = spacyDataset.map { spacyData =>
      ujson.Obj(
        "sentence" -> spacyData.sentence,
        "entities" -> spacyData.entities.map { e =>
          ujson.Obj(
            "start" -> e.start,
            "end" -> e.end,
            "label" -> e.label
          )
        }
      )
    }

    // Write JSON output to a file
    val outputFilePath = os.pwd / "spacy_dataset.json"
    os.write(outputFilePath, ujson.write(ujson.Arr(jsonOutput: _*)))

    println(s"Data written to $outputFilePath")
  }
}
