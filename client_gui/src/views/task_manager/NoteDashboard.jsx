import { useDispatch } from "react-redux";
import Template from "../../components/template/Template";
import { useEffect } from "react";
import { isAccessTokenCookieValid } from "../../kernels/utils/cookie-utils";
import { useNavigate } from "react-router-dom";

function ContentArea() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    // const userId = localStorage.getItem('userInfo');
    const userId = "1";

    const isUserValid = isAccessTokenCookieValid();
    useEffect(() => {
        if (isUserValid) {
            navigate('/signin');
        }
    }, [isUserValid, navigate]);
    

    return (
        <div>
            <h1>Note Dashboard</h1>
        </div>
    )
}

const NoteDashboard = () => {
    return (
        <Template>
            <ContentArea />
        </Template>
    );
}

export default NoteDashboard;