import "./Submenu.scss";
import { Link } from 'react-router';

export default function () {
	return (
		<div className="submenu">
			<ul className="submenu__list">
				<li className="submenu__list__stats">
					<Link to="/">Mes Stats</Link>
					<div className="submenu__list__stats__spacing" />
				</li>
				<li className="submenu__list__predicts">
					<Link to="/">Mes prédictions</Link>
					<div className="submenu__list__predicts__spacing" />
				</li>
				<li className="submenu__list__settings">
					<Link to="/">Paramètres</Link>
				</li>
			</ul>
		</div>
	);
}
