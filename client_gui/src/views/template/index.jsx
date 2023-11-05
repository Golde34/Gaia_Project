import Sidebar from '../../components/Sidebar';
import Navbar from '../../components/Navbar';

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