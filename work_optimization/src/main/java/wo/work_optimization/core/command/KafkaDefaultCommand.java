package wo.work_optimization.core.command;

import wo.work_optimization.core.port.kafka.MessageProcessingStrategy;

public class KafkaDefaultCommand implements MessageProcessingStrategy {

    @Override
    public void process(String message, String command) {
        // TODO Auto-generated method stub
        throw new UnsupportedOperationException("Unimplemented method 'process'");
    }
    
}
