import { useDispatch, useSelector } from "react-redux";
import Template from "../../components/template/Template"
import { useParams } from "react-router-dom";
import { useCallback, useEffect, useRef, useState } from "react";
import { getDetailTask } from "../../api/store/actions/task_manager/task.actions";
import { Card, Col, DatePicker, Grid, Metric, Text, Textarea, TextInput } from "@tremor/react";
import MessageBox from "../../components/subComponents/MessageBox";
import RadioButtonIcon from "../../components/icons/RadioButtonIcon";
import CheckBoxIcon from "../../components/icons/CheckboxIcon";

function ContentArea() {
    const userId = "1";
    const dispatch = useDispatch();
    const taskId = useParams().id;

    const taskDetail = useSelector((state) => state.taskDetail);
    const { loading, error, task } = taskDetail;
    const didTaskDetailRef = useRef();

    const getTaskDetail = useCallback(() => {
        dispatch(getDetailTask(taskId));
    }, [dispatch, taskId]);

    useEffect(() => {
        if (didTaskDetailRef.current) return;
        getTaskDetail();
        didTaskDetailRef.current = true;
    }, [taskId]);

    const [title, setTitle] = useState(task?.title || '');
    const [description, setDescription] = useState(task?.description || '');
    const [startDate, setStartDate] = useState(task?.startDate || new Date());
    const [deadline, setDeadline] = useState(task?.deadline || new Date());
    const [duration, setDuration] = useState(task?.duration || 0);
    const [status, setStatus] = useState(task?.status || 'TODO');
    const [isHighPriority, setIsHighPriority] = useState(task?.isHighPriority || false);
    const [isMediumPriority, setIsMediumPriority] = useState(task?.isMediumPriority || false);
    const [isLowPriority, setIsLowPriority] = useState(task?.isLowPriority || false);
    const [isStarPriority, setIsStarPriority] = useState(task?.isStarPriority || false);

    const handleSave = () => {
        const updatedTask = {
            title,
            description,
            startDate,
            deadline,
            duration,
            status,
            isHighPriority,
            isMediumPriority,
            isLowPriority,
            isStarPriority
        };
        onUpdate(updatedTask);
    };

    return (
        <>
            {loading ? (
                <Text>Loading...</Text>
            ) : error ? (
                <MessageBox message={error} />
            ) : (
                <>
                    <Metric style={{ marginBottom: '30px', marginTop: '30px' }}
                        className="text-2xl font-bold text-gray-800"> Task Detail
                    </Metric>

                    <div className="grid md:grid-cols-3 grid-cols-1 w-full">
                        <div className="col-span-2">
                            <Card className="bg-indigo-100 shadow-lg">
                                <div className="mt-5">
                                    <label htmlFor="task-title" className="block text-md font-medium text-gray-200 mb-3">Task Title</label>
                                    <TextInput
                                        id="task-title"
                                        type="text"
                                        value={title}
                                        onChange={(e) => setTitle(e.target.value)}
                                        className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                                        placeholder="Task Title"
                                    />
                                </div>

                                <div className="mt-4">
                                    <label htmlFor="task-description" className="block text-md font-medium text-gray-200 mb-3">Description</label>
                                    <Textarea
                                        id="task-description"
                                        value={description}
                                        onChange={(e) => setDescription(e.target.value)}
                                        className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                                        placeholder="Task Description"
                                    />
                                </div>

                                <div className="mt-6">
                                    <Grid numItems={6}>
                                        <Col numColSpan={3}>
                                            <p className="block text-md font-medium text-gray-200 mb-3">Start Date</p>
                                            <div className="grid grid-cols-1 m-1">
                                                <div className="inline-flex items-center ">
                                                    <DatePicker
                                                        className="max-w-md mx-auto"
                                                        onValueChange={setStartDate}
                                                        minDate={new Date()}
                                                        value={startDate}
                                                        displayFormat="dd/MM/yyyy"
                                                    ></DatePicker>
                                                </div>
                                            </div>
                                        </Col>
                                        <Col numColSpan={3}>
                                            <p className="block text-md font-medium text-gray-200 mb-3">Due Date</p>
                                            <div className="grid grid-cols-1 m-1">
                                                <div className="inline-flex items-center ">
                                                    <DatePicker
                                                        className="max-w-md mx-auto"
                                                        onValueChange={setDeadline}
                                                        minDate={new Date()}
                                                        value={deadline}
                                                        displayFormat="dd/MM/yyyy"
                                                    ></DatePicker>
                                                </div>
                                            </div>
                                        </Col>
                                    </Grid>
                                </div>

                                <div className="mt-2">
                                    <p className="block text-md font-medium text-gray-200 mb-3">Duration</p>
                                    <TextInput
                                        type="number"
                                        value={duration === 0 ? defaultDuration : duration}
                                        onChange={(event) => {
                                            setDuration(event.target.value);
                                        }}
                                        className="mt-1 rounded-md shadow-sm focus:border-blue-500 sm:text-sm"
                                        placeholder="Input working hours"
                                        error={(duration < 1 || duration > 16) && defaultDuration !== 2}
                                        errorMessage="Duration must be between 1 and 16 hours"
                                    />
                                </div>

                                <div className="mt-8">
                                    <p className="block text-md font-medium text-gray-200 mb-1">Priority</p>
                                    <div className="grid grid-cols-4 m-1">
                                        <div className="inline-flex items-center">
                                            <label className="relative flex items-center p-3 rounded-full cursor-pointer"
                                                htmlFor="priority-checkbox-high" data-ripple-dark="true">
                                                <input
                                                    id="priority-checkbox-high"
                                                    type="checkbox"
                                                    checked={isHighPriority}
                                                    onChange={() => setIsHighPriority(!isHighPriority)}
                                                    className="before:content[''] peer relative h-5 w-5 cursor-pointer appearance-none rounded-md border border-blue-gray-200 transition-all before:absolute before:top-2/4 before:left-2/4 before:block before:h-12 before:w-12 before:-translate-y-2/4 before:-translate-x-2/4 before:rounded-full before:bg-blue-gray-500 before:opacity-0 before:transition-opacity checked:border-red-500 checked:bg-red-500 checked:before:bg-red-500 hover:before:opacity-10"
                                                />
                                                <div className="absolute text-white transition-opacity opacity-0 pointer-events-none top-2/4 left-2/4 -translate-y-2/4 -translate-x-2/4 peer-checked:opacity-100">
                                                    <CheckBoxIcon />
                                                </div>
                                            </label>
                                            <label className="text-sm text-gray-200">High</label>
                                        </div>
                                        <div className="inline-flex items-center">
                                            <label className="relative flex items-center p-3 rounded-full cursor-pointer"
                                                htmlFor="priority-checkbox-medium" data-ripple-dark="true">
                                                <input
                                                    id="priority-checkbox-medium"
                                                    type="checkbox"
                                                    checked={isMediumPriority}
                                                    onChange={() => setIsMediumPriority(!isMediumPriority)}
                                                    className="before:content[''] peer relative h-5 w-5 cursor-pointer appearance-none rounded-md border border-blue-gray-200 transition-all before:absolute before:top-2/4 before:left-2/4 before:block before:h-12 before:w-12 before:-translate-y-2/4 before:-translate-x-2/4 before:rounded-full before:bg-blue-gray-500 before:opacity-0 before:transition-opacity checked:border-pink-500 checked:bg-pink-500 checked:before:bg-pink-500 hover:before:opacity-10"
                                                />
                                                <div className="absolute text-white transition-opacity opacity-0 pointer-events-none top-2/4 left-2/4 -translate-y-2/4 -translate-x-2/4 peer-checked:opacity-100">
                                                    <CheckBoxIcon />
                                                </div>
                                            </label>
                                            <label className="text-sm text-gray-200">Medium</label>
                                        </div>
                                        <div className="inline-flex items-center">
                                            <label className="relative flex items-center p-3 rounded-full cursor-pointer"
                                                htmlFor="priority-checkbox-low" data-ripple-dark="true">
                                                <input
                                                    id="priority-checkbox-low"
                                                    type="checkbox"
                                                    checked={isLowPriority}
                                                    onChange={() => setIsLowPriority(!isLowPriority)}
                                                    className="before:content[''] peer relative h-5 w-5 cursor-pointer appearance-none rounded-md border border-blue-gray-200 transition-all before:absolute before:top-2/4 before:left-2/4 before:block before:h-12 before:w-12 before:-translate-y-2/4 before:-translate-x-2/4 before:rounded-full before:bg-blue-gray-500 before:opacity-0 before:transition-opacity checked:border-green-500 checked:bg-green-500 checked:before:bg-green-500 hover:before:opacity-10"
                                                />
                                                <div className="absolute text-white transition-opacity opacity-0 pointer-events-none top-2/4 left-2/4 -translate-y-2/4 -translate-x-2/4 peer-checked:opacity-100">
                                                    <CheckBoxIcon />
                                                </div>
                                            </label>
                                            <label className="text-sm text-gray-200">Low</label>
                                        </div>
                                        <div className="inline-flex items-center">
                                            <label className="relative flex items-center p-3 rounded-full cursor-pointer"
                                                htmlFor="priority-checkbox-star" data-ripple-dark="true">
                                                <input
                                                    id="priority-checkbox-star"
                                                    type="checkbox"
                                                    checked={isStarPriority}
                                                    onChange={() => setIsStarPriority(!isStarPriority)}
                                                    className="before:content[''] peer relative h-5 w-5 cursor-pointer appearance-none rounded-md border border-blue-gray-200 transition-all before:absolute before:top-2/4 before:left-2/4 before:block before:h-12 before:w-12 before:-translate-y-2/4 before:-translate-x-2/4 before:rounded-full before:bg-blue-gray-500 before:opacity-0 before:transition-opacity checked:border-yellow-500 checked:bg-yellow-500 checked:before:bg-yellow-500 hover:before:opacity-10"
                                                />
                                                <div className="absolute text-white transition-opacity opacity-0 pointer-events-none top-2/4 left-2/4 -translate-y-2/4 -translate-x-2/4 peer-checked:opacity-100">
                                                    <CheckBoxIcon />
                                                </div>
                                            </label>
                                            <label className="text-sm text-gray-200">Star</label>
                                        </div>
                                    </div>
                                </div>

                                <div className="mt-2">
                                    <p className="block text-md font-medium text-gray-200 mb-1">Status</p>
                                    <div className="grid grid-cols-3 m-1">
                                        <div className="inline-flex items-center">
                                            <label className="relative flex cursor-pointer items-center rounded-full p-3"
                                                htmlFor="status-radio-todo" data-ripple-dark="true">
                                                <input
                                                    id="status-radio-todo"
                                                    type="radio"
                                                    value="TODO"
                                                    checked={status === 'TODO'}
                                                    onChange={(e) => setStatus(e.target.value)}
                                                    className="before:content[''] peer relative h-5 w-5 cursor-pointer appearance-none rounded-full border border-blue-gray-200 text-pink-500 transition-all before:absolute before:top-2/4 before:left-2/4 before:block before:h-12 before:w-12 before:-translate-y-2/4 before:-translate-x-2/4 before:rounded-full before:bg-blue-gray-500 before:opacity-0 before:transition-opacity checked:border-blue-500 checked:before:bg-blue-500 hover:before:opacity-10"
                                                />
                                                <div className="pointer-events-none absolute top-2/4 left-2/4 -translate-y-2/4 -translate-x-2/4 text-blue-500 opacity-0 transition-opacity peer-checked:opacity-100">
                                                    <RadioButtonIcon />
                                                </div>
                                            </label>
                                            <label className="text-sm text-gray-200" htmlFor="status-radio-todo">
                                                TO DO
                                            </label>
                                        </div>
                                        <div className="inline-flex items-center">
                                            <label className="relative flex cursor-pointer items-center rounded-full p-3"
                                                htmlFor="status-radio-doing" data-ripple-dark="true">
                                                <input
                                                    id="status-radio-doing"
                                                    type="radio"
                                                    value="IN_PROGRESS"
                                                    checked={status === 'IN_PROGRESS'}
                                                    onChange={(e) => setStatus(e.target.value)}
                                                    className="before:content[''] peer relative h-5 w-5 cursor-pointer appearance-none rounded-full border border-blue-gray-200 text-pink-500 transition-all before:absolute before:top-2/4 before:left-2/4 before:block before:h-12 before:w-12 before:-translate-y-2/4 before:-translate-x-2/4 before:rounded-full before:bg-blue-gray-500 before:opacity-0 before:transition-opacity checked:border-blue-500 checked:before:bg-blue-500 hover:before:opacity-10"
                                                />
                                                <div className="pointer-events-none absolute top-2/4 left-2/4 -translate-y-2/4 -translate-x-2/4 text-blue-500 opacity-0 transition-opacity peer-checked:opacity-100">
                                                    <RadioButtonIcon />
                                                </div>
                                            </label>
                                            <label className="text-sm text-gray-200" htmlFor="status-radio-doing">
                                                IN PROGRESS
                                            </label>
                                        </div>
                                        <div className="inline-flex items-center">
                                            <label className="relative flex cursor-pointer items-center rounded-full p-3"
                                                htmlFor="status-radio-done" data-ripple-dark="true">
                                                <input
                                                    id="status-radio-done"
                                                    type="radio"
                                                    value="DONE"
                                                    checked={status === 'DONE'}
                                                    onChange={(e) => setStatus(e.target.value)}
                                                    className="before:content[''] peer relative h-5 w-5 cursor-pointer appearance-none rounded-full border border-blue-gray-200 text-pink-500 transition-all before:absolute before:top-2/4 before:left-2/4 before:block before:h-12 before:w-12 before:-translate-y-2/4 before:-translate-x-2/4 before:rounded-full before:bg-blue-gray-500 before:opacity-0 before:transition-opacity checked:border-blue-500 checked:before:bg-blue-500 hover:before:opacity-10"
                                                />
                                                <div className="pointer-events-none absolute top-2/4 left-2/4 -translate-y-2/4 -translate-x-2/4 text-blue-500 opacity-0 transition-opacity peer-checked:opacity-100">
                                                    <RadioButtonIcon />
                                                </div>
                                            </label>
                                            <label className="text-sm text-gray-200" htmlFor="status-radio-done">
                                                DONE
                                            </label>
                                        </div>
                                    </div>
                                </div>
                            </Card >

                        </div>
                        <div className="ms-5 w-full">
                            <Card>
                                <div className="mt-5">
                                    <label htmlFor="project" className="block text-md font-medium text-gray-200 mb-3">Project</label>
                                    <Card className="mb-5">
                                        projectName
                                        projectDescription
                                        projectStatus
                                    </Card>
                                    <label htmlFor="group-task" className="block text-md font-medium text-gray-200 mb-3">Group Task</label>
                                    <Card>
                                        groupTaskName
                                        top Relevant task
                                    </Card>
                                </div>
                            </Card>
                            <Card>
                                <div className="mt-5">
                                    <label htmlFor="new-feature" className="block text-md font-medium text-gray-200 mb-3">New feature</label>
                                    <p className="text-gray-700">Do you want to check my new feature?</p>
                                </div>
                            </Card>
                        </div>
                    </div>
                </>
            )}
        </>
    )
}

const TaskDetail = () => {
    return (
        <Template>
            <ContentArea />
        </Template>
    )
}

export default TaskDetail;
