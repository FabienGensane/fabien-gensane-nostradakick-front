import { useEffect, useState } from "react";
import "./MyPredict.scss";
import { apiRequest } from "../../utils/api";
import MyPredictCard from "./MyPredictCard/MyPredictCard";
import { IMatch } from "../../../@types";

const MyPredict = () => {
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

	const sortedMatchs = matchs?.sort((a, b) => a.date.localeCompare(b.date));

	return (
		<div className="myPredict">
			{sortedMatchs?.map((match) => (
				<MyPredictCard key={match.match_id} match={match} />
			))}
		</div>
	);
};

export default MyPredict;
