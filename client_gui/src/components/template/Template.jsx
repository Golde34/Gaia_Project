import Sidebar from '../Sidebar';
import Navbar from '../Navbar';

const Template = (props) => {
  return (
    <>
        <div className="fixed top-0 left-0 h-full z-10">
          <Sidebar />
        </div>
        <div className="flex flex-col flex-1 relative">
          <Navbar />
          {props.children}
        </div>
    </>
  )
}
export default Template;