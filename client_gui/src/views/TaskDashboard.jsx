import { useDispatch, useSelector } from "react-redux";
import Template from "./template";
import { useCallback, useEffect } from "react";
import { getGroupTaskList } from "../api/store/actions/task_manager/group-task.actions";
import { useParams } from "react-router-dom";
import { Button, Flex, Metric, Text } from "@tremor/react";
import TabGroupTask from "../screens/groupTaskScreen/TabGroupTask";
import { CreateTaskDialog } from "../screens/taskScreen/CreateTaskDialog";

function ContentArea() {
    const projectId = useParams().id;
    const dispatch = useDispatch();

    const listGroupTasks = useSelector((state) => state.groupTaskList);
    const { loading, error, groupTasks } = listGroupTasks;

    const getGroupTask = useCallback(() => { 
        dispatch(getGroupTaskList(projectId));
    }, [dispatch, projectId]);

    useEffect(() => {
        getGroupTask();
    }, [projectId]);

    return (
        <div>
            {loading ? (
                <Text>Loading...</Text>
            ) : error ? (
                <Text>{error}</Text>
            ) : (
                <>
                    <Metric style={{ marginBottom: '30px', marginTop: '30px' }}
                        className="text-2xl font-bold text-gray-800"> Task Dashboard
                    </Metric>
                    {
                        groupTasks.length === 0 ? (
                            <>
                                <CreateTaskDialog projectId={projectId} />
                                <Text className="mt-5">Creating new Task is similar to creating new Group Task, helping users to easily classify task types.</Text>
                                <Text className="mt-5">Make sure you create correctly because the first group task and the task are totally the same.</Text>
                                <a href="/client-gui/project">
                                    <Button className="mt-5">Back</Button>
                                </a>
                            </>
                        ) : (
                            <>
                                <TabGroupTask groupTasks={groupTasks} />
                                <Flex className="mt-5" justifyContent="end">
                                    <a href="/client-gui/project">
                                        <Button>Back</Button>
                                    </a>
                                </Flex>
                            </>
                        )
                    }
                </>
            )
            }
        </div>
    )
}

const TaskDashboard = () => {
    return (
        <Template>
            <ContentArea />
        </Template>
    );
}

export default TaskDashboard;