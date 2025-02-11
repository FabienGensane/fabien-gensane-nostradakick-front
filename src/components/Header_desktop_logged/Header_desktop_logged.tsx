import "./Header_desktop_logged.scss";
import logo from "../../assets/Header/Logo.svg";
import photoProfile from "../../assets/Header/photo_profile.png";

export default function () {
	return (
		<div className="menu__desktop__logged">
			<header className="menu__desktop__logged__header">
				<ul className="menu__desktop__logged__header__list">
					<li className="menu__desktop__logged__header__list__item">
						<a
							href="/"
							className="menu__desktop__logged__header__list__item__link"
						>
							Prédictions
						</a>
					</li>
					<li className="menu__desktop__logged__header__list__item">
						<a
							href="/"
							className="menu__desktop__logged__header__list__item__link"
						>
							Résultats
						</a>
					</li>
					<li className="menu__desktop__logged__header__list__item">
						<a
							href="/"
							className="menu__desktop__logged__header__list__item__link"
						>
							Classement
						</a>
					</li>
				</ul>
				<a href="/">
					<img
						src={logo}
						alt="logo NostradaKick"
						className="menu__desktop__logged__header__logo"
					/>
				</a>

				<div className="menu__desktop__logged__header__logProfile">
					<a
						href="/"
						className="menu__desktop__logged__header__logProfile__profile"
					>
						<img src={photoProfile} alt="" />
					</a>
					<a
						href="/"
						className="menu__desktop__logged__header__logProfile__logout"
					>
						Logout
					</a>
				</div>
			</header>
		</div>
	);
}
