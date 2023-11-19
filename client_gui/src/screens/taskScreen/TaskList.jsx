import { Badge, BadgeDelta, Card, Flex, Metric, Text, Title } from "@tremor/react"
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getTaskList } from "../../store/actions/task_manager/task.actions";

const TaskList = (props) => {
	const dispatch = useDispatch();

	const groupTaskId = props.groupTaskId;
	const listTasks = useSelector((state) => state.taskList);
	const { loading, error, tasks } = listTasks;

	const priorityColor = (priority) => {
		if (priority === "Low") {
			return "green";
		}
		else if (priority === "Medium") {
			return "blue";
		}
		else if (priority === "High") {
			return "red";
		}
		else if (priority === "Star") {
			return "yellow";
		}
	}

	const statusColor = (status) => {
		if (status === "To Do") {
			return "decrease";
		}
		else if (status === "In Progress") {
			return "unchanged";
		}
		else if (status === "Done") {
			return "increase";
		}
	}

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
									<Card className="mt-3 hover:cursor-pointer" decoration="left" decorationColor="indigo">
										<Flex justifyContent="between" alignItems="center">
											<Title className="w-full">{task.title}</Title>
											<Flex className="space-x-2 m-1" justifyContent="end">
												{
													task.priority.length === 0 ? (
														<Badge color="gray">No Priority</Badge>
													) : (
														task.priority.map((priority) => (
															<Badge className="m-1" color={priorityColor(priority)}>{priority}</Badge>
														))
													)
												}
												<BadgeDelta deltaType={statusColor(task.status)}>{task.status}</BadgeDelta>
											</Flex>
										</Flex>
										<Flex className="space-x-2 m-1" justifyContent="end">
											<Text>{task.deadline}</Text>
										</Flex>
									</Card>
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