import "./Header_desktop_logged.scss";
import logo from "../../../assets/Header/Logo.svg";
import { Link, useNavigate } from "react-router";
import { useUserData } from "../../../hooks/UserData";

export default function () {
	const { user } = useUserData();
	const navigate = useNavigate();

	return (
		<div className="menu__desktop__logged">
			<header className="menu__desktop__logged__header">
				<ul className="menu__desktop__logged__header__list">
					<li className="menu__desktop__logged__header__list__item">
						<Link
							to="/predictions"
							className="menu__desktop__logged__header__list__item__link"
						>
							Prédictions
						</Link>
					</li>
					<li className="menu__desktop__logged__header__list__item">
						<Link
							to="/resultats"
							className="menu__desktop__logged__header__list__item__link"
						>
							Résultats
						</Link>
					</li>
					<li className="menu__desktop__logged__header__list__item">
						<Link
							to="/classement"
							className="menu__desktop__logged__header__list__item__link"
						>
							Classement
						</Link>
					</li>
				</ul>
				<Link to="/predictions">
					<img
						src={logo}
						alt="logo NostradaKick"
						className="menu__desktop__logged__header__logo"
					/>
				</Link>

				<div className="menu__desktop__logged__header__logProfile">
					<Link
						to="/profil"
						className="menu__desktop__logged__header__logProfile__profile"
					>
						<img src={user?.picture!} alt="" />
					</Link>
					<button
						type="button"
						className="menu__desktop__logged__header__logProfile__logout"
						onClick={() => {
							localStorage.removeItem("jwt");
							navigate("/login");
						}}
					>
						Logout
					</button>
				</div>
			</header>
		</div>
	);
}
