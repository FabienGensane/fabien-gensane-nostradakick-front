import { IUser } from "../../../@types";
import "./UserRank.scss";
import { calculExact, calculGood, calculPoint } from "../RankPage";

const UserRank = ({ user, position }: { user: IUser; position: number }) => {
	position += 4;

	return (
		<div className="userRank">
			<div className="userRank__left">
				<h3 className="userRank__left__title">{position}</h3>
				<img src={user.picture!} alt="" className="userRank__left__img" />
				<h3 className="userRank__left__pseudo">{user.pseudo}</h3>
			</div>
			<div className="userRank__right">
				<h3 className="userRank__right__title">{calculGood(user)}</h3>
				<h3 className="userRank__right__title">{calculExact(user)}</h3>
				<h3 className="userRank__right__title">{calculPoint(user)}</h3>
			</div>
		</div>
	);
};

export default UserRank;
