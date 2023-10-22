import React from "react";
import { Navigate } from "react-router-dom";
import {useAuth} from "../context/AuthContext";
import {ROLE} from "../Constant";

const AdminRoute = ({ children }) => {
    const { getUser , userIsAuthenticated } = useAuth()
    const user = getUser();

    if (userIsAuthenticated()) {
        return user && user.role === ROLE.SERVICE_PLANNING ? children : <Navigate to="/" />
    } else {
        return <Navigate to="/login" />
    }

}

export default AdminRoute;