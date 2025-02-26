import { useLocation } from "react-router";
import Header_mobile from "./Header-mobile/Header_mobile";
import Header_desktop from "./Header_desktop/Header_desktop";
import Header_desktop_logged from "./Header_desktop_logged/Header_desktop_logged";

interface IPropsHearders {
	setShowStats: React.Dispatch<React.SetStateAction<boolean>>;
	setShowPredict: React.Dispatch<React.SetStateAction<boolean>>;
	setShowSettings: React.Dispatch<React.SetStateAction<boolean>>;
}

const Headers = ({ setShowStats, setShowPredict, setShowSettings }:IPropsHearders) => {
	const location = useLocation();

	if (location.pathname === "/login" || location.pathname === "/signup") {
		return null;
	}

	if (location.pathname === "/") {
		return <Header_desktop />;
	}

	if (
		location.pathname === "/predictions" ||
		location.pathname === "/resultats" ||
		location.pathname === "/classement" ||
		location.pathname === "/profil"
	) {
		return (
			<>
				<Header_desktop_logged />
				<Header_mobile
					setShowStats={setShowStats}
					setShowPredict={setShowPredict}
					setShowSettings={setShowSettings}
				/>
			</>
		);
	}
};

export default Headers;
