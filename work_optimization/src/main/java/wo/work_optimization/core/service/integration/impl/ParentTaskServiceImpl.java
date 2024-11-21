package wo.work_optimization.core.service.integration.impl;

import java.util.List;

import org.springframework.stereotype.Service;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import wo.work_optimization.core.domain.entity.ParentTask;
import wo.work_optimization.core.port.store.ParentTaskStore;
import wo.work_optimization.core.service.integration.ParentTaskService;

@Service
@RequiredArgsConstructor
@Slf4j
public class ParentTaskServiceImpl implements ParentTaskService {
    
    private final ParentTaskStore parentTaskStore;

    public List<ParentTask> getParentTasksByUserId(Long userId) {
        return parentTaskStore.findByUserId(userId);
    }
}
