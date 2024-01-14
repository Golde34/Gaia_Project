import { useDispatch, useSelector } from "react-redux"
import { gaiaSignin } from "../../api/store/actions/auth_service/userActions";
import RenderRouter from "../../routers";
import Signin from "./Signin";
import { useEffect, useRef } from "react";

const GaiaAutoSignin = () => {
    const dispatch = useDispatch();

    const gaia = useSelector((state) => state.gaiaSignin)
    const { gaiaInfo, loading, error } = gaia;

    const didGaiaAuthenticateRef = useRef();

    useEffect(() => {
        if (didGaiaAuthenticateRef.current) return;
        dispatch(gaiaSignin());
        didGaiaAuthenticateRef.current = true;
    }, [dispatch]);

    return (
        <div>
            { loading ? (
                    <div>Loading...</div>
                ) : error ? (
                    <div><Signin /></div>
                ) : (
                    <div>
                        {gaiaInfo ? (
                            <RenderRouter />
                        ) : (
                            <Signin />
                        )}
                    </div>
                )
            }
        </div>
    )
}

export default GaiaAutoSignin;