package kafka.lib.java.aop;

import kafka.lib.java.constants.Constant;
import org.apache.logging.log4j.ThreadContext;
import org.aspectj.lang.ProceedingJoinPoint;
import org.aspectj.lang.annotation.Around;
import org.aspectj.lang.annotation.Aspect;
import org.springframework.context.annotation.Configuration;

import java.util.UUID;

@Aspect
@Configuration
public class LogTraceKafkaAOP {
    @Around(value = "@annotation(org.springframework.kafka.annotation.KafkaListener)")
    public Object aroundKafka(ProceedingJoinPoint proceedingJoinPoint) throws Throwable {
        putNewCorrelationId();
        try {
            return proceedingJoinPoint.proceed();
        } finally {
            ThreadContext.remove(Constant.CORRELATION_ID_LOG_VAR_NAME);
        }
    }

    private void putNewCorrelationId() {
        String correlationId = ThreadContext.containsKey(Constant.CORRELATION_ID_LOG_VAR_NAME)
                ? ThreadContext.get(Constant.CORRELATION_ID_LOG_VAR_NAME)
                : generateUniqueCorrelationId();
        ThreadContext.put(Constant.CORRELATION_ID_LOG_VAR_NAME, correlationId);
    }

    private String generateUniqueCorrelationId() {
        return UUID.randomUUID().toString();
    }
}
