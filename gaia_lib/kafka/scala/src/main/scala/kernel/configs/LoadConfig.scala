package kernel.configs

import com.typesafe.config.Config
import com.typesafe.config.ConfigFactory

case class KafkaConfig(
    bootstrapServers: String,
    groupId: String,
    topics: List[String],
    autoOffsetResetConfig: String
)

object KafkaConfigLoader {
  private val config: Config = ConfigFactory.load()

  def loadKafkaConfig(): KafkaConfig = {
    val kafkaConfig = config.getConfig("data-storage-handler.kafka")

    KafkaConfig(
      bootstrapServers = kafkaConfig.getString("bootstrap-servers"),
      groupId = kafkaConfig.getString("group-id"),
      topics =
        kafkaConfig.getStringList("topics").toArray.toList.map(_.toString),
      autoOffsetResetConfig = kafkaConfig.getString("auto-offset-reset")
    )
  }
}