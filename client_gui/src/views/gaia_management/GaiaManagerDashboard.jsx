import LeftColumn from "../../components/LeftColumn";
import RightColumn from "../../components/RightColumn";
import ManagerTemplate from "../../components/template/ManagerTemplate"

function ContentArea() {
    return (
        <div className="grid md:grid-cols-3 grid-cols-1 w-full">
            <div className="col-span-2">
                <LeftColumn />
            </div>
            <div className="w-full">
                <RightColumn />
            </div>
        </div>
    )
}

const GaiaManagerDashboard = () => {
    return (
        <ManagerTemplate>
            <ContentArea />
        </ManagerTemplate>
    )
}

export default GaiaManagerDashboard;