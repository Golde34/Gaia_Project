import Sidebar from '../../components/subComponents/impl/Sidebar';
import Navbar from '../../components/subComponents/impl/Navbar';

const Template = (props) => {
  return (
    <>
      <Sidebar />
      <div className="flex flex-col flex-1 relative">
        <Navbar />
        {props.children}
      </div>
    </>
  )
}

export default Template;