import { useEffect, useState } from "react";
import { useLocation } from "react-router";
import Header_mobile from "./Header-mobile/Header_mobile";
import useAuth from "../../hooks/Auth";
import Header_desktop from "./Header_desktop/Header_desktop";
import Header_desktop_logged from "./Header_desktop_logged/Header_desktop_logged";

const Headers = () => {
	const { isAuthenticated } = useAuth();
	const [sizeWindow, setSizeWindow] = useState(window.innerWidth);
	const location = useLocation();

	useEffect(() => {
		const handleResize = () => {
			setSizeWindow(window.innerWidth);
		};

		// Ajouter un écouteur d'événement pour "resize"
		window.addEventListener("resize", handleResize);

		// Supprimer l'écouteur d'événement pour "resize"
		return () => {
			window.removeEventListener("resize", handleResize);
		};
	}, []);

	const headerRender = () => {
		if (sizeWindow < 426) return <Header_mobile />;
		if (!isAuthenticated) return <Header_desktop />;
		if (sizeWindow < 426 && !isAuthenticated) return <></>;
		
		return <Header_desktop_logged />;
	};

	// Ne pas rendre le header sur les pages /login et /signup
    if (location.pathname === "/login" || location.pathname === "/signup") {
        return null;
    }

	if (location.pathname === "/predictions" || location.pathname === "/resultats" || location.pathname === "/classement") {
        return <Header_desktop_logged />;
	}

	return <div>{headerRender()}</div>;
};

export default Headers;
