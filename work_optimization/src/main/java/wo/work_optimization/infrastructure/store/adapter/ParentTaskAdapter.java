package wo.work_optimization.infrastructure.store.adapter;

import java.util.List;
import java.util.Optional;

import org.springframework.stereotype.Service;

import lombok.extern.slf4j.Slf4j;
import wo.work_optimization.core.domain.entity.ParentTask;
import wo.work_optimization.core.port.store.ParentTaskStore;
import wo.work_optimization.infrastructure.store.repository.ParentTaskRepository;

@Slf4j
@Service
public class ParentTaskAdapter implements ParentTaskStore {
    
    private final ParentTaskRepository parentTaskRepository;

    public ParentTaskAdapter(ParentTaskRepository parentTaskRepository) {
        this.parentTaskRepository = parentTaskRepository;
    }
    
    @Override
    public void createParentTask(ParentTask parentTask) {
        this.parentTaskRepository.save(parentTask);
    }

    @Override
    public Optional<ParentTask> findByGroupTaskId(String groupTaskId) {
        return this.parentTaskRepository.findByGroupTaskId(groupTaskId);
    }

    @Override
    public Optional<List<ParentTask>> findByProjectId(String projectId) {
        return this.parentTaskRepository.findByProjectId(projectId);
    }
    
    @Override
    public Optional<ParentTask> findByScheduleId(String scheduleId) {
        return this.parentTaskRepository.findByScheduleId(scheduleId);
    }

    @Override
    public List<ParentTask> findAll() {
        return this.parentTaskRepository.findAll();
    }
}
