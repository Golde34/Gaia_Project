import ManagerSidebar from "../ManagerSidebar";
import Navbar from "../Navbar";

const ManagerTemplate = (props) => {
  return (
    <>
        <div className="fixed top-0 left-0 h-full z-10">
          <ManagerSidebar />
        </div>
        <div className="flex flex-col flex-1 relative">
          <Navbar />
          {props.children}
        </div>
    </>
  )
}

export default ManagerTemplate; 