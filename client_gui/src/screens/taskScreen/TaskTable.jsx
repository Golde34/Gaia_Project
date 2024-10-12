import { useCallback, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux"
import { getTableTaskList } from "../../api/store/actions/task_manager/task.actions";
import { Badge, BadgeDelta, Card, Table, TableBody, TableCell, TableHead, TableHeaderCell, TableRow, Text, Title } from "@tremor/react";
import MessageBox from "../../components/subComponents/MessageBox";
import { priorityColor, statusColor } from "../../kernels/utils/field-utils";

const TaskTable = (props) => {
    const dispatch = useDispatch();

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
                                    <TableHeaderCell>Task Priority</TableHeaderCell>
                                    <TableHeaderCell>Task Status</TableHeaderCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {tasks.tasks.map((task) => (
                                    <TableRow key={task.id}>
                                        <TableCell>{task.title}</TableCell>
                                        <TableCell>
                                            {
                                                task.priority.length === 0 ? (
                                                    <Badge color="gray">No Priority</Badge>
                                                ) : (
                                                    task.priority.map((priority) => (
                                                        <Badge key={`${task.id}-${priority}`} className="m-1" color={priorityColor(priority)}>{priority}</Badge>
                                                    ))
                                                )
                                            }
                                        </TableCell>
                                        <TableCell>
                                            <BadgeDelta deltaType={statusColor(task.status)}>{task.status}</BadgeDelta>
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
