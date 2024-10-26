import { Dialog, Transition } from "@headlessui/react";
import { useLockNoteDispatch } from "../../kernels/utils/dialog-api-requests";
import { Fragment, useState } from "react";
import { Input } from "@material-tailwind/react";

export const LockDialog = (props) => {
    let [isOpen, setIsOpen] = useState(false);
    function closeModal() {
        setIsOpen(false)
    }
    function openModal() {
        setIsOpen(true)
    }

    let [notePassword, setNotePassword] = useState("");
    let [passwordSuggestion, setPasswordSuggestion] = useState("");

    const lockDispatch = useLockNoteDispatch();
    const lockNote = (notePassword, passwordSuggestion) => {
        lockDispatch(props.elementId, notePassword, passwordSuggestion);
        window.location.reload();
    }

    return (
        <>
            <button className="text-black px-6 py-3"
                type="button"
                onClick={openModal}>
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
                                        <p className="text-sm text-red-700">
                                            Are you sure you want to {props.action} this {props.elementName}? You must set password for your note to lock it.
                                        </p>
                                        <Input
                                            id="space-bug"
                                            type="text"
                                            outline={true}
                                            placeholder={props.elementName + " Password"}
                                            value={notePassword}
                                            onChange={(e) => setNotePassword(e.target.value)}
                                            className="mt-2 block w-full shadow-sm sm:text-sm focus:ring-indigo-500 focus:border-indigo-500 border-gray-300 rounded-md"
                                        />
                                        <Input
                                            id="space-bug"
                                            type="text"
                                            outline={true}
                                            placeholder="Password Suggestion in case you forget"
                                            value={passwordSuggestion}
                                            onChange={(e) => setPasswordSuggestion(e.target.value)}
                                            className="mt-4 block w-full shadow-sm sm:text-sm focus:ring-indigo-500 focus:border-indigo-500 border-gray-300 rounded-md"
                                        />
                                    </div>

                                    <div className="mt-4">
                                        <button
                                            type="button"
                                            disabled={notePassword === "" || passwordSuggestion === ""}
                                            className={`bg-indigo-600 text-white font-semibold px-6 py-2 rounded-lg ${!notePassword || !passwordSuggestion ? "opacity-50 cursor-not-allowed" : "hover:bg-indigo-500"
                                                } transition duration-300 ease-in-out`}
                                            onClick={() => {
                                                if (notePassword === "" || passwordSuggestion === "") {
                                                    alert("Please fill in the password and password suggestion fields");
                                                    return;
                                                }
                                                lockNote(notePassword, passwordSuggestion);
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
            </Transition>
        </>
    )
}