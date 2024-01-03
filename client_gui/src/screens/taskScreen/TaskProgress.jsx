import { Flex, ProgressBar, Text, Title } from '@tremor/react';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getTasksCompleted } from '../../api/store/actions/task_manager/task.actions';

const TaskProgress = (props) => {
    const dispatch = useDispatch();

    const groupTaskId = props.groupTaskId;
    const calculatedGroupTask = useSelector((state) => state.taskCompleted);
    const { loading, error, task } = calculatedGroupTask;

    useEffect(() => {
        if (groupTaskId) {
            dispatch(getTasksCompleted(groupTaskId));
        }
    }, [groupTaskId]);

    return (
        <div>
            {loading ? (
                <p>Loading...</p>
            ) : error ? (
                <p>{error}</p>
            ) : (
                task === undefined ? (
                    <></>
                ) : (
                    task.totalTasks === 0 || task.completedTasks === 0 ? (
                        <>
                            <Flex className="mt-4">
                                <Text className="w-full">{task.description}</Text>
                                <Flex className="space-x-2" justifyContent="start">
                                    <Title>DO AT LEAST 1 TASK DONE TO SEE YOUR PROGRESS</Title>
                                </Flex>
                            </Flex>
                        </>
                    ) : (
                        <>
                            <Flex className="mt-4">
                                <Text className="w-full">{task.description}</Text>
                                <Flex className="space-x-2" justifyContent="end">
                                    {/* TODO: NUMBER OF TOTAL TASKS AND TASKS DONE -> CALCULATE PERCENTAGE */}
                                    <Text>
                                        {task.completedTasks} TASKS DONE / TOTAL TASKS: {task.totalTasks}
                                    </Text>
                                </Flex>
                            </Flex>
                            <ProgressBar value={task.completedTasks / task.totalTasks * 100}
                                className="mt-2 w-300" />
                        </>
                    ))
            )}
        </div>
    )
}

export default TaskProgress;