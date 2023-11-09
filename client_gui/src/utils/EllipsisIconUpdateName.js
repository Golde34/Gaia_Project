import { useDispatch } from "react-redux";
import { updateGroupTaskName } from "../store/actions/task_manager/group-task.actions";

export default function useUpdateNameUrlDispatch() {
    const dispatch = useDispatch();

    const updateNAmeUrlDispatch = (id, newName, field) => {
        switch (field) {
            case "Group Task":
                dispatch(updateGroupTaskName(id, newName));
                break;
        }
    }

    return updateNAmeUrlDispatch;
} 