import "./Submenu.scss";

export default function () {
	return (
		<div className="submenu">
			<ul className="submenu__list">
				<li className="submenu__list__stats">
					<a href="/">Mes Stats</a>
					<div className="submenu__list__stats__spacing" />
				</li>
				<li className="submenu__list__predicts">
					<a href="/">Mes prédictions</a>
					<div className="submenu__list__predicts__spacing" />
				</li>
				<li className="submenu__list__settings">
					<a href="/">Paramètres</a>
				</li>
			</ul>
		</div>
	);
}
