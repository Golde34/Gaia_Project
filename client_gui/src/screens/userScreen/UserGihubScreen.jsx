import { Card } from "@tremor/react";
import { useCallback, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";

const UserGithubScreen = (props) => {
    const user = props.user;

    const dispatch = useDispatch();

    const userGithub = useSelector(state => state.userGithub);
    const { loading, error, userGithubInfo } = userGithub;
    const getUserGithubInfo = useCallback(() => {
        dispatch(userGithubInfo(user.id));
    }, [dispatch, user.id]);
    const debounceRef = useRef(null);
    useEffect(() => {
        clearTimeout(debounceRef.current);
        debounceRef.current = setTimeout(() => {
            getUserGithubInfo();
        }, 200);
    }, []);

    return (
        <Card>

        </Card>
    )
}

export default UserGithubScreen;