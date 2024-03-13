import { useDispatch, useSelector } from "react-redux";
import { useCallback, useEffect, useRef } from "react";
import { getUsers } from "../../api/store/actions/auth_service/user.actions";
import { Card, Table, TableBody, TableHead, TableHeaderCell, TableRow, Title } from "@tremor/react";

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

    return (
        <>
            {loading ? (
                <p>Loading</p>
            ) : error ? (
                <p>{error}</p>
            ) : (
                <Card>
                    <Title>List of Users</Title>
                    <Table className="mt-5">
                        <TableHead>
                            <TableRow>
                                <TableHeaderCell><Title>Id</Title></TableHeaderCell>
                                <TableHeaderCell><Title>Name</Title></TableHeaderCell>
                                <TableHeaderCell><Title>Username</Title></TableHeaderCell>
                                <TableHeaderCell><Title>Email</Title></TableHeaderCell>
                                <TableHeaderCell><Title>Last Login</Title></TableHeaderCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {users.map((user) => (
                                <TableRow key={user.id}>
                                    <TableHeaderCell>{user.id}</TableHeaderCell>
                                    <TableHeaderCell>{user.name}</TableHeaderCell>
                                    <TableHeaderCell>{user.username}</TableHeaderCell>
                                    <TableHeaderCell>{user.email}</TableHeaderCell>
                                    <TableHeaderCell>{user.lastLogin}</TableHeaderCell>
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

export default UserListScreen;