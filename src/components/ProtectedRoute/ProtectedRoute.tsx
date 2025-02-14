import { Navigate } from "react-router";
import useAuth from "../../hooks/Auth";


function ProtectedRoute({ children }) {
	const { isAuthenticated, loading } = useAuth();

	if (loading) return <p>Chargement...</p>;

	if (!isAuthenticated) return <Navigate to="/login" replace />;

	return children;
}

export default ProtectedRoute;