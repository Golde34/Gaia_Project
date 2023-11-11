import { useDispatch } from "react-redux";
import { createGroupTask, updateGroupTaskName } from "../store/actions/task_manager/group-task.actions";

export const useUpdateNameUrlDispatch = () => {
    const dispatch = useDispatch();

    const updateNAmeUrlDispatch = (id, newName, field) => {
        switch (field) {
            case "Group Task":
                dispatch(updateGroupTaskName(id, newName));
                break;
        }
    }

    return updateNAmeUrlDispatch;
};

export const useCreateGroupTaskDispatch = () => {
    const dispatch = useDispatch();

    const createGroupTaskDispatch = (groupTask) => {
        dispatch(createGroupTask(groupTask));
    }

    return createGroupTaskDispatch;
}