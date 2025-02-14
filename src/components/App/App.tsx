import { useEffect, useState } from "react";
import { Route, Routes } from "react-router";

// Import Composant Page
import { PredictsPage } from "../PredictsPage/PredictsPage";
import { NotFoundPage } from "../ErrorPages/404";
import { RankPage } from "../RankPage/RankPage";
import { ResultPage } from "../ResultPage/ResultPage";
import { ProfilPage } from "../ProfilPage/ProfilPage";
import { Signup } from "../Signup/Signup";
import { MainPage } from "../MainPage/MainPage";

// Import composant Hearder et footer
import Header_mobile from "../Headers/Header-mobile/Header_mobile";
import Header_desktop from "../Headers/Header_desktop/Header_desktop";
import Footer from "../Footer/Footer";
import Header_desktop_logged from "../Headers/Header_desktop_logged/Header_desktop_logged";

import "./App.scss";
import Auth from "../Authentification/authentification";
import ProtectedRoute from "../ProtectedRoute/ProtectedRoute";

function App() {
	const [sizeWindow, setSizeWindow] = useState(window.innerWidth);
	const [isLogged, setIsLogged] = useState(false);

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
			{sizeWindow < 375 ? (
				<Header_mobile />
			) : isLogged ? (
				<Header_desktop_logged />
			) : (
				<Header_desktop />
			)}

			<Routes>
				{/* Page public */}
				<Route path="/" element={<MainPage />} />
				<Route path="/login" element={<Auth />} />
				<Route path="/signup" element={<Signup />} />

				{/* Page Privée */}

				<Route
					path="/predictions"
					element={
						<ProtectedRoute>
							<PredictsPage />
						</ProtectedRoute>
					}
				/>
				<Route path="/resultats" element={<ResultPage />} />
				<Route path="/classement" element={<RankPage />} />
				<Route path="/profil" element={<ProfilPage />} />

				{/* Page 404 */}
				<Route path="*" element={<NotFoundPage />} />
			</Routes>
			{sizeWindow > 375 && <Footer />}
		</>
	);
}

export default App;