import { useState, useEffect } from "react";

const useAuth = () => {
	const [isAuthenticated, setIsAuthenticated] = useState(false);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		const checkAuthStatus = async () => {
			try {
				const response = await fetch("http://localhost:3000/api/auth/check", {
					method: "GET",
					headers: {
						Authorization: `Bearer ${localStorage.getItem("jwt")}`, // Ajouter le token dans le header Authorization
					},
				});

				if (response.ok) {
					setIsAuthenticated(true);
				} else {
					setIsAuthenticated(false);
				}
			} catch (error) {
				setIsAuthenticated(false);
			} finally {
				setLoading(false);
			}
		};

		checkAuthStatus();
	}, []);

	return { isAuthenticated, loading };
};

export default useAuth;
