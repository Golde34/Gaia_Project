import { Badge, BadgeDelta, Card, Flex, Metric, Text, Title } from "@tremor/react"
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getTaskList } from "../../store/actions/task_manager/task.actions";
import { TaskCard } from "./TaskCard";

const TaskList = (props) => {
	const dispatch = useDispatch();

	const groupTaskId = props.groupTaskId;
	const listTasks = useSelector((state) => state.taskList);
	const { loading, error, tasks } = listTasks;	

	useEffect(() => {
		dispatch(getTaskList(groupTaskId));
	}, [dispatch]);

	return (
		<div>
			{loading ? (
				<Text>Loading...</Text>
			) : error ? (
				<Text>{error}</Text>
			) : (
				<div className="grid grid-cols-3 rounded-sm mt-9">
					{
						tasks.length === 0 ? (
							<p>No Tasks</p>
						) : (
							tasks.map((task) => (
								<div key={task._id} className="ms-2 me-2">
									<TaskCard task={task} />	
								</div>
							))
						)
					}
					<div />
				</div>
			)
			}
		</div>
	)
}

export default TaskList;