import { IMatch, IPredicts } from "../../../@types";
import Team from "../../PredictsPage/Predict_Card_logged/Team/Team";
import pictoPoint from "../../../assets/Pictos/pointStar.svg";
import "./ResultMatch.scss";
import { useUserData } from "../../../hooks/UserData";

const ResultMatch = ({ match }: { match: IMatch }) => {
	const { user } = useUserData();

	const scorePredict: IPredicts[] =
		user?.prediction.filter((predict) => predict.match_id === match.match_id) ??
		[];

	console.log(scorePredict);

	const predictPoint = (predict: IPredicts[]) => {
		if (predict.length > 0) {
			return predict[0].points_score * 50 + predict[0].points_outcome * 10;
		}
		return 0;
	};

	return (
		<div className="resultMatch">
			<div className="resultMatch__match">
				<Team team={match.team[0]} />
				<p className="resultMatch__match__score">
					{match.score_home} - {match.score_away}
				</p>
				<Team team={match.team[1]} />
			</div>
			<div className="resultMatch__prediction">
				<h3 className="resultMatch__prediction__title">Ma prédiction</h3>
				<div className="resultMatch__prediction__content">
					<p className="resultMatch__prediction__content__score">
						{scorePredict && scorePredict.length > 0 ? (
							<>
								{scorePredict[0].score_predi_home} -{" "}
								{scorePredict[0].score_predi_away}
							</>
						) : (
							<p> - </p>
						)}
					</p>
					<div className="resultMatch__prediction__content__totalPoints">
						<p className="resultMatch__prediction__content__totalPoints__points">
							{predictPoint(scorePredict)}
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
