import { Card, Flex, Table, TableBody, TableCell, TableHead, TableHeaderCell, TableRow, Title } from "@tremor/react";

const PrivilegeListScreen = ({ selectedPrivilege, privileges}) => {
    const listPrivilege = privileges;

    function loadPrivilege(privilege) {
        selectedPrivilege(privilege);
        console.log(privilege);
    }

    return (
        <>
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
                        {privileges.map((privilege) => (
                            <TableRow key={privilege.id}
                                className="hover:cursor-pointer hover:bg-[#4cceac]"
                                onClick={() => loadPrivilege(privilege.name)}
                            >
                                <TableCell>{privilege.name}</TableCell>
                                <TableCell>{privilege.description}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </Card> 
        </>
    )
}

export default PrivilegeListScreen;