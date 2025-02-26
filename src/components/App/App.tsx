import { Route, Routes } from "react-router";

// Import Composant Page
import { PredictsPage } from "../PredictsPage/PredictsPage";
import { NotFoundPage } from "../ErrorPages/404";
import { RankPage } from "../RankPage/RankPage";
import { ResultPage } from "../ResultPage/ResultPage";
import { ProfilPage } from "../ProfilPage/ProfilPage";
import Signup from "../Signup/Signup";
import { MainPage } from "../MainPage/MainPage";
import Auth from "../Authentification/authentification";

// Import composant Header et Footer
import Headers from "../Headers/Headers";
import Footer from "../Footer/Footer";

// Import SCSS
import "./App.scss";

// Composant de prtection de route
import ProtectedRoute from "../ProtectedRoute/ProtectedRoute";
import PublicRoute from "../ProtectedRoute/PublicRoute";

// Import Toast
import { ToastContainer } from "react-toastify";
import { useState } from "react";

function App() {
	const [showStats, setShowStats] = useState(true);
	const [showPredict, setShowPredict] = useState(false);
	const [showSettings, setShowSettings] = useState(false);
	return (
		<>
			<ToastContainer />
			<Headers
				setShowStats={setShowStats}
				setShowPredict={setShowPredict}
				setShowSettings={setShowSettings}
			/>

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
							<ProfilPage
								showStats={showStats}
								setShowStats={setShowStats}
								showPredict={showPredict}
								setShowPredict={setShowPredict}
								showSettings={showSettings}
								setShowSettings={setShowSettings}
							/>
						</ProtectedRoute>
					}
				/>

				{/* Page 404 */}
				<Route path="*" element={<NotFoundPage />} />
			</Routes>
			<Footer />
		</>
	);
}

export default App;
