import { Search } from "./Search/Search";
import "./PredicstPage.scss";
import { useEffect, useState } from "react";
import { IMatch } from "../../@types";
import { useUserData } from "../../hooks/UserData";
import Predict_Card_logged from "./Predict_Card_logged/Predict_Card_logged";

export const PredictsPage = () => {
	const [matchs, setMatchs] = useState<IMatch[]>([]);
	const { user } = useUserData();

	useEffect(() => {
		const fetchData = async () => {
			try {
				const response = await fetch(
					"http://localhost:3000/api/calendar/profil",
					{
						method: "GET",
						headers: {
							"Content-type": "application/json; charset=UTF-8",
							Authorization: `Bearer ${localStorage.getItem("jwt")}`,
						},
					},
				);

				if (!response.ok) {
					const errorMessage = await response.text();
					console.error(`Error: ${response.status} - ${errorMessage}`);
					throw new Error(errorMessage);
				}

				const data = await response.json();
				setMatchs(data);
			} catch (error) {
				console.error("Erreur lors de la récupération des données:", error);
			}
		};

		fetchData();
	}, []);

	// Trier les débuts de matchs par ordre croissant
	const sortedMatchs = matchs.sort((a, b) => a.date.localeCompare(b.date));

	return (
		<main className="main__predicts">
			<Search className="main__predicts__search" />
			<div className="main__predicts__container">
				{sortedMatchs.map((match) => {
					const initialPrediction = match.prediction.find(
						(pred) => pred.user_id === user?.user_id,
					);
					console.log(initialPrediction);

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
