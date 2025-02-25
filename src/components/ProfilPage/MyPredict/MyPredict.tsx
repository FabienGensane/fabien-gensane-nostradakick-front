import { useEffect, useState } from "react";
import Team from "../../PredictsPage/Predict_Card_logged/Team/Team";
import "./MyPredict.scss";
import { apiRequest } from "../../utils/api";
import MyPredictCard from "./MyPredictCard/MyPredictCard";
import { IMatch } from "../../../@types";

const MyPredict = () => {

    const [matchs, setMatchs]=useState<IMatch[]>();

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
		<div className="myPredict">
			{matchs.map((match)=> {
                <MyPredictCard key={match.match_id} />
            })}
		</div>
	);
};

export default MyPredict;
