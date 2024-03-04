import { useDispatch, useSelector } from "react-redux"
import { gaiaSignin } from "../../api/store/actions/auth_service/auth.actions";
import { useEffect, useMemo, useRef } from "react";
import { useCookies } from "react-cookie";
import { Navigate } from "react-router-dom"

const GaiaAutoSignin = () => {
    const dispatch = useDispatch();
    const [cookies, setCookies] = useCookies(['accessToken'])

    const gaia = useSelector((state) => state.gaiaSignin)
    const { gaiaInfo, loading, error } = gaia;
    const obj = useMemo(() => {
        if (gaiaInfo !== null && gaiaInfo !== undefined && gaiaInfo !== '') {
            return gaiaInfo;
        }
    })
    const didGaiaAuthenticateRef = useRef();

    useEffect(() => {
        if (didGaiaAuthenticateRef.current) return;
        dispatch(gaiaSignin());
        didGaiaAuthenticateRef.current = true;
    }, [dispatch]);

    useEffect(() => {
        setCookies('accessToken', obj)
    }, [obj]);

    return (
        <div>
            {loading ? (
                <div>Loading...</div>
            ) : error ? (
                <div><Navigate to='/signin' /></div>
            ) : gaiaInfo ? (
                <div><Navigate to='/dashboard' /></div>
            ) : (
                <div><></></div>
            )
            }
        </div >
    )
}

export default GaiaAutoSignin;