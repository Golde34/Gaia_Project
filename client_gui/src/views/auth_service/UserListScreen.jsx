import { useDispatch, useSelector } from "react-redux";
import Template from "../../components/template";
import { useCallback, useEffect, useRef } from "react";
import { getUsers } from "../../api/store/actions/auth_service/user.actions";
import { Card, Metric, Table, TableBody, TableHead, TableHeaderCell, TableRow, Title } from "@tremor/react";
import RightColumn from "../../components/RightColumn";
import AreaChartComponent from "../../components/subComponents/AreaChartComponent";
import TableComponent from "../../components/subComponents/TableComponent";

function ContentArea() {
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
                <div className="grid md:grid-cols-3 grid-cols-1 w-full">
                    <div className="col-span-2">
                        <div className="w-full flex flex-col justify-between p-2">
                            <div className="flex-auto w-full">
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
                            </div>
                        </div>
                    </div>
                    <div className="w-full">
                        <RightColumn />
                    </div>
                </div>
            )
            }
        </>
    )
}

const UserListScreen = () => {
    return (
        <Template>
            <ContentArea />
        </Template>
    )
}

export default UserListScreen;