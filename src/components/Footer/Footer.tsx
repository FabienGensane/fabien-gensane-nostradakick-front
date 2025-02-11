import "./Footer.scss";
import logo from "../../assets/Header/Logo.svg";

const Footer = () => {
	return (
		<footer className="footer">
			<img src={logo} alt="" className="footer__logo" />
			<ul className="footer__list">
				<li className="footer__list__item">
					<a href="/" className="footer__list__item__link">
						Mentions légales
					</a>
				</li>
				<li className="footer__list__item">
					<a href="/" className="footer__list__item__link">
						CGU
					</a>
				</li>
				<li className="footer__list__item">
					<a href="/" className="footer__list__item__link">
						Régles du jeu
					</a>
				</li>
			</ul>
		</footer>
	);
};

export default Footer;
