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
                    navigate('/privilege-role-dashboard');
                }}
            >Privielge And Role Dashboard</Button>
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