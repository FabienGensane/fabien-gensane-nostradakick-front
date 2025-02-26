import "./Footer.scss";
import logo from "../../assets/Header/Logo.svg";
import { Link } from 'react-router';

const Footer = () => {
	return (
		<footer className="footer">
			<img src={logo} alt="" className="footer__logo" />
			<ul className="footer__list">
				<li className="footer__list__item">
					<Link to="/" className="footer__list__item__link">
						Mentions légales
					</Link>
				</li>
				<li className="footer__list__item">
					<Link to="/" className="footer__list__item__link">
						CGU
					</Link>
				</li>
				<li className="footer__list__item">
					<Link to="/" className="footer__list__item__link">
						Régles du jeu
					</Link>
				</li>
			</ul>
		</footer>
	);
};

export default Footer;
