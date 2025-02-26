import { useUserData } from "../../../hooks/UserData";
import "./HeaderProfil.scss";

interface IPropsHeaderProfil {
	showStats: boolean;
	setShowStats: React.Dispatch<React.SetStateAction<boolean>>;
	showPredict: boolean;
	setShowPredict: React.Dispatch<React.SetStateAction<boolean>>;
	showSettings: boolean;
	setShowSettings: React.Dispatch<React.SetStateAction<boolean>>;
}

const HeaderProfil = ({
	showStats,
	setShowStats,
	showPredict,
	setShowPredict,
	showSettings,
	setShowSettings,
}: IPropsHeaderProfil) => {
	const { user } = useUserData();

	return (
		<div className="headerProfil">
			<div className="headerProfil__img" />
			<div className="headerProfil__list">
				<div className="headerProfil__list__data">
					<div
						className={
							showStats
								? "headerProfil__list__data__item--active"
								: "headerProfil__list__data__item"
						}
						onClick={() => {
							setShowStats(true);
							setShowPredict(false);
							setShowSettings(false);
						}}
						onKeyDown={() => {
							setShowStats(true);
							setShowPredict(false);
							setShowSettings(false);
						}}
					>
						Stats
					</div>
					<div
						className={
							showPredict
								? "headerProfil__list__data__item--active"
								: "headerProfil__list__data__item"
						}
						onClick={() => {
							setShowStats(false);
							setShowPredict(true);
							setShowSettings(false);
						}}
						onKeyDown={() => {
							setShowStats(false);
							setShowPredict(true);
							setShowSettings(false);
						}}
					>
						Mes Prédictions
					</div>
				</div>
				<div
					className={
						showSettings
							? "headerProfil__list__data__item--active"
							: "headerProfil__list__data__item"
					}
					onClick={() => {
						setShowStats(false);
						setShowPredict(false);
						setShowSettings(true);
					}}
					onKeyDown={() => {
						setShowStats(false);
						setShowPredict(false);
						setShowSettings(true);
					}}
				>
					Paramètres
				</div>
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
