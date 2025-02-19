import { Navigate } from "react-router";
import useAuth from "../../hooks/Auth";

function PublicRoute({ children }) {
	const { isAuthenticated } = useAuth();

	if (isAuthenticated) return <Navigate to="/predictions" replace />;

	return children;
}

export default PublicRoute;
