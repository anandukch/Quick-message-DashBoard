import React, { FC, useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { RootState } from "../../store";

const RequireAuth: FC<{ children: JSX.Element }> = ({ children }) => {
    const auth = useSelector((state: RootState) => state.auth);
    const navigate = useNavigate();
    useEffect(() => {
        // eslint-disable-next-line @typescript-eslint/no-unused-expressions
        !auth.isAuthenticated && navigate("/login", { replace: true });
    }, [auth.isAuthenticated, navigate]);
    return children;
};

export default RequireAuth;
