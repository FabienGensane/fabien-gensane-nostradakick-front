import { useEffect, useState } from "react";
import Header_mobile from "../Headers/Header-mobile/Header_mobile";
import Header_desktop from "../Headers/Header_desktop/Header_desktop";
import Footer from "../Footer/Footer";
import Header_desktop_logged from "../Headers/Header_desktop_logged/Header_desktop_logged";

import "./App.scss";
import { PredictsPage } from "../PredictsPage/PredictsPage";

function App() {
	const [sizeWindow, setSizeWindow] = useState(492);
	const [islogged, setIsLogged] = useState(true);

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
			<PredictsPage />
			{/* <button type="button" onClick={}>Change</button> */}

			{sizeWindow > 490 && <Footer />}
		</>
	);
}

export default App;
