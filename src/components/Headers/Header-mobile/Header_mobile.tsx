import "./Header_mobile.scss";
import pictoHome from "../../../assets/Header/picto_home.svg";
import pictoProfil from "../../../assets/Header/picto_profil.svg";
import pictoRank from "../../../assets/Header/picto_rank.svg";
import pictoResult from "../../../assets/Header/picto_result.svg";
import Submenu from "./Submenu/Submenu";
import { useState } from "react";
import { NavLink } from 'react-router';

export default function () {
	const [isShowSubmenu, setIsShowSubmenu] = useState(false);

	function handleShowSubmenu(
		event: React.MouseEvent<HTMLLIElement, MouseEvent>,
	) {
		event.preventDefault();
		setIsShowSubmenu(!isShowSubmenu);
	}

	return (
		<div className="menu__mobile">
			{isShowSubmenu && <Submenu />}
			<header className="header">
				<nav className="header__nav">
					<ul className="header__nav__list">
						<li className="header__nav__list__item">
							<NavLink to="/" className="header__nav__list__item__link">
								<img
									src={pictoHome}
									alt=""
									className="header__nav__list__item__link__img"
								/>
							</NavLink>
						</li>
						<li className="header__nav__list__item">
							<NavLink to="/" className="header__nav__list__item__link">
								<img
									src={pictoResult}
									alt=""
									className="header__nav__list__item__link__img"
								/>
							</NavLink>
						</li>
						<li className="header__nav__list__item">
							<NavLink to="/" className="header__nav__list__item__link">
								<img
									src={pictoRank}
									alt=""
									className="header__nav__list__item__link__img"
								/>
							</NavLink>
						</li>
						<li
							className={
								isShowSubmenu
									? "header__nav__list__item header__nav__list__item--background"
									: "header__nav__list__item"
							}
							onClick={handleShowSubmenu}
							onKeyDown={() => setIsShowSubmenu(!isShowSubmenu)}
						>
							<NavLink to="/" className="header__nav__list__item__link">
								<img
									src={pictoProfil}
									alt=""
									className="header__nav__list__item__link__img"
								/>
							</NavLink>
						</li>
					</ul>
				</nav>
			</header>
		</div>
	);
}
