import React from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

export default function GaiaRoute({children}) {
    const gaiaAutoSignin = useSelector((state) => state.gaiaSignin);
    const { gaiaInfo } = gaiaAutoSignin;
    return gaiaInfo ? children : < Navigate to='/signin' />
}