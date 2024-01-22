export default function MessageBox(props) {
    return (
        <div className="bg-red-500 text-white p-3 rounded relative" role="alert">
            <span className="block sm:inline">{props.message}</span>
        </div>
    )
}