import { Dialog, Transition } from "@headlessui/react";
import { Input } from "@material-tailwind/react";
import { Badge, BadgeDelta, Card, Flex, Text, Title } from "@tremor/react";
import { Fragment, useState } from "react";

export const TaskCard = (props) => {
    const task = props.task;

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

    // Set priority frontend
    const [priority, setPriority] = useState(task.priority);

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
                                <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                                    <Dialog.Title
                                        as="h3"
                                        className="text-lg font-medium leading-6 text-gray-900"
                                    >
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

                                    <div className="mt-4">
                                        <button
                                            type="button"
                                            className="inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                                            onClick={() => {
                                                updateNewName(newName);
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