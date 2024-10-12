import { useCallback, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux"
import { getTableTaskList } from "../../api/store/actions/task_manager/task.actions";
import { Badge, Card, Table, TableBody, TableCell, TableHead, TableHeaderCell, TableRow, Text, Title } from "@tremor/react";
import MessageBox from "../../components/subComponents/MessageBox";
import { StatusOnlineIcon } from "@heroicons/react/solid";

const TaskTable = (props) => {
    const dispatch = useDispatch();

    // const projectId = props.projectId;
    const groupTaskId = props.groupTaskId;
    const taskTable = useSelector((state) => state.taskTable);
    const { loading, error, tasks } = taskTable;

    const getTasks = useCallback(() => {
        dispatch(getTableTaskList(groupTaskId));
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
                                {tasks.tasks.map((task) => (
                                    <TableRow key={task.id}>
                                        <TableCell>{task.title}</TableCell>
                                        <TableCell>{task.priority}</TableCell>
                                        <TableCell>
                                            <Badge color="red" icon={StatusOnlineIcon}>
                                                {task.status}
                                            </Badge>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </Card>
                </>
            )}
        </div>
    )
}

export default TaskTable;
