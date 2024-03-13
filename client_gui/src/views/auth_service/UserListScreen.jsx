import { useDispatch, useSelector } from "react-redux";
import Template from "../../components/template";
import { useCallback, useEffect, useRef } from "react";

function ContentArea() {
    const dispatch = useDispatch();

    const listUsers = useSelector((state) => state.userList);
    const { loading, error, users } = listUsers;

    const getListUsers = useCallback(() => {
        dispatch(getUsers());
    }, [dispatch]);

    const debounceRef = useRef(null);

    useEffect(() => {
        clearTimeout(debounceRef.current);
        debounceRef.current = setTimeout(() => {
            getListUsers();
        }, 200);

    }, []);

    return (
        <div>
            {loading ? (
                <p>Loading</p>
            ) : error ? (
                <p>{error}</p>
            ) : (
                <>
                    <Metric style={{ marginBottom: '30px', marginTop: '30px' }}
                        className="text-2xl font-bold text-gray-800"> Users
                    </Metric>
                </>
            )
            }
        </div>
    )
}

const UserListScreen = () => {
    return (
        <Template>
            <ContentArea />
        </Template>
    )
}

export default UserListScreen;