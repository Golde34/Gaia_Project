package kernel.utils

import java.io.StringReader
import org.apache.lucene.analysis.en.PorterStemFilter
import org.apache.lucene.analysis.tokenattributes.CharTermAttribute
import org.apache.lucene.analysis.core.WhitespaceTokenizer

import scala.collection.mutable

object TextPreprocessing {

    def stem(word: String): String = {
    val reader = new StringReader(word)
    val tokenizer = new WhitespaceTokenizer()
    tokenizer.setReader(reader)
    val filter = new PorterStemFilter(tokenizer)
    filter.reset()

    val termAttr = filter.addAttribute(classOf[CharTermAttribute])

    if (filter.incrementToken()) {
      termAttr.toString
    } else {
      word // Trả về từ gốc nếu không thể stemming
    }
  }

  // Hàm để thực hiện stemming và lưu vị trí của từ trong câu gốc
  def stemWithPositionMapping(sentence: String): (String, mutable.Map[Int, String]) = {
    val words = sentence.split(" ")
    val stemmedWords = Array.ofDim[String](words.length)
    val positionMapping = mutable.Map[Int, String]()

    for (i <- words.indices) {
      val stemmed = stem(words(i))
      stemmedWords(i) = stemmed
      if (stemmed != words(i)) {
        positionMapping(i) = stemmed
      }
    }

    (stemmedWords.mkString(" "), positionMapping)
  }
}
