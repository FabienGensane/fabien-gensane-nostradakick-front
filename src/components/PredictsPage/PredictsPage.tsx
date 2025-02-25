import { Search } from "./Search/Search";
import { apiRequest } from "../utils/api";
import "./PredicstPage.scss";
import { useEffect, useState } from "react";
import { IMatch } from "../../@types";
import { useUserData } from "../../hooks/UserData";
import Predict_Card_logged from "./Predict_Card_logged/Predict_Card_logged";

export const PredictsPage = () => {
	const [matchs, setMatchs] = useState<IMatch[]>([]);
	const [filteredValue, setFilteredValue] = useState("");
	const { user } = useUserData();

	console.log(matchs);

	useEffect(() => {
		const fetchData = async () => {
			try {
				const matchsToPlay = await apiRequest("/calendar/profil", "GET");

				setMatchs(matchsToPlay);
			} catch (error) {
				console.error("Erreur lors de la récupération des données:", error);
			}
		};

		fetchData();
	}, []);

	// Trier les débuts de matchs par ordre croissant
	const sortedMatchs = matchs.sort((a, b) => a.date.localeCompare(b.date));

	const filteredMatchs = sortedMatchs.filter((match) => {
		if (
			match.team[0].name.toLowerCase().includes(filteredValue.toLowerCase()) ||
			match.team[1].name.toLowerCase().includes(filteredValue.toLowerCase())
		) {
			return true;
		}
		return false;
	});

	return (
		<main className="main__predicts">
			<Search
				filteredValue={filteredValue}
				setFilteredValue={setFilteredValue}
				className="main__predicts__search"
			/>
			<div className="main__predicts__container">
				{filteredMatchs.map((match) => {
					const initialPrediction = match.prediction.find(
						(pred) => pred.user_id === user?.user_id,
					);
					return (
						<Predict_Card_logged
							key={match.match_id}
							match={match}
							initialPrediction={initialPrediction}
						/>
					);
				})}
			</div>
		</main>
	);
};
