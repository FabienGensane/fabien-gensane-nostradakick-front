import { useEffect, useState } from "react";
import HeaderProfil from "./HeaderProfil/HeaderProfil";
import MyPredict from "./MyPredict/MyPredict";
import "./ProfilPage.scss";

import { apiRequest } from "../utils/api";
import { IMatch } from "../../@types";
import { Stats } from "./Stats/Stats";
import Settings from "./Settings/Settings";

interface IPropsProfilPage {
	showStats: boolean;
	setShowStats: React.Dispatch<React.SetStateAction<boolean>>;
	showPredict: boolean;
	setShowPredict: React.Dispatch<React.SetStateAction<boolean>>;
	showSettings: boolean;
	setShowSettings: React.Dispatch<React.SetStateAction<boolean>>;
}

export const ProfilPage = ({
	showStats,
	setShowStats,
	showPredict,
	setShowPredict,
	showSettings,
	setShowSettings,
}: IPropsProfilPage) => {
	const [matchs, setMatchs] = useState<IMatch[]>();

	useEffect(() => {
		const fetchMatch = async () => {
			try {
				const data = await apiRequest("/matchs", "GET");
				setMatchs(data);
			} catch (error) {
				console.log("erreur");
			}
		};
		fetchMatch();
	}, []);

	return (
		<div className="profilPage">
			<HeaderProfil
				showStats={showStats}
				setShowStats={setShowStats}
				showPredict={showPredict}
				setShowPredict={setShowPredict}
				showSettings={showSettings}
				setShowSettings={setShowSettings}
			/>
			{showStats && <Stats matchs={matchs} />}
			{showPredict && <MyPredict />}
			{showSettings && <Settings />}
		</div>
	);
};
