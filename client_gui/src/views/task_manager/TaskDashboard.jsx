import { useDispatch, useSelector } from "react-redux";
import Template from "../../components/template";
import { useCallback, useEffect, useRef } from "react";
import { getGroupTaskList } from "../../api/store/actions/task_manager/group-task.actions";
import { useParams } from "react-router-dom";
import { Button, Card, Col, Flex, Grid, Metric, Text } from "@tremor/react";
import TabGroupTask from "../../screens/groupTaskScreen/TabGroupTask";
import { CreateTaskDialog } from "../../screens/taskScreen/CreateTaskDialog";
import { CreateNewGroupTask } from "../../screens/groupTaskScreen/CreateNewGroupTask";
import MessageBox from "../../components/subComponents/MessageBox";

function ContentArea() {
    const projectId = useParams().id;
    const dispatch = useDispatch();

    const listGroupTasks = useSelector((state) => state.groupTaskList);
    const { loading, error, groupTasks } = listGroupTasks;
    const didGroupTasksRef = useRef();

    const getGroupTasks = useCallback(() => {
        dispatch(getGroupTaskList(projectId));
    }, [dispatch, projectId]);

    useEffect(() => {
        if (didGroupTasksRef.current) return;
        getGroupTasks();
        didGroupTasksRef.current = true;
    }, [projectId]);

    localStorage.setItem(projectId, JSON.stringify(groupTasks));

    return (
        <div>
            {loading ? (
                <Text>Loading...</Text>
            ) : error ? (
                <MessageBox message={error} /> 
            ) : (
                <>
                    <Metric style={{ marginBottom: '30px', marginTop: '30px' }}
                        className="text-2xl font-bold text-gray-800"> Task Dashboard
                    </Metric>
                    {
                        groupTasks.length === 0 ? (
                            <>
                                <Grid numItems={4} className="gap-2">
                                    <Col numColSpan={2}>
                                        <Card className="mt-5" style={{ textAlign: "center" }}>
                                            <CreateNewGroupTask gtStatus="new" />
                                            <Text className="mt-5">Creating a Group Task according to the correct process will help you control specific groups of tasks in your project.</Text>
                                            <Text className="mt-5 mb-5">Next, you will create Tasks and classify them into each Task Group.</Text>
                                        </Card>
                                    </Col>
                                    <Col numColSpan={2}>
                                        <Card className="mt-5" style={{ textAlign: "center" }}>
                                            <CreateTaskDialog projectId={projectId} />
                                            <Text className="mt-5">I also help you Create the Quick Task.</Text>
                                            <Text className="mt-5 mb-5">You will create a first task and Group Task will be your first Task. Rest assured that changes can be made later.</Text>
                                        </Card>
                                    </Col>

                                </Grid>
                                <a href="/client-gui/project" className="flex justify-center">
                                    <Button className="mt-5">Back</Button>
                                </a>
                            </>
                        ) : (
                            <>
                                <TabGroupTask groupTasks={groupTasks} projectId={projectId} />
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