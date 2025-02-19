import { ReactElement, useEffect, useState } from "react";
import Header_mobile from "./Header-mobile/Header_mobile";
import useAuth from "../../hooks/Auth";
import Header_desktop from "./Header_desktop/Header_desktop";
import Header_desktop_logged from "./Header_desktop_logged/Header_desktop_logged";

type HeaderComponentType =
	| ReactElement<typeof Header_mobile>
	| ReactElement<typeof Header_desktop>
	| ReactElement<typeof Header_desktop_logged>
	| null;

const Headers = () => {
	const { isAuthenticated } = useAuth();
	const [sizeWindow, setSizeWindow] = useState(window.innerWidth);
	const [headerComponent, setHeaderComponent] =
		useState<HeaderComponentType>(null);

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

	useEffect(() => {
		if (sizeWindow < 426) {
			setHeaderComponent(<Header_mobile />);
		} else if (!isAuthenticated) {
			setHeaderComponent(<Header_desktop />);
		} else {
			setHeaderComponent(<Header_desktop_logged />);
		}
	}, [sizeWindow, isAuthenticated]);

	return <div>{headerComponent}</div>;
};

export default Headers;
