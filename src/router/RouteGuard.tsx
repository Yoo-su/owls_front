import { Navigate } from "react-router-dom";

interface Props {
    children: React.ReactElement;
}
const RouteGuard = ({ children }: Props) => {
    function hasJWT() {
        let flag = false;

        localStorage.getItem("token") ? flag = true : flag = false

        return flag
    }
    if (!hasJWT()) {
        // user is not authenticated
        return <Navigate to="/signin" />;
    }
    return children;
};

export default RouteGuard;