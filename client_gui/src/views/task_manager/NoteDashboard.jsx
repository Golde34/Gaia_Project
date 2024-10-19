import { useDispatch } from "react-redux";
import Template from "../../components/template/Template";

function ContentArea() {
    const dispatch = useDispatch();

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