import { useEffect, useState } from "react";
import Header_mobile from "../Header-mobile/Header_mobile";
import Header_desktop from "../Header_desktop/Header_desktop";
import Footer from "../Footer/Footer";
import Header_desktop_logged from "../Header_desktop_logged/Header_desktop_logged";

import "./App.scss";

function App() {
	const [sizeWindow, setSizeWindow] = useState(0);
	const [islogged, setIsLogged] = useState(false);

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

	return (
		<>
			{sizeWindow < 490 ? (
				<Header_mobile />
			) : islogged ? (
				<Header_desktop_logged />
			) : (
				<Header_desktop />
			)}

			{sizeWindow > 490 && <Footer />}
		</>
	);
}

export default App;
