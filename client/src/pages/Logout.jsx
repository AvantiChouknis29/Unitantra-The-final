import { useEffect } from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from '../store/auth'; // Import useAuth hook

export const Logout = () => {
    const { LogoutUser } = useAuth(); // Destructure LogoutUser from useAuth hook

    useEffect(() => {
        LogoutUser();
    }, [LogoutUser]);

    return <Navigate to="/login" />;
};
