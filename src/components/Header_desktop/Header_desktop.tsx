import "./Header_desktop.scss";
import logo from "../../assets/Header/Logo.svg";

export default function () {
	return (
		<div className="menu">
			<header className="header">
				<a href="/">
					<img src={logo} alt="logo NostradaKick" />
				</a>

				<div className="header__buttons">
					<a href="/" className="header__buttons__subscribe__link">
						S'inscrire
					</a>
					<a href="/" className="header__buttons__login__link">
						Se connecter
					</a>
				</div>
			</header>
		</div>
	);
}
