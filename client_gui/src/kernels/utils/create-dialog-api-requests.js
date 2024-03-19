import { useDispatch } from 'react-redux';
import { createGroupTask } from '../../api/store/actions/task_manager/group-task.actions';
import { createProject } from '../../api/store/actions/task_manager/project.actions';
import { createTask, generateTaskFromScratch } from '../../api/store/actions/task_manager/task.actions';

export const useCreateGroupTaskDispatch = () => {
    const dispatch = useDispatch();

    const createGroupTaskDispatch = (groupTask) => {
        dispatch(createGroupTask(groupTask));
    }

    return createGroupTaskDispatch;
};

export const useCreateProjectDispatch = () => {
    const dispatch = useDispatch();

    const createProjectDispatch = (project) => {
        dispatch(createProject(project));
    }

    return createProjectDispatch;
}

export const useCreateTaskDispatch = () => {
    const dispatch = useDispatch();

    const createTaskDispatch = (task) => {
        dispatch(createTask(task));
    }

    return createTaskDispatch;
}

export const useGenerateTaskFromScratchDispatch = () => {
    const dispatch = useDispatch();

    const generateTaskFromScratchDispatch = (task) => {
        dispatch(generateTaskFromScratch(task));
    }

    return generateTaskFromScratchDispatch;
}

// export const useUpdateUserDispatch = () => {
//     const dispatch = useDispatch();

//     const updateUserDispatch = (user) => {
//         dispatch(updateUser(user));
//     }

//     return updateUserDispatch;
// }