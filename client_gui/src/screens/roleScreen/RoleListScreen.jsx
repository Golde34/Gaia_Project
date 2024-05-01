import { Card, Flex, Table, TableBody, TableCell, TableHead, TableHeaderCell, TableRow, Title } from "@tremor/react";
import { useCallback, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getRoles } from "../../api/store/actions/auth_service/role.actions";

const RoleListScreen = ({ selectedRole }) => {
    const dispatch = useDispatch();

    const listRoles = useSelector((state) => state.roleList);
    const { loading, error, roles } = listRoles;

    const getRoleList = useCallback(() => {
        dispatch(getRoles());
    }, [dispatch]);

    const debounceRef = useRef(null);

    useEffect(() => {
        clearTimeout(debounceRef.current);
        debounceRef.current = setTimeout(() => {
            getRoleList();
        }, 200);
    }, []);

    function loadPrivileges(role) {
        selectedRole(role);
    }

    return (
        <>
            {loading ? (
                <p>Loading...</p>
            ) : error ? (
                <p>{error}</p>
            ) : (
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
                            {roles.map((role) => (
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
            )}
        </>
    );
}

export default RoleListScreen;