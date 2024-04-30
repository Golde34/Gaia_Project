import { Metric } from "@tremor/react";
import Template from "../../components/template";

function ContentArea() {
    return (
        <>
            <Metric style={{ marginBottom: '30px', marginTop: '30px' }}
                className="text-2xl font-bold text-gray-800"> Privilege Dashboard
            </Metric>
        </>
    )
}

const PrivilegeDashboard = () => {
    return (
        <Template>
            <ContentArea />
        </Template>
    )
}

export default PrivilegeDashboard;