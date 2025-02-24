import { useEffect, useState } from "react";
import { Route, Routes } from "react-router";

// Import Composant Page
import { PredictsPage } from "../PredictsPage/PredictsPage";
import { NotFoundPage } from "../ErrorPages/404";
import { RankPage } from "../RankPage/RankPage";
import { ResultPage } from "../ResultPage/ResultPage";
import { ProfilPage } from "../ProfilPage/ProfilPage";
import Signup from "../Signup/Signup";
import { MainPage } from "../MainPage/MainPage";

// Import composant Hearder et footer
// import Header_mobile from "../Headers/Header-mobile/Header_mobile";
// import Header_desktop from "../Headers/Header_desktop/Header_desktop";
import Footer from "../Footer/Footer";
// import Header_desktop_logged from "../Headers/Header_desktop_logged/Header_desktop_logged";

import "./App.scss";
import Auth from "../Authentification/authentification";
import ProtectedRoute from "../ProtectedRoute/ProtectedRoute";
import Headers from "../Headers/Headers";
import PublicRoute from "../ProtectedRoute/PublicRoute";
import { ToastContainer } from "react-toastify";
function App() {
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

	return (
		<>
			<ToastContainer/>
			<Headers />

			<Routes>
				{/* Page public */}
				<Route
					path="/"
					element={
						<PublicRoute>
							<MainPage />
						</PublicRoute>
					}
				/>
				<Route
					path="/login"
					element={
						<PublicRoute>
							<Auth />
						</PublicRoute>
					}
				/>
				<Route
					path="/signup"
					element={
						<PublicRoute>
							<Signup />
						</PublicRoute>
					}
				/>

				{/* Page Privée */}

				<Route
					path="/predictions"
					element={
						<ProtectedRoute>
							<PredictsPage />
						</ProtectedRoute>
					}
				/>
				<Route
					path="/resultats"
					element={
						<ProtectedRoute>
							<ResultPage />
						</ProtectedRoute>
					}
				/>
				<Route
					path="/classement"
					element={
						<ProtectedRoute>
							<RankPage />
						</ProtectedRoute>
					}
				/>
				<Route
					path="/profil"
					element={
						<ProtectedRoute>
							<ProfilPage />
						</ProtectedRoute>
					}
				/>

				{/* Page 404 */}
				<Route path="*" element={<NotFoundPage />} />
			</Routes>
			{sizeWindow > 375 && <Footer />}
		</>
	);
}

export default App;
