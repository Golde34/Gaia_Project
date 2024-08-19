package utils

import scala.collection.immutable.ArraySeq
import scala.io.Source
import os._

object CSVReader {
	def readSORCSV(filePath: os.Path): Seq[(String, String, String, String, String, String, String, String)] = {
		val bufferedSource = Source.fromFile(filePath.toString())
		
		val data = bufferedSource.getLines().drop(1).map { line =>
		// Tách dòng theo dấu phẩy và loại bỏ khoảng trắng thừa
		val cols = line.split(",").map(_.trim)

		// Xử lý từng cột trong dòng, thay thế giá trị null nếu cần
		val sentence = cols(0)
		val project = if (cols(1).isEmpty || cols(1) == "null") "null" else cols(1)
		val title = if (cols(2).isEmpty || cols(2) == "null") "null" else cols(2)
		val priority = if (cols(3).isEmpty || cols(3) == "null") "null" else cols(3)
		val status = if (cols(4).isEmpty || cols(4) == "null") "null" else cols(4)
		val startDate = if (cols(5).isEmpty || cols(5) == "null") "null" else cols(5)
		val deadline = if (cols(6).isEmpty || cols(6) == "null") "null" else cols(6)
		val duration = if (cols(7).isEmpty || cols(7) == "null") "null" else cols(7)

		// Trả về một tuple của dòng đã xử lý
		(sentence, project, title, priority, status, startDate, deadline, duration)
		}.toSeq

		bufferedSource.close()
		data
	}
}