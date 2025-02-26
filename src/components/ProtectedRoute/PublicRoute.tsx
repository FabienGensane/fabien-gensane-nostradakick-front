import { Navigate } from "react-router";
import useAuth from "../../hooks/Auth";
import { ReactNode } from "react";

function PublicRoute({ children }: { children: ReactNode }) {
	const { isAuthenticated } = useAuth();

	if (isAuthenticated) return <Navigate to="/predictions" replace />;

	return children;
}

export default PublicRoute;
