import { useEffect, useState } from "react";
import HeaderProfil from "./HeaderProfil/HeaderProfil";
import MyPredict from "./MyPredict/MyPredict";
import "./ProfilPage.scss";
import { Stats } from "./Stats/Stats";
import { apiRequest } from "../utils/api";
import { IMatch } from "../../@types";
import Settings from "./Settings/Settings";

export const ProfilPage = () => {
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
			<HeaderProfil />
			{/* <Settings /> */}
			{/* <Stats matchs={matchs} /> */}
			<MyPredict />
		</div>
	);
};
