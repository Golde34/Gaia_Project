import { useCallback, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux"
import { getTaskList } from "../../api/store/actions/task_manager/task.actions";
import { Badge, Card, Table, TableBody, TableCell, TableHead, TableHeaderCell, TableRow, Text, Title } from "@tremor/react";
import MessageBox from "../../components/subComponents/MessageBox";
import { StatusOnlineIcon } from "@heroicons/react/solid";

const TaskTable = (props) => {
    const dispatch = useDispatch();

    // const projectId = props.projectId;
    const groupTaskId = props.groupTaskId;
    const listTasks = useSelector((state) => state.taskList);
    const { loading, error, tasks } = listTasks;

    const getTasks = useCallback(() => {
        dispatch(getTaskList(groupTaskId));
    }, [dispatch, groupTaskId]);

    const debounceRef = useRef(null);

    useEffect(() => {
        clearTimeout(debounceRef.current);
        debounceRef.current = setTimeout(() => {
            getTasks();
        }, 200);
    }, [groupTaskId]);

    return (
        <div>
            {loading ? (
                <Text>Loadding...</Text>
            ) : error ? (
                <MessageBox message={error} />
            ) : (
                <>
                    {
                        tasks.doneTaskList.length + tasks.notDoneTaskList.length === 0 ? (
                            <p>No Tasks</p>
                        ) : (
                            <>
                                {tasks.notDoneTaskList.length === 0 ? (
                                    <p></p>
                                ) : (
                                    <>
                                        <Title className="text-2xl font-bold text-gray-800">Not Done Task List</Title>
                                        <Card className="mt-5">
                                            <Table>
                                                <TableHead>
                                                    <TableRow>
                                                        <TableHeaderCell>Task Name</TableHeaderCell>
                                                        <TableHeaderCell>Task Description</TableHeaderCell>
                                                        <TableHeaderCell>Task Status</TableHeaderCell>
                                                    </TableRow>
                                                </TableHead>
                                                <TableBody>
                                                    {tasks.notDoneTaskList.map((task) => (
                                                        <TableRow key={task.id}>
                                                            <TableCell>{task.taskName}</TableCell>
                                                            <TableCell>{task.taskDescription}</TableCell>
                                                            <TableCell>
                                                                <Badge color="red" icon={StatusOnlineIcon}>
                                                                    {task.taskStatus}
                                                                </Badge>
                                                            </TableCell>
                                                        </TableRow>
                                                    ))}
                                                </TableBody>
                                            </Table>
                                        </Card>
                                    </>
                                )}
                                {tasks.doneTaskList.length === 0 ? (
                                    <p></p>
                                ) : (
                                    <>
                                        <Title className="text-2xl font-bold text-gray-800">Done Task List</Title>
                                        <Card className="mt-5">
                                            <Table>
                                                <TableHead>
                                                    <TableRow>
                                                        <TableHeaderCell>Task Name</TableHeaderCell>
                                                        <TableHeaderCell>Task Description</TableHeaderCell>
                                                        <TableHeaderCell>Task Status</TableHeaderCell>
                                                    </TableRow>
                                                </TableHead>
                                                <TableBody>
                                                    {tasks.doneTaskList.map((task) => (
                                                        <TableRow key={task.id}>
                                                            <TableCell>{task.taskName}</TableCell>
                                                            <TableCell>{task.taskDescription}</TableCell>
                                                            <TableCell>
                                                                <Badge color="green" icon={StatusOnlineIcon}>
                                                                    {task.taskStatus}
                                                                </Badge>
                                                            </TableCell>
                                                        </TableRow>
                                                    ))}
                                                </TableBody>
                                            </Table>
                                        </Card>
                                    </>
                                )}
                            </>
                        )
                    }
                </>
)}
        </div>
    )
}

export default TaskTable;
