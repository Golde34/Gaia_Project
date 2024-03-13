import { useCallback, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Card, Table, TableBody, TableHead, TableHeaderCell, TableRow, Title } from "@tremor/react";
import { getRoles } from "../../api/store/actions/auth_service/role.actions";

const RoleListScreen = () => {
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

    return (
        <>
            {loading ? (
                <p> Loading </p>
            ) : error ? (
                <p>{error}</p>
            ) : (
                <Card>
                    <Title>List of Roles</Title>
                    <Table className="mt-5">
                        <TableHead>
                            <TableRow>
                                <TableHeaderCell><Title>Id</Title></TableHeaderCell>
                                <TableHeaderCell><Title>Name</Title></TableHeaderCell>
                                <TableHeaderCell><Title>Description</Title></TableHeaderCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {roles.map((role) => (
                                <TableRow key={role.id}>
                                    <TableHeaderCell>{role.id}</TableHeaderCell>
                                    <TableHeaderCell>{role.name}</TableHeaderCell>
                                    <TableHeaderCell>{role.description}</TableHeaderCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </Card>
            )

            }
        </>
    )
}

export default RoleListScreen;