import { ITeam } from "../../../../@types";
import "./Team.scss";

const Team = ({ team }: { team: ITeam }) => {
	let teamNam = team.name
	teamNam = teamNam.split(' ').map (word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ') ;
	
	return (
		<div className="predictCard__containerPredict__Team">
			<img
				src={team.logo}
				alt=""
				className="predictCard__containerPredict__Team__logo"
			/>
			<p className="predictCard__containerPredict__Team__name">{teamNam}</p>
		</div>
	);
};

export default Team;
