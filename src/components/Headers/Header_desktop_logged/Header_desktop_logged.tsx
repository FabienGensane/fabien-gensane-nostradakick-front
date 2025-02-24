import "./Header_desktop_logged.scss";
import logo from "../../../assets/Header/Logo.svg";
import { Link, useNavigate } from "react-router";
import { useUserData } from "../../../hooks/UserData";

import { motion } from "motion/react";
import React, { useRef, useState } from "react";

export default function () {
	const { user } = useUserData();
	const navigate = useNavigate();
	const [position, setPosition] = useState({
		left: 0,
		width: 0,
		opacity: 0,
	});
	const menuRef = useRef<HTMLLIElement | null>(null);
	const listRef = useRef<HTMLUListElement>(null);

	const handleMouseMove = (e: React.MouseEvent) => {
		const listElement = listRef.current;
		if (!listElement) return;
		const listRect = listElement.getBoundingClientRect();
		const itemRect = e.currentTarget.getBoundingClientRect();

		setPosition({
			width: itemRect.width,
			opacity: 1,
			left: itemRect.left - listRect.left,
		});
	};

	const menu = ["Prédictions", "Résultats", "Classement"];

	return (
		<div className="menu__desktop__logged">
			<header className="menu__desktop__logged__header">
				<ul
					className="menu__desktop__logged__header__list"
					ref={listRef}
					onMouseLeave={() => setPosition({ left: 0, opacity: 0, width: 0 })}
				>
					<li
						className="menu__desktop__logged__header__list__item"
						onMouseMove={handleMouseMove}
						ref={menuRef}
					>
						<Link
							to="/predictions"
							className="menu__desktop__logged__header__list__item__link"
						>
							Prédiction
						</Link>
					</li>
					<li
						className="menu__desktop__logged__header__list__item"
						onMouseEnter={handleMouseMove}
						ref={menuRef}
					>
						<Link
							to="/resultats"
							className="menu__desktop__logged__header__list__item__link"
						>
							Résultats
						</Link>
					</li>
					<li
						className="menu__desktop__logged__header__list__item"
						onMouseEnter={handleMouseMove}
						ref={menuRef}
					>
						<Link
							to="/classement"
							className="menu__desktop__logged__header__list__item__link"
						>
							Classement
						</Link>
					</li>
					<motion.li
						className="menu__desktop__logged__header__list__item--hover"
						animate={position}
					/>
				</ul>
				<Link to="/predictions">
					<img
						src={logo}
						alt="logo NostradaKick"
						className="menu__desktop__logged__header__logo"
					/>
				</Link>

				<div className="menu__desktop__logged__header__logProfile">
					<Link
						to="/profil"
						className="menu__desktop__logged__header__logProfile__profile"
					>
						<img src={user?.picture!} alt="" />
					</Link>
					<button
						type="button"
						className="menu__desktop__logged__header__logProfile__logout"
						onClick={() => {
							localStorage.removeItem("jwt");
							navigate("/login");
						}}
					>
						Logout
					</button>
				</div>
			</header>
		</div>
	);
}
