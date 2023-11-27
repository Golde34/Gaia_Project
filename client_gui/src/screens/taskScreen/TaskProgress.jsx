import { Flex, ProgressBar, Text } from '@tremor/react';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getTasksCompleted } from '../../api/store/actions/task_manager/task.actions';

const TaskProgress = (props) => {
    const dispatch = useDispatch();

    const groupTaskId = props.groupTaskId;
    const calculatedGroupTask = useSelector((state) => state.taskCompleted);
    const { loading, error, groupTask } = calculatedGroupTask;

    const completedScore = Math.floor((groupTask.totalTasksCompleted / groupTask.totalTasks) / 100);

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
                completedScore === 0 || completedScore === null || completedScore === undefined ? (
                    <>
                        <Flex className="mt-4">
                            <Text className="w-full">{groupTask.description}</Text>
                            <Flex className="space-x-2" justifyContent="end">
                                <Text>DO AT LEAST 1 TASK DONE TO SEE YOUR PROGRESS</Text>
                            </Flex>
                        </Flex>
                    </>
                ) : (
                    <>
                        <Flex className="mt-4">
                            <Text className="w-full">{groupTask.description}</Text>
                            <Flex className="space-x-2" justifyContent="end">
                                {/* TODO: NUMBER OF TOTAL TASKS AND TASKS DONE -> CALCULATE PERCENTAGE */}
                                <Text>{completedScore} TASKS DONE / TOTAL TASKS</Text>
                            </Flex>
                        </Flex>
                        <ProgressBar value={completedScore} className="mt-2 w-300" />
                    </>
                )
            )}
        </div>
    )
}

export default TaskProgress;