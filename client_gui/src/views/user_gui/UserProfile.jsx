import { Button } from "@tremor/react";
import Template from "../../components/template"
import { useNavigate } from "react-router-dom";

function ContentArea() {
    const navigate = useNavigate();

    return (
        <div>
            <p>User Profile</p>
            <Button
                onClick={() => {
                    navigate('/role-dashboard');
                }}
            >Role Dashboard</Button>
            <Button
                onClick={() => {
                    navigate('/privilege-dashboard');
                }}
            >Privilege Dashboard</Button>
        </div>
    )
}

const UserProfile = () => {
    return (
        <Template>
            <ContentArea />
        </Template>
    )
}

export default UserProfile;