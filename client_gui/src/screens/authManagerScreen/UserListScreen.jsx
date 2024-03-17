import { useDispatch, useSelector } from "react-redux";
import { Fragment, useCallback, useEffect, useRef, useState } from "react";
import { getUsers } from "../../api/store/actions/auth_service/user.actions";
import { Button, Card, Flex, Table, TableBody, TableCell, TableHead, TableHeaderCell, TableRow, Title } from "@tremor/react";
import { Dialog, Transition } from "@headlessui/react";

const UserListScreen = () => {
    const dispatch = useDispatch();

    const listUsers = useSelector((state) => state.userList);
    const { loading, error, users } = listUsers;

    const getListUsers = useCallback(() => {
        dispatch(getUsers());
    }, [dispatch]);

    const debounceRef = useRef(null);

    useEffect(() => {
        clearTimeout(debounceRef.current);
        debounceRef.current = setTimeout(() => {
            getListUsers();
        }, 200);
    }, []);

    let [isOpen, setIsOpen] = useState(false);
    let [currentUser, setCurrentUser] = useState(null);

    function closeModal() {
        setIsOpen(false)
    }
    function openModal(user) {
        setIsOpen(true)
        setCurrentUser(user)
    }

    return (
        <>
            {loading ? (
                <p>Loading</p>
            ) : error ? (
                <p>{error}</p>
            ) : (
                <>
                    <Card>
                        <Flex>
                            <Title>Action</Title>
                            <button
                                type="button"
                                className="m-2 inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                                onClick={() => {
                                    setObjectTask(title, description, status)
                                    closeModal();
                                }}
                            >
                                Add User
                            </button>
                        </Flex>
                        <Flex className="mt-5">
                            <Title>Search</Title>
                        </Flex>
                    </Card>
                    <Card className="mt-4">
                        <Title>List of Users</Title>
                        <Table className="mt-5">
                            <TableHead>
                                <TableRow>
                                    <TableHeaderCell><Title>Id</Title></TableHeaderCell>
                                    <TableHeaderCell><Title>Name</Title></TableHeaderCell>
                                    <TableHeaderCell><Title>Username</Title></TableHeaderCell>
                                    <TableHeaderCell><Title>Role</Title></TableHeaderCell>
                                    <TableHeaderCell><Title>Last Login</Title></TableHeaderCell>
                                    <TableHeaderCell><Title>Edit User</Title></TableHeaderCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {users.map((user) => (
                                    <TableRow key={user.id}>
                                        <TableCell>{user.id}</TableCell>
                                        <TableCell>{user.name}</TableCell>
                                        <TableCell>{user.username}</TableCell>
                                        <TableCell>{user.roles.map((role) => role.name + " ")}</TableCell>
                                        <TableCell>{user.lastLogin}</TableCell>
                                        <TableCell>
                                            <button
                                                type="button"
                                                className="m-2 inline-flex justify-center rounded-md border border-transparent bg-yellow-100 px-4 py-2 text-sm font-medium text-yellow-900 hover:bg-yellow-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                                                onClick={() => {
                                                    openModal(user);
                                                }}
                                            >
                                                Edit
                                            </button>
                                            <button
                                                type="button"
                                                className="inline-flex justify-center rounded-md border border-transparent bg-red-100 px-4 py-2 text-sm font-medium text-red-900 hover:bg-red-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-red-500 focus-visible:ring-offset-2"

                                            >Delete</button>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </Card>
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
        </>
    )
}

export default UserListScreen;