import { Button, Card, Flex, Metric, Subtitle } from "@tremor/react"
import EllipsisMenu from "../EllipsisMenu";
import { LockClosedIcon } from "@heroicons/react/solid";
import { Dialog, Transition } from "@headlessui/react";
import { Fragment, useState } from "react";

const NoteItem = (props) => {
    let [isViewOpen, setisViewOpen] = useState(false);
    function closeModal() {
        setisViewOpen(false);
    }
    function openModal() {
        setisViewOpen(true);
    }

    let [isLockOpen, setisLockOpen] = useState(false);
    function closeLockModal() {
        setisLockOpen(false);
    }
    function openLockModal() {
        setisLockOpen(true);
    }

    const [note] = useState({});


    const click = () => {
        console.log("Note clicked");
        console.log("isLock: ", props.isLock);
        if (!props.isLock) {
            console.log("Note is not locked");
            // if (isViewOpen) {
            //     closeModal();
            // } else {
            //     openModal();
            // }
            // window.location.href = `/note/${props.note.id}`;
        } 
    }
    return (
        <>
            <Card
                className="w-xs h-72 hover:cursor-pointer transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-105 duration-300 relative"
                decoration="left" decorationColor="indigo"
                onClick={click}>

                <Flex justifyContent="between" alignItems="center" className="w-xs h-24">
                    <Metric>{props.note.name}</Metric>
                    <EllipsisMenu elementName="Note" elementId={props.note.id} 
                        isLock={props.note.isLock} suggestion={props.note.passwordSuggestion}/>
                </Flex>

                {props.note.isLock ? (
                    <Flex justifyContent="center" alignItems="center" className="w-full h-36">
                        <button className="border-none bg-transparent focus:outline-none" onClick={click}>
                            <LockClosedIcon className="h-6 w-12 text-gray-500" />
                        </button>
                    </Flex>
                ) : (
                    <>
                        <div className="flex flex-col justify-start">
                            <Subtitle className="line-clamp-6"><span className="text-gray-500">{props.note.summaryDisplayText}</span></Subtitle>
                        </div>

                        {/* <div className="absolute bottom-2 right-2">
                            <Button variant="primary" className="p-2" color="indigo" type="button" onClick={click}>
                                OK
                            </Button>
                        </div> */}
                    </>
                )}
            </Card>
            
            <Transition appear show={isViewOpen} as={Fragment}>
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
                                <Dialog.Panel className="w-[50%] transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                                    <Dialog.Title
                                        as="h3"
                                        className="text-lg font-medium leading-6 text-gray-900"
                                    >
                                        Create New Note
                                    </Dialog.Title>
                                    {/* Note Title Input */}
                                    {/* <div className="mt-2">
                                        <input
                                            id="note-title"
                                            type="text"
                                            value={newName}
                                            onChange={(e) => setNewName(e.target.value)}
                                            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                                            placeholder="Note Name"
                                        />
                                    </div> */}

                                    {/* Quill Editor */}
                                    {/* <div className="mt-4 mb-12">
                                        <ReactQuill
                                            theme="snow"
                                            value={newContent}
                                            onChange={setNewContent}
                                            modules={modules}
                                            formats={formats}
                                            className="h-72"
                                        />
                                    </div> */}

                                    {/* <div className="mt-12 flex justify-end">
                                        <button onClick={() => {
                                            setNewName('');
                                            setNewContent('');
                                            closeModal();
                                        }}
                                            className="bg-yellow-200 text-gray-700 font-semibold px-6 py-2 rounded-lg hover:text-gray-700 transition duration-300 ease-in-out me-2">
                                            Discard
                                        </button>

                                        <button
                                            onClick={() => {
                                                const file = saveContentAsFile(newContent);
                                                setObjectNote(newName, file);
                                                closeModal();
                                            }}
                                            className="ms-2 bg-indigo-600 text-white font-semibold px-6 py-2 rounded-lg hover:bg-indigo-500 transition duration-300 ease-in-out"
                                        >
                                            Save Note
                                        </button>
                                    </div> */}
                                </Dialog.Panel>
                            </Transition.Child>
                        </div>
                    </div>
                </Dialog>
            </Transition>

            <Transition appear show={isLockOpen} as={Fragment}>
                <Dialog as="div" className="relative z-10" onClose={closeLockModal}>
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
                                <Dialog.Panel className="w-[50%] transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                                    <Dialog.Title
                                        as="h3"
                                        className="text-lg font-medium leading-6 text-gray-900"
                                    >
                                        Create New Note
                                    </Dialog.Title>
                                    {/* Note Title Input */}
                                    {/* <div className="mt-2">
                                        <input
                                            id="note-title"
                                            type="text"
                                            value={newName}
                                            onChange={(e) => setNewName(e.target.value)}
                                            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                                            placeholder="Note Name"
                                        />
                                    </div> */}

                                    {/* Quill Editor */}
                                    {/* <div className="mt-4 mb-12">
                                        <ReactQuill
                                            theme="snow"
                                            value={newContent}
                                            onChange={setNewContent}
                                            modules={modules}
                                            formats={formats}
                                            className="h-72"
                                        />
                                    </div> */}

                                    {/* <div className="mt-12 flex justify-end">
                                        <button onClick={() => {
                                            setNewName('');
                                            setNewContent('');
                                            closeModal();
                                        }}
                                            className="bg-yellow-200 text-gray-700 font-semibold px-6 py-2 rounded-lg hover:text-gray-700 transition duration-300 ease-in-out me-2">
                                            Discard
                                        </button>

                                        <button
                                            onClick={() => {
                                                const file = saveContentAsFile(newContent);
                                                setObjectNote(newName, file);
                                                closeModal();
                                            }}
                                            className="ms-2 bg-indigo-600 text-white font-semibold px-6 py-2 rounded-lg hover:bg-indigo-500 transition duration-300 ease-in-out"
                                        >
                                            Save Note
                                        </button>
                                    </div> */}
                                </Dialog.Panel>
                            </Transition.Child>
                        </div>
                    </div>
                </Dialog>
            </Transition>
        </>
    )
}

export default NoteItem;