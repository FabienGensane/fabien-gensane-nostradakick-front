import "./Header_desktop.scss";
import { Link } from "react-router";
import logo from "../../../assets/Header/Logo.svg";

export default function () {
	return (
		<div className="menu__desktop">
			<header className="menu__desktop__header">
				<Link to="/">
					<img
						src={logo}
						alt="logo NostradaKick"
						className="menu__desktop__header__logo"
					/>
				</Link>

				<div className="menu__desktop__header__buttons">
					<Link
						to="/signup"
						className="menu__desktop__header__buttons__subscribe"
					>
						S'inscrire
					</Link>
					<Link to="/login" className="menu__desktop__header__buttons__login">
						Se connecter
					</Link>
				</div>
			</header>
		</div>
	);
}
