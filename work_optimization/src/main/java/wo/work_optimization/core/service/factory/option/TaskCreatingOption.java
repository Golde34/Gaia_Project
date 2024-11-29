package wo.work_optimization.core.service.factory.option;

import wo.work_optimization.core.service.factory.option.connector.OptionService;

public class TaskCreatingOption extends OptionService {
    
    @Override
    public String option() {
        return "task_creating";
    }

    @Override
    public boolean doOption() {
        return true;
    }
}
