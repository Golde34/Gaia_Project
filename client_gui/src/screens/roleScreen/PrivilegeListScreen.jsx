// import { useCallback, useEffect, useRef } from "react";
// import { useDispatch, useSelector } from "react-redux"
// import { getPrivileges } from "../../api/store/actions/auth_service/privilege.actions";
// import { Card, Table, TableBody, TableHead, TableHeaderCell, TableRow, Title } from "@tremor/react";

// const PrivilegeScreen = () => {
//     const dispatch = useDispatch();

//     const listPrivileges = useSelector((state) => state.privilegeList);
//     const { loading, error, privileges } = listPrivileges;

//     const getPrivilegeList = useCallback(() => {
//         dispatch(getPrivileges());
//     }, [dispatch]);

//     const debounceRef = useRef(null);

//     useEffect(() => {
//         clearTimeout(debounceRef.current);
//         debounceRef.current = setTimeout(() => {
//             getPrivilegeList();
//         }, 200);
//     }, []);

//     return (
//         <>
//             {loading ? (
//                 <p> Loading </p>
//             ) : error ? (
//                 <p>{error}</p>
//             ) : (
//                 <Card className="mt-4">
//                     <Title>List of Privileges</Title>
//                     <Table className="mt-5">
//                         <TableHead>
//                             <TableRow>
//                                 <TableHeaderCell><Title>Id</Title></TableHeaderCell>
//                                 <TableHeaderCell><Title>Name</Title></TableHeaderCell>
//                                 <TableHeaderCell><Title>Description</Title></TableHeaderCell>
//                             </TableRow>
//                         </TableHead>
//                         <TableBody>
//                             {privileges.map((privilege) => (
//                                 <TableRow key={privilege.id}>
//                                     <TableHeaderCell>{privilege.id}</TableHeaderCell>
//                                     <TableHeaderCell>{privilege.name}</TableHeaderCell>
//                                     <TableHeaderCell>{privilege.description}</TableHeaderCell>
//                                 </TableRow>
//                             ))}
//                         </TableBody>
//                     </Table>
//                 </Card>
//             )
//             }
//         </>
//     )
// }

// export default PrivilegeScreen;