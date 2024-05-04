import { Card, Flex, Table, TableBody, TableCell, TableHead, TableHeaderCell, TableRow, Title } from "@tremor/react";

const RoleListScreen = ({ selectedRole, roles }) => {
    const listRole = roles;
 
    function loadPrivileges(role) {
        selectedRole(role);
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
                        {listRole.map((role) => (
                            <TableRow key={role.id} className="hover:cursor-pointer hover:bg-[#4cceac]" onClick={() => loadPrivileges(role.name)}>
                                <TableCell>{role.id}</TableCell>
                                <TableCell>{role.name}</TableCell>
                                <TableCell>{role.description}</TableCell>
                            </TableRow>
                        ))
                        }
                    </TableBody>
                </Table>
            </Card>
        </>
    );
}

export default RoleListScreen;