import { useEffect, useState } from "react";
import { IMatch } from "../../@types";
import Team from "../PredictsPage/Predict_Card_logged/Team/Team";
import DateResult from "./DateResult/DateResult";
import "./ResultPage.scss";

export const ResultPage = () => {
	const [matchs, setMatchs] = useState<IMatch[]>([]);
	const { user } = useUserData();


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

	const dateArray = [
		{
			date: "04",
			jour: "Mar",
		},
		{
			date: "05",
			jour: "Mer",
		},
		{
			date: "06",
			jour: "Jeu",
		},
		{
			date: "07",
			jour: "Ven",
		},
		{
			date: "08",
			jour: "Sam",
		},
		{
			date: "09",
			jour: "Dim",
		},
		{
			date: "10",
			jour: "Lun",
		},
		{
			date: "11",
			jour: "Mar",
		},
		{
			date: "12",
			jour: "Mer",
		},
		{
			date: "13",
			jour: "Jeu",
		},
		{
			date: "14",
			jour: "Ven",
		},
	];

	

	return (
		<div className="result">
			<h1 className="result__title">Résultats</h1>
			<div className="result__containerDate">
				{/*  */}
				{dateArray.map((date) => (
					<DateResult date={date} key={date.date} />
				))}
				{/*  */}
			</div>
			<div className="result__MatchContainer">
				{matchs.map((match) => (
					<div key={match.match_id}>
						{/* Prédiction */}
						<div className="predictCard__containerPredict">
							{/* Home Team */}
							<Team team={match.team[0]} />
							<div className="predictCard__containerPredict__inputContent">
								<p>
									{match.score_home} - {match.score_away}
								</p>
							</div>
							<Team team={match.team[1]} />
						</div>
						<div>
							<div>
								<h3>Ma prédiction</h3>
								<p>2 - 1</p>
							</div>
							<div>
								<p>60 pts</p>
								<img src="" alt="" />
							</div>
						</div>
					</div>
				))}
			</div>
		</div>
	);
};

import "./ResultPage.scss";
import { useUserData } from "../../hooks/UserData";
