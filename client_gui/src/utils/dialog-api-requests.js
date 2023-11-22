import { useDispatch } from "react-redux";
import { createGroupTask, updateGroupTaskName, deleteGroupTask } from "../store/actions/task_manager/group-task.actions";
import { createProject, deleteProject, updateProjectColor, updateProjectName } from "../store/actions/task_manager/project.actions";
import { createTask, generateTaskFromScratch, updateTaskInDialog } from "../store/actions/task_manager/task.actions";

export const useUpdateComponentNameDispatch = () => {
    const dispatch = useDispatch();

    const updateComponentNameDispatch = (id, newName, field) => {
        switch (field) {
            case "Project":
                dispatch(updateProjectName(id, newName));
                break;
            case "Group Task":
                dispatch(updateGroupTaskName(id, newName));
                break;
        }
    }

    return updateComponentNameDispatch;
};

export const useDeleteComponentDispatch = () => {
    const dispatch = useDispatch();

    const deleteComponentDispatch = (groupTaskId, field) => {
        switch (field) {
            case "Project":
                dispatch(deleteProject(groupTaskId));
                break;
            case "Group Task":
                dispatch(deleteGroupTask(groupTaskId));
                break;
        }
    }

    return deleteComponentDispatch;
};

// export const useArchiveGroupTaskDispatch = () => {
//     const dispatch = useDispatch();

//     const archiveGroupTaskDispatch = (groupTaskId) => {
//         dispatch(archiveGroupTask(groupTaskId));
//     }

//     return archiveGroupTaskDispatch;
// }

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

export const useUpdateColorDispatch = () => {
    const dispatch = useDispatch();

    const updateColor = (projectId, color) => {
        dispatch(updateProjectColor(projectId, color));
    }

    return updateColor;
}

export const useGenerateTaskFromScratchDispatch = () => {
    const dispatch = useDispatch();

    const generateTaskFromScratchDispatch = (task) => {
        dispatch(generateTaskFromScratch(task));
    }

    return generateTaskFromScratchDispatch;
}

export const useUpdateTaskInDialogDispatch = () => {
    const dispatch = useDispatch();

    const updateTaskInDialogDispatch = (task) => {
        dispatch(updateTaskInDialog(task));
    }

    return updateTaskInDialogDispatch;
}