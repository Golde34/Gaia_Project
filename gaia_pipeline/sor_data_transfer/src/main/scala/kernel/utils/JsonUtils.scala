package kernel.utils

import domains.SpacyData

object SORJsonUtils {
  def writeJsonFile(
      fileName: String,
      jsonOutput: Seq[ujson.Obj],
      isPrintedOutput: Boolean
  ): Unit = {
    try {
      val outputFilePath = os.pwd / fileName
      if (os.exists(outputFilePath)) os.remove(outputFilePath)
      os.write(
        outputFilePath,
        ujson.write(ujson.Arr(jsonOutput: _*), indent = 4)
      )
      println(s"Data written to $outputFilePath")

      // Print beautified JSON content
      if (isPrintedOutput) {
        val jsonContent = os.read(outputFilePath)
        val jsonParsed = ujson.read(jsonContent)
      }
    } catch {
      case e: Exception => println(s"Error writing JSON file: ${e.getMessage}")
    }
  }
}
