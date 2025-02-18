import "./BestScore.scss";
import { IUser } from "../../../@types";
import { calculPoint } from "../RankPage";
import { calculExact } from "../RankPage";
import { calculGood } from "../RankPage";

const BestScore = ({ user }: { user: IUser }) => {
	return (
		<div className="bestof3">
			<img className="bestof3__img" src={user.picture!} alt="profil" />
			<p className="bestof3__pseudo">{user.pseudo}</p>
			<div className="bestof3__data">
				<div className="bestof3__data__Exact">
					<strong>{calculExact(user)}</strong>
					<h2>Exact</h2>
				</div>
				<div className="bestof3__data__Points">
					<strong>{calculPoint(user)}</strong>
					<h2>Points</h2>
				</div>
				<div className="bestof3__data__Good">
					<strong>{calculGood(user)}</strong>
					<h2>Good</h2>
				</div>
			</div>
		</div>
	);
};

export default BestScore;
