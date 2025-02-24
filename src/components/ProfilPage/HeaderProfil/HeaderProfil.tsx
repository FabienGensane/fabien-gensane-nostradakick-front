import { useUserData } from "../../../hooks/UserData";
import "./HeaderProfil.scss";

const HeaderProfil = () => {
	const { user } = useUserData();

	return (
		<div className="headerProfil">
			<div className="headerProfil__img" />
			<div className="headerProfil__list">
				<div className="headerProfil__list__data">
					<div className="headerProfil__list__data__item">Stats</div>
					<div className="headerProfil__list__data__item">Mes Prédictions</div>
				</div>
				<div className="headerProfil__list__data__item">Paramètres</div>
			</div>
			<div className="headerProfil__profil">
				<img
					src={user ? user.picture : ""}
					alt=""
					className="headerProfil__profil__photo"
				/>
				<p className="headerProfil__profil__pseudo">{user?.pseudo}</p>
			</div>
		</div>
	);
};

export default HeaderProfil;
