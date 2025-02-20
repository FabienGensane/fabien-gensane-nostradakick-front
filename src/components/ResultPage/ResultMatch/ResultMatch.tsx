import { IMatch } from "../../../@types";
import Team from "../../PredictsPage/Predict_Card_logged/Team/Team";
import pictoPoint from "../../../assets/Pictos/pointStar.svg";
import "./ResultMatch.scss";

const ResultMatch = ({ match }: { match: IMatch }) => {
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
					<p className="resultMatch__prediction__content__score">2 - 1</p>
					<div className="resultMatch__prediction__content__totalPoints">
						<p className="resultMatch__prediction__content__totalPoints__points">
							60 pts
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
