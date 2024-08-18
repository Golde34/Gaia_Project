package kernel.utils

import java.io.StringReader
import org.apache.lucene.analysis.en.PorterStemFilter
import org.apache.lucene.analysis.tokenattributes.CharTermAttribute
import org.apache.lucene.analysis.core.WhitespaceTokenizer

import scala.collection.mutable

object TextPreprocessing {

  /**
    * Stem a word using the Porter Stemmer algorithm
    *
    * @param word
    * @return
    */
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
      word 
    }
  }

  /**
    * Stem a sentence using the Porter Stemmer algorithm
    *
    * @param words
    * @return
    */
  def stemStrings(words: String): String = {
    val stemmedWords = words.split(" ").map(stem)
    stemmedWords.mkString(" ")
  }

  /**
    * Stem a sentence and return a mapping of the original word to the stemmed word 
    *
    * @param sentence
    * @return
    */
  def stemWithPositionMapping(
      sentence: String
  ): (String, mutable.Map[Int, String]) = {
    val words = sentence.split(" ")
    val stemmedWords = Array.ofDim[String](words.length)
    val positionMapping = mutable.Map[Int, String]()

    for (i <- words.indices) {
      val stemmed = stem(words(i))
      stemmedWords(i) = stemmed 
      positionMapping += (i -> words(i))
    }

    (stemmedWords.mkString(" "), positionMapping)
  }

  /**
    * Remove special characters from a text 
    *
    * @param text
    * @return
    */
  def removeSpecialCharacters(text: String): String = {
    text.replaceAll("[^a-zA-Z0-9 ]", "")
  }
}
