import { Card, Flex, Metric, Table, TableBody, TableCell, TableHead, TableHeaderCell, TableRow, Title } from "@tremor/react";
import { myData } from "./role-example";
import { useCallback, useEffect, useRef, useState } from "react";
import AddPrivilegeModal from "./AddPrivilegeModal";
import { useDispatch, useSelector } from "react-redux";
import { getRoles } from "../../api/store/actions/auth_service/role.actions";
import RoleListScreen from "./RoleListScreen";


function RoleDashboard() {
    const data = myData;

    let [isOpen, setIsOpen] = useState(false);
    const [role, setRole] = useState("ROLE_BOSS");

    function loadPrivileges(roleName) {
        setRole(roleName);
    }

    function closeModal() {
        setIsOpen(false)
    }

    function openModal() {
        setIsOpen(true)
    }

    return (
        <>
            <Metric style={{ marginBottom: '30px', marginTop: '30px' }}
                className="text-2xl font-bold text-gray-800"> Role Dashboard
            </Metric>
            <div className="grid md:grid-cols-5 grid-cols-1 w-full">
                <div className="col-span-3">
                    <div className="w-full flex flex-col justify-between p-2">
                        <div className="flex-auto w-full">
                            <Card>
                                <Flex>
                                    <Title>List of Role's Privileges</Title>
                                    <button
                                        type="button"
                                        className="m-2 inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                                        onClick={() => {
                                            openModal();
                                        }}
                                    >
                                        Insert Privilege
                                    </button>
                                </Flex>
                                <Title>{role}</Title>
                                <Table className="mt-5">
                                    <TableHead>
                                        <TableRow>
                                            <TableHeaderCell>Privileges</TableHeaderCell>
                                            <TableHeaderCell>Description</TableHeaderCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {data.role.map((r) => {
                                            if (r.name === role) {
                                                return r.privileges.map((privilege) => (
                                                    <TableRow key={privilege.id}>
                                                        <TableCell>{privilege.name}</TableCell>
                                                        <TableCell>{privilege.description}</TableCell>
                                                    </TableRow>
                                                ));
                                            }
                                        })}
                                    </TableBody>
                                </Table>
                            </Card>
                        </div>
                    </div>
                </div>
                <div className="col-span-2 w-full">
                    <div className="w-full p-2">
                        <RoleListScreen selectedRole={setRole}/>
                        <AddPrivilegeModal isOpen={isOpen} closeModal={closeModal} role={role} />
                    </div>
                </div>
            </div>
        </>
    );
}

export default RoleDashboard;