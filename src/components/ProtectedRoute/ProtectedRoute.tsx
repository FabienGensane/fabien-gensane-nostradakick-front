import { Navigate } from "react-router";
import useAuth from "../../hooks/Auth";
import { ReactNode } from "react";

function ProtectedRoute({ children }: { children: ReactNode }) {
	const { isAuthenticated, loading } = useAuth();

	if (loading) return <p>Chargement...</p>;

	if (!isAuthenticated) return <Navigate to="/login" replace />;

	return children;
}

export default ProtectedRoute;
