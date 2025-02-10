import "./Submenu.scss";

export default function () {
	return (
		<div className="submenu">
			<ul className="submenu__list">
				<li className="submenu__list__stats">
					<a href="/">Mes Stats</a>
				</li>
				<li className="submenu__list__predicts">
					<a href="/">Mes prédictions</a>
				</li>
				<li className="submenu__list__settings">
					<a href="/">Paramètres</a>
				</li>
			</ul>
		</div>
	);
}
