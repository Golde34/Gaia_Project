import { Dialog, Transition } from "@headlessui/react";
import { Button, Flex } from "@tremor/react";
import { Fragment, useState } from "react";
import { useMoveTaskDispatch } from "../../kernels/utils/dialog-api-requests";

export const MoveTask = (props) => {
    const projectId = props.projectId;
    const oldGroupTaskId = props.groupTaskId;
    const taskId = props.taskId;

    let [isOpen, setIsOpen] = useState(false);

    function closeModal() {
        setIsOpen(false);
    }
    function openModal() {
        setIsOpen(true);
    }

    const groupTasks = localStorage.getItem(projectId);
    const listGroupTasks = JSON.parse(groupTasks);

    const [newGroupTaskId, setNewGroupTaskId] = useState(null);

    const taskMoved = useMoveTaskDispatch();
    const moveTask = (newGroupTaskId) => {
        taskMoved(taskId, oldGroupTaskId, newGroupTaskId);

        localStorage.setItem("activeTab", newGroupTaskId);
        window.location.reload();
    }

    return (
        <>
            <Button className="ms-2" color="indigo" onClick={openModal}>
                Move Task
            </Button>

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
                                <Dialog.Panel className="w-60 transform rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                                    <Dialog.Title
                                        as="h3"
                                        className="text-lg font-medium leading-6 text-gray-900"
                                    >
                                        Choose Group Task
                                    </Dialog.Title>

                                    {listGroupTasks.map((groupTask) => (
                                        (groupTask._id === oldGroupTaskId) ? (
                                            <></>
                                        ) : (
                                            <>
                                                <div key={groupTask._id} className="flex items-center mt-4">
                                                    <input type="radio" className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                                                        name={groupTask._id} value={groupTask._id} 
                                                        onChange={(e) => setNewGroupTaskId(e.target.value)}
                                                        />
                                                    <label htmlFor={groupTask._id} className="ml-3 block text-sm font-medium text-gray-700">
                                                        {groupTask.title}
                                                    </label>
                                                </div>
                                            </>
                                        )

                                    ))}

                                    <div className="mt-4 justify-end">
                                        <Flex>
                                            <Button color="indigo" onClick={closeModal}>
                                                Cancel
                                            </Button>
                                            <Button color="indigo" className="ms-2"
                                                onClick={() => {
                                                    moveTask(newGroupTaskId);
                                                    closeModal();
                                                }}
                                            >
                                                Move
                                            </Button>
                                        </Flex>
                                    </div>
                                </Dialog.Panel>
                            </Transition.Child>
                        </div>
                    </div>
                </Dialog >
            </Transition >
        </>
    )
}