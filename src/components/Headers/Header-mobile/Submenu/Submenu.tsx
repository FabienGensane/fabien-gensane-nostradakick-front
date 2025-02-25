import "./Submenu.scss";
import { Link, useNavigate } from "react-router";

export default function () {
	const navigate = useNavigate();
	return (
		<div className="submenu">
			<ul className="submenu__list">
				<li className="submenu__list__stats">
					<Link to="/profil" className="submenu__list__stats__link">
						Mes Stats
					</Link>
					<div className="submenu__list__stats__spacing" />
				</li>
				<li className="submenu__list__predicts">
					<Link to="/profil" className="submenu__list__predicts__link">
						Mes prédictions
					</Link>
					<div className="submenu__list__predicts__spacing" />
				</li>
				<li className="submenu__list__settings">
					<Link to="/profil" className="submenu__list__settings__link">
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
