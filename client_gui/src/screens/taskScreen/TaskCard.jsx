import { Dialog, Transition } from "@headlessui/react";
import { Input } from "@material-tailwind/react";
import { Badge, BadgeDelta, Button, Card, Flex, Text, Title } from "@tremor/react";
import { Fragment, useState } from "react";
import RadioButtonIcon from "../../components/icons/RadioButtonIcon";
import { useNavigate } from "react-router-dom";
import { convertTimestampToDate } from "../../utils/date-picker";
import { useUpdateTaskInDialogDispatch } from "../../utils/dialog-api-requests";

export const TaskCard = (props) => {
    const task = props.task;

    const navigate = useNavigate();

    let [isOpen, setIsOpen] = useState(false);

    function closeModal() {
        setIsOpen(false)
    }
    function openModal() {
        setIsOpen(true)
    }

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
        if (status === "TODO") {
            return "decrease";
        }
        else if (status === "IN_PROGRESS") {
            return "unchanged";
        }
        else if (status === "DONE") {
            return "increase";
        }
    }

    // Set title frontend
    const [title, setTitle] = useState(task.title);
    const [isEditingTitle, setIsEditingTitle] = useState(false);
    const handleTitleChange = (e) => {
        setTitle(e.target.value);
    }
    const toggleEditingTitle = () => {
        setIsEditingTitle(!isEditingTitle);
    }

    // Set description frontend
    const [description, setDescription] = useState(task.description);
    const [isEditingDescription, setIsEditingDescription] = useState(false);
    const handleDescriptionChange = (e) => {
        setDescription(e.target.value);
    }
    const toggleEditingDescription = () => {
        setIsEditingDescription(!isEditingDescription);
    }

    // Set status frontend
    const [status, setStatus] = useState(task.status);
    
    const [taskForm] = useState({ });

    const updateTask = useUpdateTaskInDialogDispatch();
    const setObjectTask = (title, description, status) => {
        taskForm._id = task._id;
        taskForm.title = title;
        taskForm.description = description;
        taskForm.status = status;
        updateTask(taskForm);
        // window.location.reload();
    }

    return (
        <>
            <Card onClick={openModal} className="mt-3 hover:cursor-pointer" decoration="left" decorationColor="indigo">
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

            <Transition appear show={isOpen} as={Fragment}>
                <Dialog as="div" className="relative z-10" onClose={closeModal}>
                    <Transition.Child
                        as={Fragment}
                        enter="ease-out duration-300"
                        enterFrom="opacity-0"
                        enterTo="opacity-100"
                        leave="ease-in duration-200"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0"
                    >
                        <div className="fixed inset-0 bg-black/25" />
                    </Transition.Child>

                    <div className="fixed inset-0 overflow-y-auto">
                        <div className="flex min-h-full items-center justify-center p-4 text-center">
                            <Transition.Child
                                as={Fragment}
                                enter="ease-out duration-300"
                                enterFrom="opacity-0 scale-95"
                                enterTo="opacity-100 scale-100"
                                leave="ease-in duration-200"
                                leaveFrom="opacity-100 scale-100"
                                leaveTo="opacity-0 scale-95"
                            >
                                <Dialog.Panel className="w-full max-w-md transform overflow-auto rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                                    <Dialog.Title
                                        as="h3"
                                        className="text-lg font-medium leading-6 text-gray-900"
                                    >
                                        <Flex>
                                            {isEditingTitle ? (
                                                <Input
                                                    type="text"
                                                    className="border-2 border-gray-200 p-2 rounded-md w-full"
                                                    value={title}
                                                    onChange={handleTitleChange}
                                                    onBlur={toggleEditingTitle}
                                                    autoFocus
                                                />
                                            ) : (
                                                <h1
                                                    className="text-lg cursor-pointer"
                                                    onClick={toggleEditingTitle}
                                                >
                                                    {title}
                                                </h1>
                                            )}
                                            <Button className="ms-2" color="indigo" onClick={() => navigate(`/project/${task._id}/details`)}>
                                                Details
                                            </Button>
                                        </Flex>

                                    </Dialog.Title>
                                    <div className="mt-4">
                                        <label htmlFor="description" className="block text-md font-medium text-gray-700 mb-2">Description</label>
                                        {isEditingDescription || description === '' ? (
                                            <Input
                                                type="text"
                                                className="mt-3 block w-full border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                                                value={description}
                                                onChange={handleDescriptionChange}
                                                onBlur={toggleEditingDescription}
                                                autoFocus
                                            />
                                        ) : (
                                            <h1
                                                className="text-sm cursor-pointer"
                                                onClick={toggleEditingDescription}
                                            >
                                                {description}
                                            </h1>
                                        )}
                                    </div>

                                    <div className="mt-6">
                                        <p className="block text-md font-medium text-gray-700 mb-3">Deadline</p>
                                        <div className="grid grid-cols-1 m-2">
                                            <Flex>
                                                <p>{convertTimestampToDate(task.deadline)}</p>
                                                <Button className="ms-2" color="indigo" onClick={() => navigate(`/project/${task._id}/update-deadline`)}>
                                                    Update Deadline
                                                </Button>
                                            </Flex>
                                        </div>
                                    </div>

                                    <div className="mt-6">
                                        <p className="block text-md font-medium text-gray-700 mb-3">Status</p>
                                        <div className="grid grid-cols-3 m-2">
                                            <div class="inline-flex items-center">
                                                <label class="relative flex cursor-pointer items-center rounded-full p-3"
                                                    for="status-radio-todo" data-ripple-dark="true">
                                                    <input
                                                        id="status-radio-todo"
                                                        type="radio"
                                                        value="TODO"
                                                        checked={status === 'TODO'}
                                                        onChange={(e) => setStatus(e.target.value)}
                                                        class="before:content[''] peer relative h-5 w-5 cursor-pointer appearance-none rounded-full border border-blue-gray-200 text-pink-500 transition-all before:absolute before:top-2/4 before:left-2/4 before:block before:h-12 before:w-12 before:-translate-y-2/4 before:-translate-x-2/4 before:rounded-full before:bg-blue-gray-500 before:opacity-0 before:transition-opacity checked:border-blue-500 checked:before:bg-blue-500 hover:before:opacity-10"
                                                    />
                                                    <div class="pointer-events-none absolute top-2/4 left-2/4 -translate-y-2/4 -translate-x-2/4 text-blue-500 opacity-0 transition-opacity peer-checked:opacity-100">
                                                        <RadioButtonIcon />
                                                    </div>
                                                </label>
                                                <label class="text-sm text-gray-700" for="status-radio-todo">
                                                    TO DO
                                                </label>
                                            </div>
                                            <div class="inline-flex items-center">
                                                <label class="relative flex cursor-pointer items-center rounded-full p-3"
                                                    for="status-radio-doing" data-ripple-dark="true">
                                                    <input
                                                        id="status-radio-doing"
                                                        type="radio"
                                                        value="IN_PROGRESS"
                                                        checked={status === 'IN_PROGRESS'}
                                                        onChange={(e) => setStatus(e.target.value)}
                                                        class="before:content[''] peer relative h-5 w-5 cursor-pointer appearance-none rounded-full border border-blue-gray-200 text-pink-500 transition-all before:absolute before:top-2/4 before:left-2/4 before:block before:h-12 before:w-12 before:-translate-y-2/4 before:-translate-x-2/4 before:rounded-full before:bg-blue-gray-500 before:opacity-0 before:transition-opacity checked:border-blue-500 checked:before:bg-blue-500 hover:before:opacity-10"
                                                    />
                                                    <div class="pointer-events-none absolute top-2/4 left-2/4 -translate-y-2/4 -translate-x-2/4 text-blue-500 opacity-0 transition-opacity peer-checked:opacity-100">
                                                        <RadioButtonIcon />
                                                    </div>
                                                </label>
                                                <label class="text-sm text-gray-700" for="status-radio-doing">
                                                    IN PROGRESS
                                                </label>
                                            </div>
                                            <div class="inline-flex items-center">
                                                <label class="relative flex cursor-pointer items-center rounded-full p-3"
                                                    for="status-radio-done" data-ripple-dark="true">
                                                    <input
                                                        id="status-radio-done"
                                                        type="radio"
                                                        value="DONE"
                                                        checked={status === 'DONE'}
                                                        onChange={(e) => setStatus(e.target.value)}
                                                        class="before:content[''] peer relative h-5 w-5 cursor-pointer appearance-none rounded-full border border-blue-gray-200 text-pink-500 transition-all before:absolute before:top-2/4 before:left-2/4 before:block before:h-12 before:w-12 before:-translate-y-2/4 before:-translate-x-2/4 before:rounded-full before:bg-blue-gray-500 before:opacity-0 before:transition-opacity checked:border-blue-500 checked:before:bg-blue-500 hover:before:opacity-10"
                                                    />
                                                    <div class="pointer-events-none absolute top-2/4 left-2/4 -translate-y-2/4 -translate-x-2/4 text-blue-500 opacity-0 transition-opacity peer-checked:opacity-100">
                                                        <RadioButtonIcon />
                                                    </div>
                                                </label>
                                                <label class="text-sm text-gray-700" for="status-radio-done">
                                                    DONE
                                                </label>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="mt-6">
                                        <p className="block text-md font-medium text-gray-700 mb-3">Sub Task (Do it later)</p>
                                    </div>

                                    <div className="mt-6">
                                        <p className="block text-md font-medium text-gray-700 mb-3">Comment(Do it later)</p>
                                    </div>
                                    <div className="mt-4">
                                        <button
                                            type="button"
                                            className="inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                                            onClick={() => {
                                                setObjectTask(title, description, status)
                                                closeModal();
                                            }}
                                        >
                                            OK
                                        </button>
                                        <button
                                            type="button"
                                            className='ml-2 inline-flex justify-center rounded-md border border-transparent bg-gray-100 px-4 py-2 text-sm font-medium text-gray-900 hover:bg-gray-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-gray-500 focus-visible:ring-offset-2'
                                            onClick={closeModal}
                                        >
                                            Cancel
                                        </button>
                                    </div>
                                </Dialog.Panel>
                            </Transition.Child>
                        </div>
                    </div>
                </Dialog>
            </Transition >
        </>
    );
};