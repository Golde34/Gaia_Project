import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

export default function UserRoute({ children }) {
    const userSignin = useSelector((state) => state.userSignin);
    const { userInfo } = userSignin;
    return userInfo ? children : <Navigate to='/dashboard' />
}