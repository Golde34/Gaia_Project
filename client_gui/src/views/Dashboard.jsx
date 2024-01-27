import LeftColumn from "../components/LeftColumn"
import RightColumn from "../components/RightColumn"
import Template from "../components/template"

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

const Dashboard = () => {
  return (
    <>
      <Template>
        <ContentArea />
      </Template>
    </>
  )
}

export default Dashboard;