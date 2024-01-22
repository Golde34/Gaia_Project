import { useDispatch, useSelector } from "react-redux"
import { gaiaSignin } from "../../api/store/actions/auth_service/userActions";
import Signin from "./Signin";
import { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";

const GaiaAutoSignin = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const gaia = useSelector((state) => state.gaiaSignin)
    const { gaiaInfo, loading, error } = gaia;

    const didGaiaAuthenticateRef = useRef();

    useEffect(() => {
        if (didGaiaAuthenticateRef.current) return;
        dispatch(gaiaSignin());
        didGaiaAuthenticateRef.current = true;
    }, [dispatch]);

    const navigateToCorrectPage = (path) => {
        navigate('/' + path);
    }

    console.log(gaiaInfo);
    console.log('accessToken: ' + localStorage.getItem('gaiaAccessToken'));
    console.log('gaiaInfo: ' + localStorage.getItem('gaiaInfo'));
    return (
        <div>
            {loading ? (
                <div>Loading...</div>
            ) : error ? (
                <div><Signin /></div>
            ) : gaiaInfo ? (
                <div>{navigateToCorrectPage('dashboard')}</div>
            ) : (
                <div>{navigateToCorrectPage('signin')}</div>
            )
            }
        </div>
    )
}

export default GaiaAutoSignin;