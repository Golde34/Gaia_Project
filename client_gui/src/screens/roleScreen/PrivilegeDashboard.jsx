import { Card, Flex, Metric, Table, TableBody, TableCell, TableHead, TableHeaderCell, TableRow, Title } from "@tremor/react";
import { useState } from "react";
import { privilegeData } from "./privilege-example";

function PrivilegeDashboard() {
    const data = privilegeData;
    let [isOpen, setIsOpen] = useState(false);
    const [privilege, setPrivilege] = useState();

    function loadRoles(privilegeName) {
        setPrivilege(privilegeName);
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
                className="text-2xl font-bold text-gray-800"> Privilege Dashboard
            </Metric>
            <div className="grid md:grid-cols-5 grid-cols-1 w-full">
                <div className="col-span-3">
                    <div className="w-full flex flex-col justify-between p-2">
                        <div className="flex-auto w-full">
                            <Card>
                                <Flex>
                                    <Title>List Privilege</Title>
                                    <button
                                        type="button"
                                        className="m-2 inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                                        onClick={() => {
                                            openModal();
                                        }}
                                    >
                                        Add New Privilege
                                    </button>
                                </Flex>
                                <Table className="mt-5">
                                    <TableHead>
                                        <TableRow>
                                            <TableHeaderCell>Privilege Name</TableHeaderCell>
                                            <TableHeaderCell>Description</TableHeaderCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {data.privilege.map((privilege) => (
                                            <TableRow key={privilege.id}
                                                className="hover:cursor-pointer hover:bg-[#4cceac]"
                                                onClick={() => loadRoles(privilege.name)}
                                            >
                                                <TableCell>{privilege.name}</TableCell>
                                                <TableCell>{privilege.description}</TableCell>
                                            </TableRow>
                                        ))}
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
                                        openModal();
                                    }}
                                > Insert Privilege
                                </button>
                            </Flex>
                            <Title>{privilege}</Title>
                            <Table className="mt-5">
                                <TableHead>
                                    <TableRow>
                                        <TableHeaderCell>Role</TableHeaderCell>
                                        <TableHeaderCell>Description</TableHeaderCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {data.privilege.map((p) => {
                                        if (p.name === privilege) {
                                            return p.role.map((r) => (
                                                <TableRow key={r.id}>
                                                    <TableCell>{r.name}</TableCell>
                                                    <TableCell>{r.description}</TableCell>
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
        </>
    )
}

export default PrivilegeDashboard;