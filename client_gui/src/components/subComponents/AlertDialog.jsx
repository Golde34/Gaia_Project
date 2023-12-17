import { Dialog, Transition } from "@headlessui/react";
import { Fragment, useState } from "react";
import { useDeleteComponentDispatch, useUpdateOrdinalNumberDispatch } from "../../utils/dialog-api-requests";

export const AlertDialog = (props) => {
    let [isOpen, setIsOpen] = useState(false);

    function closeModal() {
        setIsOpen(false)
    }

    function openModal() {
        setIsOpen(true)
    }

    const deleteComponentDispatch = useDeleteComponentDispatch();
    const updateOrdinalDispatch = useUpdateOrdinalNumberDispatch();
    const actionComponent = (action, elementName) => {
        if (action === "Delete") {
            deleteComponentDispatch(props.elementId, elementName);
            localStorage.setItem('activeTab', 'none');
        } else if (action === "Archive") {
            console.log("This Archive function is not implemented yet.");
        } else if (action === "push" ) {
            updateOrdinalDispatch(props.elementId, props.projectId);
        }
        
        window.location.reload();
    }

    return (
        <>
            <button
                className="text-black px-6 py-3"
                type="button"
                onClick={openModal}
            >
                {props.component}
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
                                        {props.component}
                                    </Dialog.Title>
                                    <div className="mt-2">
                                        <p className="text-sm text-gray-500">
                                            Are you sure you want to {props.action} this {props.elementName}?
                                        </p>
                                    </div>

                                    <div className="mt-4">
                                        <button
                                            type="button"
                                            className="inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                                            onClick={() => {
                                                actionComponent(props.action, props.elementName);
                                                closeModal(); }}
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
            </Transition>
        </>
    )
}