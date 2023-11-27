import { useDispatch } from "react-redux";
import { updateGroupTaskName, deleteGroupTask } from "../api/store/actions/task_manager/group-task.actions";
import { deleteProject, updateProjectColor, updateProjectName } from "../api/store/actions/task_manager/project.actions";
import { updateTaskInDialog } from "../api/store/actions/task_manager/task.actions";

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