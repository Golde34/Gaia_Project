import { Card, Flex, Metric, Table, TableBody, TableCell, TableHead, TableHeaderCell, TableRow, Title } from "@tremor/react";
import Template from "../../components/template";
import { myData } from "./role-example";
import { useState } from "react";
import AddPrivilegeModal from "../../screens/roleScreen/AddPrivilegeModal";


function ContentArea() {
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
                                            Add Privilege
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
                        <Card>
                            <Flex>
                                <Title>Roles</Title>
                                <button
                                    type="button"
                                    className="m-2 inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                                    onClick={() => {
                                        console.log("Add Role");
                                    }}
                                > Add role</button>
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
                                    <TableRow className="hover:cursor-pointer hover:bg-[#4cceac]" onClick={() => loadPrivileges("ROLE_BOSS")}>
                                        <TableCell>1</TableCell>
                                        <TableCell>BOSS</TableCell>
                                        <TableCell>Can manage all users, all actions, full access</TableCell>
                                    </TableRow>
                                    <TableRow className="hover:cursor-pointer hover:bg-[white]" onClick={() => loadPrivileges("ROLE_SUBBOSS")}>
                                        <TableCell>2</TableCell>
                                        <TableCell>SUBBOSS</TableCell>
                                        <TableCell>Cannot give permission access for users</TableCell>
                                    </TableRow>
                                    <TableRow className="hover:cursor-pointer hover:bg-[#4cceac]" onClick={() => loadPrivileges("ROLE_ADMIN")}>
                                        <TableCell>3</TableCell>
                                        <TableCell>ADMIN</TableCell>
                                        <TableCell>Can manage all users, can not order to Gaia, limit access</TableCell>
                                    </TableRow>
                                    <TableRow className="hover:cursor-pointer hover:bg-[white]" onClick={() => loadPrivileges("ROLE_USER")}>
                                        <TableCell>4</TableCell>
                                        <TableCell>USER</TableCell>
                                        <TableCell>Can only view, cannot edit or delete</TableCell>
                                    </TableRow>
                                </TableBody>
                            </Table>
                        </Card>
                        <AddPrivilegeModal isOpen={isOpen} closeModal={closeModal} role={role}/>
                    </div>
                </div>
            </div>
        </>
    );
}

const RoleDashboard = () => {
    return (
        <Template>
            <ContentArea />
        </Template>
    )
}

export default RoleDashboard;