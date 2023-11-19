import { Card, Flex, Metric, Text } from "@tremor/react"
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getTaskList } from "../../store/actions/task_manager/task.actions";

const TaskList = (props) => {
	const dispatch = useDispatch();

	const groupTaskId = props.groupTaskId;
	const listTasks = useSelector((state) => state.taskList);
	const { loading, error, tasks } = listTasks;
	console.log(tasks);
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
									<Card className="mt-3" decoration="left" decorationColor="indigo">
										<Flex justifyContent="between" alignItems="center">
											<Text>{task.title}</Text>
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