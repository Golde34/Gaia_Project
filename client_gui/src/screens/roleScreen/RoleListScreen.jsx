import { Card, Flex, Table, TableBody, TableCell, TableHead, TableHeaderCell, TableRow, Title } from "@tremor/react";
import { useState } from "react";
import AddRoleModal from "./AddRoleModal";

const RoleListScreen = ({ selectedRole, roles }) => {
    const listRole = roles;
 
    function loadPrivileges(role) {
        selectedRole(role);
    }

    let [isRoleOpen, setRoleOpen] = useState(false);
    function closeRoleModal() {
        setRoleOpen(false)
    }
    function openRoleModal() {
        setRoleOpen(true)
    }

    return (
        <>
            <Card>
                <Flex>
                    <Title>Roles</Title>
                    <button
                        type="button"
                        className="m-2 inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                        onClick={() => {
                           openRoleModal(); 
                        }}
                    > Add role</button>
                </Flex>
                <Table className="mt-5">
                    <TableHead>
                        <TableRow>
                            <TableHeaderCell>Id</TableHeaderCell>
                            <TableHeaderCell>Name</TableHeaderCell>
                            <TableHeaderCell>Description</TableHeaderCell>
                            <TableHeaderCell>Actions</TableHeaderCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {listRole.map((role) => (
                            <TableRow key={role.id} className="hover:cursor-pointer hover:bg-[#4cceac]" onClick={() => loadPrivileges(role.name)}>
                                <TableCell>{role.id}</TableCell>
                                <TableCell>{role.name}</TableCell>
                                <TableCell>{role.description}</TableCell>
                                <TableCell>
                                    <button
                                        type="button"
                                        className="m-2 inline-flex justify-center rounded-md border border-transparent bg-red-100 px-4 py-2 text-sm font-medium text-red-900 hover:bg-red-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-red-500 focus-visible:ring-offset-2"
                                    > Delete</button>
                                </TableCell>
                            </TableRow>
                        ))
                        }
                    </TableBody>
                </Table>
            </Card>
            <AddRoleModal isOpen={isRoleOpen} closeModal={closeRoleModal} />
        </>
    );
}

export default RoleListScreen;