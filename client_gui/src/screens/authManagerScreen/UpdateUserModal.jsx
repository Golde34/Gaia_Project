import { Dialog, Transition } from "@headlessui/react";
import { Input } from "@material-tailwind/react";
import { Col, Grid } from "@tremor/react";
import { Fragment, useState } from "react";
import CheckBoxIcon from "../../components/icons/CheckboxIcon";

const UpdateUserModal = (props) => {

    const currentUser = props.currentUser;
    const isOpen = props.isOpen;
    const closeModal = props.closeModal;

    const [name, setName] = useState("");
    const [isEditingName, setIsEditingName] = useState(false);
    const handleNameChange = (e) => {
        setName(e.target.value);
    }
    const toggleEditingName = () => {
        setIsEditingName(!isEditingName);
    }

    const [username, setUsername] = useState("");
    const [isEditingUsername, setIsEditingUsername] = useState(false);
    const handleUsernameChange = (e) => {
        setUsername(e.target.value);
    }
    const toggleEditingUsername = () => {
        setIsEditingUsername(!isEditingUsername);
    }

    const [email, setEmail] = useState("");
    const [isEditingEmail, setIsEditingEmail] = useState(false);
    const handleEmailChange = (e) => {
        setEmail(e.target.value);
    }
    const toggleEditingEmail = () => {
        setIsEditingEmail(!isEditingEmail);
    }

    const isStringEmpty = (str) => {
        return str === null || str === "" || str === undefined;
    }

    

    return (
        <>
            {
                currentUser === null ? (
                    <></>
                ) : (
                    <Transition appear show={isOpen} as={Fragment} key={"transition_" + currentUser.id}>
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
                                                className="text-lg font-medium leading-6 text-gray-900" >
                                                <h1 className="text-lg cursor-pointer" >User</h1>
                                            </Dialog.Title>
                                            <div className="mt-4">
                                                <Grid numItems={4}>
                                                    <Col numColSpan={1}>
                                                        <label htmlFor="name" className="block text-md font-medium text-gray-700 mb-2">name</label>
                                                    </Col>
                                                    <Col numColSpan={3}>
                                                        {isEditingName ? (
                                                            <Input
                                                                type="text"
                                                                className="border-2 border-gray-200 p-2 rounded-md w-full"
                                                                value={name}
                                                                onChange={handleNameChange}
                                                                onBlur={toggleEditingName}
                                                                autoFocus
                                                            />
                                                        ) : (
                                                            <h1
                                                                className="text-sm cursor-pointer"
                                                                onClick={toggleEditingName}
                                                            >
                                                                {isStringEmpty(name) ? currentUser.name : name}
                                                            </h1>
                                                        )}
                                                    </Col>
                                                </Grid>
                                            </div>
                                            <div className="mt-4">
                                                <Grid numItems={4}>
                                                    <Col numColSpan={1}>
                                                        <label htmlFor="username" className="block text-md font-medium text-gray-700 mb-2">Username</label>
                                                    </Col>
                                                    <Col numColSpan={3}>
                                                        {isEditingUsername ? (
                                                            <Input
                                                                type="text"
                                                                className="border-2 border-gray-200 p-2 rounded-md w-full"
                                                                value={username}
                                                                onChange={handleUsernameChange}
                                                                onBlur={toggleEditingUsername}
                                                                autoFocus
                                                            />
                                                        ) : (
                                                            <h1
                                                                className="text-sm cursor-pointer"
                                                                onClick={toggleEditingUsername}
                                                            >
                                                                {isStringEmpty(username) ? currentUser.username : username}
                                                            </h1>

                                                        )}
                                                    </Col>
                                                </Grid>
                                            </div>
                                            <div className="mt-4">
                                                <Grid numItems={4}>
                                                    <Col numColSpan={1}>
                                                        <label htmlFor="email" className="block text-md font-medium text-gray-700 mb-2">Email</label>
                                                    </Col>
                                                    <Col numColSpan={3}>
                                                        {isEditingEmail ? (
                                                            <Input
                                                                type="text"
                                                                className="border-2 border-gray-200 p-2 rounded-md w-full"
                                                                value={email}
                                                                onChange={handleEmailChange}
                                                                onBlur={toggleEditingEmail}
                                                                autoFocus
                                                            />
                                                        ) : (
                                                            <h1
                                                                className="text-sm cursor-pointer"
                                                                onClick={toggleEditingEmail}
                                                            >
                                                                {/* {isStringEmpty(email) ? currentUser.roles[0].name : email} */}
                                                                {isStringEmpty(email) ? currentUser.email : email}
                                                            </h1>

                                                        )}
                                                    </Col>
                                                </Grid>
                                            </div>
                                        </Dialog.Panel>
                                    </Transition.Child>
                                </div>
                            </div>
                        </Dialog>
                    </Transition >
                )
            }
        </>
    )
}

export default UpdateUserModal;
