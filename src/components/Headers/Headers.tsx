import { useEffect, useState } from "react";
import Header_mobile from "./Header-mobile/Header_mobile";
import useAuth from "../../hooks/Auth";
import Header_desktop from "./Header_desktop/Header_desktop";
import Header_desktop_logged from "./Header_desktop_logged/Header_desktop_logged";

const Headers = () => {
	const { isAuthenticated } = useAuth();
	const [sizeWindow, setSizeWindow] = useState(window.innerWidth);

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
		if (sizeWindow < 375) return <Header_mobile />;
		if (sizeWindow < 375 && !isAuthenticated) return <></>;
		if (!isAuthenticated) return <Header_desktop />;
		return <Header_desktop_logged />;
	};

	return <div>{headerRender()}</div>;
};

export default Headers;
