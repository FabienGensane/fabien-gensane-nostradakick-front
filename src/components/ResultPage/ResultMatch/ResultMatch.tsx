import { IMatch, IPredicts } from "../../../@types";
import Team from "../../PredictsPage/Predict_Card_logged/Team/Team";
import pictoPoint from "../../../assets/Pictos/pointStar.svg";
import "./ResultMatch.scss";
import { useUserData } from "../../../hooks/UserData";
import dayjs from "dayjs";
import { useEffect, useState } from "react";
import useAddPoints from "../../../hooks/AddPoints";

const ResultMatch = ({ match }: { match: IMatch }) => {
	const { user } = useUserData();
	const [isMatchEnd, setIsMatchEnd] = useState(false);

	const scorePredict: IPredicts | undefined = user?.prediction.find(
		(predict) => predict.match_id === match.match_id,
	);

	const { addPoint } = useAddPoints({
		match,
		scorePredict: scorePredict || ({} as IPredicts),
	});

	const predictPoint = (predict: IPredicts) => {
		if (predict) {
			return predict.points_score * 50 + predict.points_outcome * 10;
		}
		return 0;
	};

	useEffect(() => {
		const checkMatchEnd = () => {
			const date = dayjs(match.date);
			const dateSecond = date.diff(dayjs(), "second");
			setIsMatchEnd(dateSecond <= 0);
		};

		checkMatchEnd();
		const timer = setInterval(checkMatchEnd, 1000);

		return () => clearInterval(timer);
	}, [match.date]);

	return (
		<div className="resultMatch">
			<div className="resultMatch__match">
				<Team team={match.team[0]} />
				<p className="resultMatch__match__score">
					{isMatchEnd ? (
						<>
							{match.score_home} - {match.score_away}
						</>
					) : (
						<p> - </p>
					)}
				</p>
				<Team team={match.team[1]} />
			</div>
			<div className="resultMatch__prediction">
				<h3 className="resultMatch__prediction__title">Ma prédiction</h3>
				<div className="resultMatch__prediction__content">
					<p className="resultMatch__prediction__content__score">
						{scorePredict ? (
							<>
								{scorePredict.score_predi_home} -{" "}
								{scorePredict.score_predi_away}
							</>
						) : (
							<p> - </p>
						)}
					</p>
					<div className="resultMatch__prediction__content__totalPoints">
						<p className="resultMatch__prediction__content__totalPoints__points">
							{addPoint && isMatchEnd ? predictPoint(addPoint) : 0}
						</p>
						<img
							src={pictoPoint}
							alt=""
							className="resultMatch__prediction__content__totalPoints__picto"
						/>
					</div>
				</div>
			</div>
		</div>
	);
};

export default ResultMatch;
