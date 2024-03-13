import Template from "../../components/template"

function ContentArea() {
    return (
        <div>
            <p>User Profile</p>
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