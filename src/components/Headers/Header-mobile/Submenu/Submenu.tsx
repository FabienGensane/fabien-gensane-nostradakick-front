import "./Submenu.scss";
import { Link, useNavigate } from "react-router";

interface IPropsHearderMobile {
	setShowStats: React.Dispatch<React.SetStateAction<boolean>>;
	setShowPredict: React.Dispatch<React.SetStateAction<boolean>>;
	setShowSettings: React.Dispatch<React.SetStateAction<boolean>>;
	setIsShowSubmenu: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function ({
	setShowStats,
	setShowPredict,
	setShowSettings,
	setIsShowSubmenu,
}: IPropsHearderMobile) {
	const navigate = useNavigate();
	return (
		<div className="submenu">
			<ul className="submenu__list">
				<li className="submenu__list__stats">
					<Link
						to="/profil"
						className="submenu__list__stats__link"
						onClick={() => {
							navigate("/profil");
							setShowStats(true);
							setShowPredict(false);
							setShowSettings(false);
							setIsShowSubmenu(false);
						}}
						onKeyDown={() => setIsShowSubmenu(false)}
					>
						Mes Stats
					</Link>
					<div className="submenu__list__stats__spacing" />
				</li>
				<li className="submenu__list__predicts">
					<Link
						to="/profil"
						className="submenu__list__predicts__link"
						onClick={() => {
							navigate("/profil");
							setShowStats(false);
							setShowPredict(true);
							setShowSettings(false);
							setIsShowSubmenu(false);
						}}
						onKeyDown={() => setIsShowSubmenu(false)}
					>
						Mes prédictions
					</Link>
					<div className="submenu__list__predicts__spacing" />
				</li>
				<li className="submenu__list__settings">
					<Link
						to="/profil"
						className="submenu__list__settings__link"
						onClick={() => {
							setShowStats(false);
							setShowPredict(false);
							setShowSettings(true);
							setIsShowSubmenu(false);
						}}
						onKeyDown={() => setIsShowSubmenu(false)}
					>
						Paramètres
					</Link>
					<div className="submenu__list__predicts__spacing" />
				</li>
				<li className="submenu__list__login">
					<button
						type="button"
						className="submenu__list__login__link"
						onClick={() => {
							localStorage.removeItem("jwt");
							navigate("/login");
						}}
					>
						Se déconnecter
					</button>
				</li>
			</ul>
		</div>
	);
}
