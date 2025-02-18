import { Search } from "./Search/Search";
import Predict_Card from "./Predict_Card/Predict_Card";

import "./PredicstPage.scss";
import { useEffect, useState } from "react";
import { IMatch } from "../../@types";

export const PredictsPage = () => {
	const [matchs, setMatchs] = useState<IMatch[]>([]);
// UseEffect qui permet de récupérer tous les matchs en BDD afin de les afficher
	useEffect(() => {
		const fetchPredicts = async () => {
			try {
				const response = await fetch("http://localhost:3000/api/matchs");
				const data = await response.json();
				setMatchs(data);
			} catch (error) {
				console.log("erreur");
			}
		};
		fetchPredicts();
	}, []);
// UseEffect qui permet de récupérer toutes les données du user connecté pour afficher les prédictions du USER
	useEffect(() => {
		const fetchPredicts = async () => {
			try {
				const response = await fetch("http://localhost:3000/api/matchs");
				const data = await response.json();
				setMatchs(data);
			} catch (error) {
				console.log("erreur");
			}
		};
		fetchPredicts();
	}, []);

	// Trier les débuts de matchs par ordre croissant
	matchs.sort((a, b) => a.date.localeCompare(b.date));

	return (
		<main className="main__predicts">
			<Search />
			<div className="main__predicts__container">
				{matchs.map((match) => (
					<Predict_Card key={match.match_id} match={match} />
				))}
			</div>
		</main>
	);
};
