import { Dialog, Transition } from "@headlessui/react";
import { Input } from "@material-tailwind/react";
import { Card, Title } from "@tremor/react";
import { Fragment, useState } from "react";

export const CreateNewNote = () => {
    let [isOpen, setIsOpen] = useState(false);

    function closeModal() {
        setIsOpen(false);
    }

    function openModal() {
        setIsOpen(true);
    }

    const [note] = useState({})
    const [newName, setNewName] = useState('');
    const [newFile, setNewFile] = useState('');


    // const createNewNote = useCreateNoteDispatch();

    return (
        <>
            <Card className="w-xs h-72 flex flex-col justify-center items-center border-dashed border-2 border-sky-500 hover:border-solid hover:cursor-pointer text-center font-bold"
                onClick={openModal}>
                <Title>Create New Note</Title>
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
                                        Create New Note
                                    </Dialog.Title>
                                    {/* Task Title Input */}
                                    <div className="mt-2">
                                        <Input
                                            id="note-title"
                                            type="text"
                                            value={newName}
                                            onChange={(e) => setNewName(e.target.value)}
                                            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                                            placeholder="Note Name"
                                        />
                                    </div>
                                    <div className="mt-4 mb-4">
                                        <textarea
                                            value={newFile}
                                            onChange={(e) => setNewFile(e.target.value)}
                                            placeholder="Write your note here..."
                                            className="w-full h-72 p-4 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 text-gray-600 rounded-lg text-lg resize-none"
                                        ></textarea>
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

export default CreateNewNote;