package vn.com.viettel.vds.properties;

import org.springframework.boot.autoconfigure.condition.ConditionalOnProperty;
import org.springframework.boot.autoconfigure.kafka.KafkaProperties;
import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Primary;

@ConfigurationProperties(
        prefix = "spring.kafka"
)
@Configuration
@Primary
@ConditionalOnProperty(
        value = {"spring.kafka.enabled"},
        havingValue = "true"
)
public class KafkaConfigurationProperties extends KafkaProperties {
    private boolean enabled;

    public boolean equals(final Object o) {
        if (o == this) {
            return true;
        } else if (!(o instanceof KafkaConfigurationProperties)) {
            return false;
        } else {
            KafkaConfigurationProperties other = (KafkaConfigurationProperties)o;
            if (!other.canEqual(this)) {
                return false;
            } else if (!super.equals(o)) {
                return false;
            } else {
                return this.isEnabled() == other.isEnabled();
            }
        }
    }

    protected boolean canEqual(final Object other) {
        return other instanceof KafkaConfigurationProperties;
    }

    public int hashCode() {
        int result = super.hashCode();
        result = result * 59 + (this.isEnabled() ? 79 : 97);
        return result;
    }

    public boolean isEnabled() {
        return this.enabled;
    }

    public void setEnabled(final boolean enabled) {
        this.enabled = enabled;
    }

    public String toString() {
        return "KafkaConfigurationProperties(enabled=" + this.isEnabled() + ")";
    }
}