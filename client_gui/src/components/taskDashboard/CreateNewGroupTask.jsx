import { useDispatch } from "react-redux";
import { Fragment, useEffect, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { Input, Textarea } from "@material-tailwind/react";
import { PlusIcon } from "@heroicons/react/outline";
import { useParams } from "react-router-dom";
import { useCreateGroupTaskDispatch } from '../../utils/DialogAPIRequest';

export const CreateNewGroupTask = (props) => {
    const useParam = useParams();

    let [isOpen, setIsOpen] = useState(false);

    function closeModal() {
        setIsOpen(false)
    }
    function openModal() {
        setIsOpen(true)
    }

    const [newName, setNewName] = useState("");
    const [description, setDescription] = useState('');
    const [isPriority, setIsPriority] = useState(false);
    const [isComplete, setIsComplete] = useState(false);
    const [groupTask] = useState({});
    const projectId = useParam.id;

    const createNewGroupTask = useCreateGroupTaskDispatch();
    const setObjectGroupTask = (title, description, priority, status) => {
        groupTask.title = title;
        groupTask.description = description;
        groupTask.priority = priority;
        groupTask.status = status;
        groupTask.projectId = projectId; 
        console.log(groupTask);
        createNewGroupTask(groupTask);
        window.location.reload();
    }

    return (
        <>
            <button
                className="text-white"
                type="button"
                onClick={openModal}
            >
                <PlusIcon className="w-6" />
            </button>

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
                                        Create New Group Task
                                    </Dialog.Title>
                                    {/* Task Title Input */}
                                    <div className="mt-2">
                                        <label htmlFor="task-title" className="block text-md font-medium text-gray-700">Title</label>
                                        <Input
                                            id="task-title"
                                            type="text"
                                            value={newName}
                                            onChange={(e) => setNewName(e.target.value)}
                                            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                                            placeholder="Task Title"
                                        />
                                    </div>

                                    {/* Task Description Input */}
                                    <div className="mt-4">
                                        <label htmlFor="task-description" className="block text-sm font-medium text-gray-700">Description</label>
                                        <Textarea
                                            id="task-description"
                                            value={description}
                                            onChange={(e) => setDescription(e.target.value)}
                                            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                                            placeholder="Task Description"
                                        />
                                    </div>

                                    {/* Priority Checkbox */}
                                    <div className="mt-4">
                                        <label htmlFor="priority-checkbox" className="inline-flex items-center">
                                            <input
                                                id="priority-checkbox"
                                                type="checkbox"
                                                checked={isPriority}
                                                onChange={(e) => setIsPriority(e.target.checked)}
                                                className="rounded border-gray-300 text-blue-600 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                                            />
                                            <span className="ml-2 text-sm text-gray-700">Priority</span>
                                        </label>
                                    </div>

                                    {/* Status Checkbox */}
                                    <div className="mt-4">
                                        <label htmlFor="status-checkbox" className="inline-flex items-center">
                                            <input
                                                id="status-checkbox"
                                                type="checkbox"
                                                checked={isComplete}
                                                onChange={(e) => setIsComplete(e.target.checked)}
                                                className="rounded border-gray-300 text-blue-600 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                                            />
                                            <span className="ml-2 text-sm text-gray-700">Complete</span>
                                        </label>
                                    </div>

                                    {/* Action Buttons */}
                                    <div className="mt-4 flex justify-end">
                                        <button
                                            type="button"
                                            className="mr-2 inline-flex justify-center rounded-md border border-transparent bg-gray-100 px-4 py-2 text-sm font-medium text-gray-900 hover:bg-gray-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-gray-500 focus-visible:ring-offset-2"
                                            onClick={closeModal}
                                        >
                                            Cancel
                                        </button>
                                        <button
                                            type="button"
                                            className="inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                                            onClick={() => {
                                                setObjectGroupTask(newName, description, isPriority, isComplete);
                                                closeModal();
                                                // window.location.reload();
                                            }}
                                        >
                                            Create
                                        </button>
                                    </div>

                                </Dialog.Panel>
                            </Transition.Child>
                        </div>
                    </div>
                </Dialog>
            </Transition>
        </>
    )
}