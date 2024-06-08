package wo.work_optimization.ui.kafka;

import kafka.lib.java.adapter.consumer.messagehandlers.KafkaMessageHandler;
import org.springframework.beans.factory.annotation.Autowired;
import wo.work_optimization.core.domain.constant.TopicConstants;
import wo.work_optimization.core.service.kafka.CommandFactory;
import wo.work_optimization.kernel.utils.ExtractKafkaMessage;

import org.springframework.stereotype.Component;

@Component
public class TaskConsumer extends KafkaMessageHandler {

    @Autowired
    private CommandFactory commandHandleFactory;

    @Override
    public String getTopic() {
        return TopicConstants.OptimizeTaskCommand.TOPIC;
    }

    @Override
    public void processMessage(String message, String topic) {
        String cmd = ExtractKafkaMessage.getCommand(message);
        commandHandleFactory.getCommand(cmd).process(message, cmd);
    }
}
