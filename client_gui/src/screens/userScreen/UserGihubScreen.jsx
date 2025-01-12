import { Card } from "@tremor/react";
import { useCallback, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUserGithubInfo } from "../../api/store/actions/contribution_tracker/user-commit.actions";
import MessageBox from "../../components/subComponents/MessageBox";

const UserGithubScreen = (props) => {
    const user = props.user;

    const dispatch = useDispatch();

    const userGithub = useSelector(state => state.userGithubInfo);
    const { loading, error, userGithubInfo } = userGithub;
    const findUserGithubInfo = useCallback(() => {
        dispatch(getUserGithubInfo(user.id));
    }, [dispatch, user.id]);
    const debounceRef = useRef(null);
    useEffect(() => {
        clearTimeout(debounceRef.current);
        debounceRef.current = setTimeout(() => {
            findUserGithubInfo();
        }, 200);
        console.log("userGithubInfo: ", userGithubInfo);
    }, []);

    return (
        <div>
            {loading ? (
                <p>Loading...</p>
            ) : error ? (
                <MessageBox message={error}></MessageBox>
            ) : userGithubInfo && userGithubInfo.userConsent == 0 ? (
                <MessageBox message="User has not given consent to access Github"></MessageBox>
            ) : (
                <Card>
                    <p>Username: {user.username}</p>
                    <p>UserGithubInfo: {userGithubInfo.githubUrl}</p>
                </Card>
            )}
        </div >
    )
}

export default UserGithubScreen;