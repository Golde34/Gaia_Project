package wo.work_optimization.core.service.factory.option;

import org.springframework.stereotype.Service;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import wo.work_optimization.core.service.factory.option.connector.OptionService;

@Service
@RequiredArgsConstructor
@Slf4j
public class FixedTimeOption extends OptionService {
    
    @Override
    public String option() {
        return "fixed_time";
    }

    @Override
    public boolean doOption() {
        return true;
    }
}
