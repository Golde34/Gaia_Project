import { Fragment, useCallback, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux"
import { getPrivileges } from "../../api/store/actions/auth_service/privilege.actions";
import { Card, Col, Grid, SearchSelect, SearchSelectItem, TextInput, Title } from "@tremor/react";
import { Dialog, Transition } from "@headlessui/react";
import { SearchIcon } from "@heroicons/react/solid";

const AddPrivilegeModal = (props) => {
    const dispatch = useDispatch();

    // const listPrivileges = useSelector((state) => state.privilegeList);
    // const { loading, error, privileges } = listPrivileges;

    // const getPrivilegeList = useCallback(() => {
    //     dispatch(getPrivileges());
    // }, [dispatch]);

    // const debounceRef = useRef(null);

    // useEffect(() => {
    //     clearTimeout(debounceRef.current);
    //     debounceRef.current = setTimeout(() => {
    //         getPrivilegeList();
    //     }, 200);
    // }, []);

    const listPrivileges = [
        {
            "id": 1,
            "name": "WRITE_PRIVILEGES",
        },
        {
            "id": 2,
            "name": "READ_PRIVILEGES",
        },
        {
            "id": 3,
            "name": "DELETE_PRIVILEGES",
        },
        {
            "id": 4,
            "name": "UPDATE_PRIVILEGES",
        }
    ]

    const isOpen = props.isOpen;
    const closeModal = props.closeModal;
    const roleName = props.role;

    return (
        <>
            {/* {loading ? (
                <p>Loading</p>
            ) : error ? (
                <p>{error}</p>
            ) : (
                <>
                        <Flex>
                            <Title>Privileges</Title>
                        </Flex>
                        <Table className="mt-5">
                            <TableHead>
                                <TableRow>
                                    <TableHeaderCell>Id</TableHeaderCell>
                                    <TableHeaderCell>Name</TableHeaderCell>
                                    <TableHeaderCell>Description</TableHeaderCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {privileges.map((privilege) => (
                                    <TableRow key={privilege.id}>
                                        <TableCell>{privilege.id}</TableCell>
                                        <TableCell>{privilege.name}</TableCell>
                                        <TableCell>{privilege.description}</TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                </>
            )} */}
            <Transition appear show={isOpen} as={Fragment} key={"transition_" + roleName}>
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
                                        <span className="text-lg cursor-pointer" >Privileges</span>
                                    </Dialog.Title>
                                    <div className="mt-4">
                                        <Title style={{ color: "black" }}>{roleName}</Title>
                                    </div>
                                    {/* Privileges List */}
                                    <div className="mt-4">
                                        <SearchSelect>
                                            {listPrivileges.map((privilege) => {
                                                return <SearchSelectItem key={privilege.id} value={privilege.id}>{privilege.name}</SearchSelectItem>
                                            })}
                                            <SearchSelectItem value={1}>WRITE_PRI</SearchSelectItem>
                                        </SearchSelect>
                                    </div>

                                    <div className="mt-4 flex justify-end">
                                        {/* Button delete */}
                                        <button
                                            type="button"
                                            className="mr-2 inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-red-500 hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                                            onClick={() => {
                                                closeModal();
                                            }}
                                        >Delete</button>
                                        {/* Button add */}
                                        <button
                                            type="button"
                                            className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-500 hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                                            onClick={() => {
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

export default AddPrivilegeModal;