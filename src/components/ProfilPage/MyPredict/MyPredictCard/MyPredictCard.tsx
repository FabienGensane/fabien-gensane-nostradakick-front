import { IMatch, IPredicts } from "../../../../@types";
import { useUserData } from "../../../../hooks/UserData";
import Team from "../../../PredictsPage/Predict_Card_logged/Team/Team";
import "./MyPredictCard.scss";
import pictoPoint from "../../../../assets/Pictos/pointStar.svg";
import useAddPoints from "../../../../hooks/AddPoints";
import { useEffect, useState } from "react";
import dayjs from "dayjs";

const MyPredictCard = ({ match }: { match: IMatch }) => {
	const { user } = useUserData();
	const [isMatchEnd, setIsMatchEnd] = useState(false);

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

	const scorePredict = user?.prediction.find(
		(predict) => predict.match_id === match.match_id,
	);

	const { addPoint } = useAddPoints({
		match,
		scorePredict: scorePredict || ({} as IPredicts),
	});

	if (!scorePredict) return;

	const predictPoint = (predict: IPredicts) => {
		if (predict) {
			return predict.points_score * 50 + predict.points_outcome * 10;
		}
		return 0;
	};

	return (
		<>
			<div className="myPredictCard">
				<div className="myPredictCard__match">
					<Team team={match.team[0]} />
					<p className="myPredictCard__match__score">
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
				<div className="myPredictCard__prediction">
					<h3 className="myPredictCard__prediction__title">Ma prédiction</h3>
					<div className="myPredictCard__prediction__content">
						<p className="myPredictCard__prediction__content__score">
							{scorePredict.score_predi_home} - {scorePredict.score_predi_away}
						</p>
						<div className="myPredictCard__prediction__content__totalPoints">
							<p className="myPredictCard__prediction__content__totalPoints__points">
								{addPoint && isMatchEnd ? predictPoint(addPoint) : 0}
							</p>
							<img
								src={pictoPoint}
								alt=""
								className="myPredictCard__prediction__content__totalPoints__picto"
							/>
						</div>
					</div>
				</div>
			</div>
		</>
	);
};

export default MyPredictCard;
