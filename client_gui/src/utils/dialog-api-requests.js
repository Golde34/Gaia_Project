import { useDispatch } from "react-redux";
import { updateGroupTaskName, deleteGroupTask, updateOrdinalNumber } from "../api/store/actions/task_manager/group-task.actions";
import { deleteProject, updateProjectColor, updateProjectName } from "../api/store/actions/task_manager/project.actions";
import { deleteTask, moveTask, updateTaskInDialog } from "../api/store/actions/task_manager/task.actions";

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

    const deleteComponentDispatch = (id, field) => {
        switch (field) {
            case "Project":
                dispatch(deleteProject(id));
                break;
            case "Group Task":
                dispatch(deleteGroupTask(id));
                break;
            case "Task":
                dispatch(deleteTask(id));
                break;
            case "Ordinal":
                dispatch(updateOrdinalNumber(id));
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

export const useUpdateColorDispatch = () => {
    const dispatch = useDispatch();

    const updateColor = (projectId, color) => {
        dispatch(updateProjectColor(projectId, color));
    }

    return updateColor;
}

export const useUpdateTaskInDialogDispatch = () => {
    const dispatch = useDispatch();

    const updateTaskInDialogDispatch = (task) => {
        dispatch(updateTaskInDialog(task));
    }

    return updateTaskInDialogDispatch;
}

export const useUpdateOrdinalNumberDispatch = () => {
    const dispatch = useDispatch();

    const updateOrdinalNumberDispatch = (groupTaskId, projectId) => {
        dispatch(updateOrdinalNumber(groupTaskId, projectId));
    }

    return updateOrdinalNumberDispatch;
}

export const useMoveTaskDispatch = () => {
    const dispatch = useDispatch();

    const moveTaskDispatch = (taskId, oldGroupTaskId, newGroupTaskId) => {
        dispatch(moveTask(taskId, oldGroupTaskId, newGroupTaskId));
    }

    return moveTaskDispatch;
}