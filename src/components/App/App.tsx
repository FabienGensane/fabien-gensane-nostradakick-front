import { useEffect, useState } from "react";
import { Route, Routes } from 'react-router'; 

// Import Composant Page
import Authentification from "../Authentification/authentification";
import { PredictsPage } from "../PredictsPage/PredictsPage";
import { NotFoundPage } from "../NotFoundPage/NotFoundPage";
import { RankPage } from "../RankPage/RankPage";
import { ResultPage } from "../ResultPage/ResultPage";
import { ProfilPage } from "../ProfilPage/ProfilPage";
import { Signup } from "../Signup/Signup";
import { MainPage } from "../MainPage/MainPage";
// Import composant Hearder et footer
// import Header_mobile from "../Headers/Header-mobile/Header_mobile";
// import Header_desktop from "../Headers/Header_desktop/Header_desktop";
// import Footer from "../Footer/Footer";
// import Header_desktop_logged from "../Headers/Header_desktop_logged/Header_desktop_logged";


import "./App.scss";

function App() {
	const [sizeWindow, setSizeWindow] = useState(492);
	const [isLogged, setIsLogged] = useState(true);

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

		/*{sizeWindow < 490 ? (
			<Header_mobile />
		) : islogged ? (
			<Header_desktop_logged />
		) : (
			<Header_desktop />
		)}
		<PredictsPage />
	
		{sizeWindow > 490 && <Footer />}*/
		<>
			<Routes>
				{/* Page public */}
				<Route path="/" element={<MainPage />} />
				<Route path="/login" element={<Authentification />} />
				<Route path="/signup" element={<Signup />} />

				{/* Page Privée */}
				{isLogged && <Route path="/prediction" element={<PredictsPage />} />}
				{isLogged && <Route path="/resultats" element={<ResultPage />} />}
				{isLogged && <Route path="/classement" element={<RankPage />} />}
				{isLogged && <Route path="/profil" element={<ProfilPage />} />}
				
				{/* Page 404 */}
				<Route path="*" element={<NotFoundPage />} />
			</Routes>

		
		
		
		</>
	)
}

export default App;
