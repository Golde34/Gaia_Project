import { Grid, Text } from "@tremor/react"
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getTaskList } from "../../api/store/actions/task_manager/task.actions";
import { TaskCard } from "./TaskCard";

const TaskList = (props) => {
	const dispatch = useDispatch();

	const groupTaskId = props.groupTaskId;
	const listTasks = useSelector((state) => state.taskList);
	const { loading, error, tasks } = listTasks;

	useEffect(() => {
		if (groupTaskId) {
			dispatch(getTaskList(groupTaskId));
		}
	}, [groupTaskId]);

	return (
		<div>
			{loading ? (
				<Text>Loading...</Text>
			) : error ? (
				<Text>{error}</Text>
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
										<Grid numItems={3} className="gap-4 mt-9">
											{tasks.notDoneTaskList.map((task) => (
												<TaskCard key={task.id} task={task} />
											))}
										</Grid>
									</>
								)
								}
								{tasks.doneTaskList.length === 0 ? (
									<p></p>
								) : (
									<>
										<Grid numItems={3} className="gap-4 mt-9">
											{tasks.doneTaskList.map((task) => (
												<TaskCard key={task.id} task={task} />
											))}
										</Grid>
									</>

								)
								}
							</>
						)
					}
				</>
			)
			}
		</div>
	)
}

export default TaskList;