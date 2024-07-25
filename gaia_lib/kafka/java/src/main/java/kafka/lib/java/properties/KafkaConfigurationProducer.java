package kafka.lib.java.properties;
import org.springframework.boot.autoconfigure.condition.ConditionalOnProperty;
import org.springframework.boot.autoconfigure.kafka.KafkaProperties;
import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Primary;

@ConfigurationProperties(
        prefix = "spring.kafka.producer"
)
@Configuration
@Primary
@ConditionalOnProperty(
        value = {"spring.kafka.producer.enabled"},
        havingValue = "true"
)

public class KafkaConfigurationProducer extends KafkaProperties.Producer {
  private boolean enabled;
  private String defaultTopic;
  private int deliveryTimeout = 5000;
  private int requestTimeout = 3000;
  private int queueSize = 100;

  public boolean equals(final Object o) {
    if (o == this) {
      return true;
    } else if (!(o instanceof KafkaConfigurationProducer)) {
      return false;
    } else {
      KafkaConfigurationProducer other = (KafkaConfigurationProducer)o;
      if (!other.canEqual(this)) {
        return false;
      } else if (!super.equals(o)) {
        return false;
      } else if (this.isEnabled() != other.isEnabled()) {
        return false;
      } else {
        Object thisDefaultTopic = this.getDefaultTopic();
        Object otherDefaultTopic = other.getDefaultTopic();
        if (thisDefaultTopic == null) {
          if (otherDefaultTopic != null) {
            return false;
          }
        } else if (!thisDefaultTopic.equals(otherDefaultTopic)) {
          return false;
        }

        if (this.getDeliveryTimeout() != other.getDeliveryTimeout()) {
          return false;
        } else if (this.getRequestTimeout() != other.getRequestTimeout()) {
          return false;
        } else return this.getQueueSize() == other.getQueueSize();
      }
    }
  }

  protected boolean canEqual(final Object other) {
    return other instanceof KafkaConfigurationProducer;
  }

  public int hashCode() {
    int result = super.hashCode();
    result = result * 59 + (this.isEnabled() ? 79 : 97);
    Object objDefaultTopic = this.getDefaultTopic();
    result = result * 59 + (objDefaultTopic == null ? 43 : objDefaultTopic.hashCode());
    result = result * 59 + this.getDeliveryTimeout();
    result = result * 59 + this.getRequestTimeout();
    result = result * 59 + this.getQueueSize();
    return result;
  }

  public boolean isEnabled() {
    return this.enabled;
  }

  public String getDefaultTopic() {
    return this.defaultTopic;
  }

  public int getDeliveryTimeout() {
    return this.deliveryTimeout;
  }

  public int getRequestTimeout() {
    return this.requestTimeout;
  }

  public int getQueueSize() {
    return this.queueSize;
  }

  public void setEnabled(final boolean enabled) {
    this.enabled = enabled;
  }

  public void setDefaultTopic(final String defaultTopic) {
    this.defaultTopic = defaultTopic;
  }

  public void setDeliveryTimeout(final int deliveryTimeout) {
    this.deliveryTimeout = deliveryTimeout;
  }

  public void setRequestTimeout(final int requestTimeout) {
    this.requestTimeout = requestTimeout;
  }

  public void setQueueSize(final int queueSize) {
    this.queueSize = queueSize;
  }

  public String toString() {
    return "KafkaConfigurationProducer(enabled=" + this.isEnabled() + ", defaultTopic=" + this.getDefaultTopic() + ", deliveryTimeout=" + this.getDeliveryTimeout() + ", requestTimeout=" + this.getRequestTimeout() + ", queueSize=" + this.getQueueSize() + ")";
  }
}