package kafka.lib.java.configuration;

import org.springframework.boot.autoconfigure.EnableAutoConfiguration;
import org.springframework.boot.autoconfigure.kafka.KafkaAutoConfiguration;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.context.annotation.Configuration;

@Configuration
@ComponentScan({"vn.com.viettel.vds"})
@EnableAutoConfiguration(exclude = {
        KafkaAutoConfiguration.class
})
public class VdsKafkaConfig {
}
