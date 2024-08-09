// Something here, start with kafka

import org.apache.spark.sql.SparkSession

object pipeline {
  def main(args: Array[String]): Unit = {
    val spark = SparkSession.builder.appName("pipeline").getOrCreate()
    val df = spark.read.format("kafka").option("kafka.bootstrap.servers", "localhost:9094").option("subscribe", "test").load()
    df.selectExpr("CAST(key AS STRING)", "CAST(value AS STRING)").write.format("kafka").option("kafka.bootstrap.servers", "localhost:9094").option("topic", "test").save()
  }
}

