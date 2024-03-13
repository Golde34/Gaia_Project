import RightColumn from "../../components/RightColumn";
import Template from "../../components/template";
import PrivilegeScreen from "../../screens/authManagerScreen/PrivilegeListScreen";
import RoleListScreen from "../../screens/authManagerScreen/RoleListScreen";
import UserListScreen from "../../screens/authManagerScreen/UserListScreen";

function ContentArea() {
    return (
        <>
            <div className="grid md:grid-cols-3 grid-cols-1 w-full">
                <div className="col-span-2">
                    <div className="w-full flex flex-col justify-between p-2">
                        <div className="flex-auto w-full">
                            <UserListScreen />
                            <RoleListScreen />
                            <PrivilegeScreen />
                        </div>
                    </div>
                </div>
                <div className="w-full">
                    <RightColumn />
                </div>
            </div>
        </>
    )
}

const AuthManagerDashboard = () => {
    return (
        <Template>
            <ContentArea />
        </Template>
    )
}

export default AuthManagerDashboard;