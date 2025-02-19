import { IUser } from "../../../@types";
import "./UserRankLogged.scss";
import { calculExact, calculGood, calculPoint } from "../RankPage";


const UserRankLogged = ({ user, position }: { user: IUser, position: number }) => {

	console.log(user);
	

	return (
		<div className="userRank">
			<div className="userRank__left">
				<h3 className="userRank__left__title">{position}</h3>
                <img src={user.picture!} alt="" className="userRank__left__img"/>
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

export default UserRankLogged;
