import { useDispatch, useSelector } from "react-redux";
import Template from "../../components/template/Template"
import { useParams } from "react-router-dom";
import { useCallback, useEffect, useRef } from "react";
import { getDetailTask } from "../../api/store/actions/task_manager/task.actions";
import { Text } from "@tremor/react";
import MessageBox from "../../components/subComponents/MessageBox";

function ContentArea() {
    const userId = "1";
    const dispatch = useDispatch();
    const taskId = useParams().id;

    const taskDetail = useSelector((state) => state.taskDetail);
    const { loading, error, task } = taskDetail;
    const didTaskDetailRef = useRef();

    const getTaskDetail = useCallback(() => {
        dispatch(getDetailTask(taskId));
    }, [dispatch, taskId]);

    useEffect(() => {
        if (didTaskDetailRef.current) return;
        getTaskDetail();
        didTaskDetailRef.current = true;
    }, [taskId]);

    return (
        <div>
            {loading ? (
                <Text>Loading...</Text>
            ) : error ? (
                <MessageBox message={error} />
            ) : (
                <div>
                    <Text>{task.name}</Text>
                    <Text>{task.description}</Text>
                </div>
            )}
        </div>
    )
}

const TaskDetail = () => {
    return (
        <Template>
            <ContentArea />
        </Template>
    )
}

export default TaskDetail;