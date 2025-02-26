import { ITeam } from "../../../../@types";
import "./Team.scss";

const Team = ({ team }: { team: ITeam }) => {
	return (
		<div className="predictCard__containerPredict__Team">
			<img
				src={team.logo}
				alt=""
				className="predictCard__containerPredict__Team__logo"
			/>
			<p className="predictCard__containerPredict__Team__name">{team.name}</p>
		</div>
	);
};

export default Team;
