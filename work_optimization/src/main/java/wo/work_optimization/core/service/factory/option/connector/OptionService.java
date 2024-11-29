package wo.work_optimization.core.service.factory.option.connector;

import org.springframework.stereotype.Service;

import lombok.extern.slf4j.Slf4j;

@Service
@Slf4j
public abstract class OptionService implements OptionConnector {

    @Override
    public boolean handleOption() {
        try {
            return doOption();
        } catch (Exception e) {
            log.error("Error while handling option", e);
            return false;
        }
    }

    protected abstract boolean doOption();
}
