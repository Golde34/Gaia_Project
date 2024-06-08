import { Dialog, Transition } from "@headlessui/react";
import { Textarea } from "@material-tailwind/react";
import { NumberInput, TextInput } from "@tremor/react";
import { Fragment, useState } from "react";
import { useCreateRoleDispatch } from "../../kernels/utils/write-dialog-api-requests";

const AddRoleModal = (props) => {
    const isOpen = props.isOpen;
    const closeModal = props.closeModal;
    
    const [role] = useState({});
    const [newName, setNewName] = useState("");
    const [description, setDescription] = useState("");
    const [rank, setRank] = useState(0);

    const createNewRole = useCreateRoleDispatch();
    const setRoleObject = (name, description, rank) => {
        role.name = name;
        role.description = description;
        role.grantedRank = parseInt(rank);
        createNewRole(role);
        console.log("Role created successfully");
        window.location.reload();
    }

    return (
        <>
            <Transition appear show={isOpen} as={Fragment} key={"add_role"}>
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
                                <Dialog.Panel className="w-full max-w-md transform rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                                    <Dialog.Title
                                        as="h1"
                                        className="text-lg font-medium leading-6 text-gray-900" >
                                        <span className="text-lg cursor-pointer" >Add New Role</span>
                                    </Dialog.Title>
                                    
                                    <div className="mt-2">
                                        <label htmlFor="role-name" className="block text-md font-medium text-gray-700 mb-3">Role Name</label>
                                        <TextInput
                                            id="role-name"
                                            type="text"
                                            className="mx-auto max-w-sm"
                                            onChange={(e) => setNewName(e.target.value)}
                                            placeholder="Specific role must be unique and start with prefix "
                                        />
                                    </div>

                                    <div className="mt-4">
                                        <label htmlFor="role-description" className="block text-md font-medium text-gray-700 mb-3">Role Description</label>
                                        <Textarea
                                            id="role-description"
                                            type="text"
                                            className="mt-1 block w-full rounded-md shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                                            onChange={(e) => setDescription(e.target.value)}
                                            placeholder="Specific role description"
                                        />
                                    </div>

                                    <div className="mt-4">
                                        <label htmlFor="role-permission" className="block text-md font-medium text-gray-700 mb-3">Granted Rank</label>
                                        {/* Range 10 */}
                                        <NumberInput 
                                            className="mx-auto max-w-sm"
                                            min={0}
                                            max={10}
                                            step={1}
                                            defaultValue={0}
                                            onChange={(e) => setRank(e.target.value)}
                                            placeholder="Granted Rank are in range 0 to 10"
                                        />
                                    </div>

                                    <div className="mt-4 flex justify-end">
                                        <button
                                            type="button"
                                            className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-500 hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                                            onClick={() => {
                                                setRoleObject(newName, description, rank);
                                                closeModal();
                                            }}
                                        >Add</button>
                                    </div>
                                </Dialog.Panel>
                            </Transition.Child>
                        </div>
                    </div>
                </Dialog>
            </Transition >
        </>
    )
}

export default AddRoleModal;