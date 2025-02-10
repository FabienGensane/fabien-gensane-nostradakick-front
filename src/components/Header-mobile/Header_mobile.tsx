import "./Header_mobile.scss";
import pictoHome from "../../assets/Header/picto_home.svg";
import pictoProfil from "../../assets/Header/picto_profil.svg";
import pictoRank from "../../assets/Header/picto_rank.svg";
import pictoResult from "../../assets/Header/picto_result.svg";
import Submenu from "../Submenu/Submenu";
import { useState } from "react";

export default function () {

	const [isShowSubmenu, setIsShowSubmenu]=useState(false);

	return (
		<div className="menu__mobile">
			<Submenu />
			<header className="header">
				<nav className="header__nav">
					<ul className="header__nav__list">
						<li className="header__nav__list__item">
							<a href="/" className="header__nav__list__item__link">
								<img
									src={pictoHome}
									alt=""
									className="header__nav__list__item__link__img"
								/>
							</a>
						</li>
						<li className="header__nav__list__item">
							<a href="/" className="header__nav__list__item__link">
								<img
									src={pictoResult}
									alt=""
									className="header__nav__list__item__link__img"
								/>
							</a>
						</li>
						<li className="header__nav__list__item">
							<a href="/" className="header__nav__list__item__link">
								<img
									src={pictoRank}
									alt=""
									className="header__nav__list__item__link__img"
								/>
							</a>
						</li>
						<li className="header__nav__list__item">
							<a href="/" className="header__nav__list__item__link">
								<img
									src={pictoProfil}
									alt=""
									className="header__nav__list__item__link__img"
								/>
							</a>
						</li>
					</ul>
				</nav>
			</header>
		</div>
	);
}
