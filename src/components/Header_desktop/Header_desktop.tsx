import "./Header_desktop.scss";
import logo from "../../assets/Header/Logo.svg";

export default function () {
	return (
		<div className="menu__desktop">
			<header className="menu__desktop__header">
				<a href="/">
					<img
						src={logo}
						alt="logo NostradaKick"
						className="menu__desktop__header__logo"
					/>
				</a>

				<div className="menu__desktop__header__buttons">
					<a href="/" className="menu__desktop__header__buttons__subscribe">
						S'inscrire
					</a>
					<a href="/" className="menu__desktop__header__buttons__login">
						Se connecter
					</a>
				</div>
			</header>
		</div>
	);
}
