import ujson._
import scala.collection.mutable.ArrayBuffer
import os._
import services.SORDataTransfer

object DataPipeline {

  def main(args: Array[String]): Unit = {
    // Example data rows as tuples (sentence, project, title, priority, status, startDate, deadline, duration)
    val data = Seq(
      ("Please set a task in the Artemis project, about creating a user feedback system. This is an important task but not urgent.", 
       "Artemis", "creating a user feedback system", "Medium", "Pending", "null", "null", "null"),
      ("Create task to verify database integrity after recent updates. This is a star priority.", 
       "null", "verifying database integrity", "Star", "In Progress", "now", "null", "null")
      // Add more rows as needed
    )

    val spacyDataset = data.map(SORDataTransfer.processRow)

    // Create JSON structure using ujson
    val jsonOutput = spacyDataset.map { spacyData =>
      ujson.Obj(
        "sentence" -> spacyData.sentence,
        "labels" -> spacyData.labels.map { e =>
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
    if (outputFilePath != null) os.remove(outputFilePath)
    os.write(outputFilePath, ujson.write(ujson.Arr(jsonOutput: _*)))

    println(s"Data written to $outputFilePath")
  }
}
