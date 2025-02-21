import { useEffect, useState } from "react";
import { IMatch } from "../../@types";
import DateResult from "./DateResult/DateResult";
import "./ResultPage.scss";
import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";

import { useUserData } from "../../hooks/UserData";
import ResultMatch from "./ResultMatch/ResultMatch";

dayjs.extend(customParseFormat);

export interface IDate {
	date: number;
	day: string;
	month: string;
	year: number;
}

const initalDate = () => {
	const daysOfWeek = ["Dim", "Lun", "Mar", "Mer", "Jeu", "Ven", "Sam"];
	const daysOfMonth = [
		"Janvier",
		"Février",
		"Mars",
		"Avril",
		"Mai",
		"Juin",
		"Juillet",
		"Août",
		"Septembre",
		"Octobre",
		"Novembre",
		"Décembre",
	];
	const date = new Date();
	const currentDate = date.getDate() as number;
	const arrayDate = {
		date: currentDate,
		day: daysOfWeek[date.getDay()],
		month: daysOfMonth[date.getMonth()],
		year: date.getFullYear(),
	};
	return arrayDate;
};

console.log(initalDate());

export const ResultPage = () => {
	const [matchs, setMatchs] = useState<IMatch[]>([]);
	const [ActiveDate, setActiveDate] = useState(initalDate());

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

	const calendar = () => {
		const daysOfWeek = ["Dim", "Lun", "Mar", "Mer", "Jeu", "Ven", "Sam"];
		const daysOfMonth = [
			"Janvier",
			"Février",
			"Mars",
			"Avril",
			"Mai",
			"Juin",
			"Juillet",
			"Août",
			"Septembre",
			"Octobre",
			"Novembre",
			"Décembre",
		];
		const date = new Date();
		const currentDate = date.getDate();
		const arrayDate = [
			{
				date: currentDate,
				day: daysOfWeek[date.getDay()],
				month: daysOfMonth[date.getMonth()],
				year: date.getFullYear(),
			},
		];

		const addDates = (start: number, increment: number, count: number) => {
			for (let i = 1; i <= count; i++) {
				const newDate = new Date(date);
				newDate.setDate(start + i * increment);
				arrayDate.push({
					date: newDate.getDate(),
					day: daysOfWeek[newDate.getDay()],
					month: daysOfMonth[date.getMonth()],
					year: date.getFullYear(),
				});
			}
		};

		addDates(currentDate, 1, 5); // Ajoute les 5 dates suivantes
		addDates(currentDate, -1, 5); // Ajoute les 5 dates précédentes

		arrayDate.sort((a, b) => a.date - b.date); // Trie le tableau par ordre croissant de date

		return arrayDate;
	};

	const dateMatch = calendar();

	const newMatchs = matchs.filter((match) => {
		return Number(dayjs(match.date).format("D")) === ActiveDate?.date;
	});

	return (
		<div className="result">
			<h1 className="result__title">Résultats</h1>
			<div className="result__containerDate">
				{dateMatch.map((date) => (
					<DateResult
						key={date.date}
						date={date}
						setActiveDate={setActiveDate}
						ActiveDate={ActiveDate}
					/>
				))}
			</div>
			<div className="result__MatchContainer">
				{newMatchs.length > 0 ? (
					newMatchs.map((match) => (
						<ResultMatch match={match} key={match.match_id} />
					))
				) : (
					<p>Aucun match ce jour !</p>
				)}
			</div>
		</div>
	);
};
