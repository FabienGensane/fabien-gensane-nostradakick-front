import "./Stats.scss";
import picto from "../../../assets/Pictos/pointStar.svg";
import { useUserData } from "../../../hooks/UserData";
import { calculExact, calculGood, calculPoint } from "../../RankPage/RankPage";
import { IMatch, IUser } from "../../../@types";

export const Stats = ({ matchs }: { matchs: IMatch[] | undefined }) => {
	const { user } = useUserData();

	if (matchs === undefined) return;

	const calculMatchTotal = (matchs: IMatch[]) => {
		let totalMatch = 0;
		for (let index = 0; index < matchs.length; index++) {
			totalMatch++;
		}
		return totalMatch;
	};

	if (!user) return;

	const calculPredict = (user: IUser) => {
		let totalPredict = 0;
		for (let index = 0; index < user.prediction.length; index++) {
			totalPredict++;
		}
		return totalPredict;
	};

	const exactPredictPercentage = Math.floor(
		(calculExact(user) / calculPredict(user)) * 100,
	);

	const goodPredictPercentage = Math.floor(
		(calculGood(user) / calculPredict(user)) * 100,
	);

	const predictPercentage = Math.floor(
		(calculPredict(user) / calculMatchTotal(matchs)) * 100,
	);

	return (
		<div className="stats">
			<div className="stats__left">
				<h2 className="stats__left__title">Résumé</h2>
				<div className="stats__left__container">
					<p className="stats__left__container__points">
						<strong>{user ? calculPoint(user) : 0}</strong> Pts
					</p>
					<div className="stats__left__container__flex">
						<div className="stats__left__container__predict">
							<div className="stats__left__container__predict__pointImg">
								<p className="stats__left__container__predict__pointImg__number">
									{user ? calculPredict(user) : 0}
								</p>
								<img
									src={picto}
									alt=""
									className="stats__left__container__predict__pointImg__img"
								/>
							</div>
							<p className="stats__left__container__predict__title">
								Prédictions
							</p>
						</div>
						<div className="stats__left__container__predict">
							<div className="stats__left__container__predict__pointImg">
								<p className="stats__left__container__predict__pointImg__number">
									{user ? calculGood(user) : 0}
								</p>
								<img
									src={picto}
									alt=""
									className="stats__left__container__predict__pointImg__img"
								/>
							</div>
							<p className="stats__left__container__predict__title">
								Bonnes Prédictions
							</p>
						</div>
						<div className="stats__left__container__predict">
							<div className="stats__left__container__predict__pointImg">
								<p className="stats__left__container__predict__pointImg__number">
									{user ? calculExact(user) : 0}
								</p>
								<img
									src={picto}
									alt=""
									className="stats__left__container__predict__pointImg__img"
								/>
							</div>
							<p className="stats__left__container__predict__title">
								Prédictions Exacts
							</p>
						</div>
					</div>
				</div>
			</div>
			<div className="stats__right">
				<h2 className="stats__right__title">Mes prédictions</h2>
				<div className="stats__right__container">
					<div className="stats__right__container__predict">
						<div className="stats__right__container__predict__stats">
							<strong>{user ? calculPredict(user) : 0}</strong>
							<p className="stats__right__container__predict__stats__number">
								{predictPercentage} %
							</p>
						</div>
						<p className="stats__right__container__predict__stats__title">
							Prédictions faites
						</p>
					</div>
					<div className="stats__right__container__predict">
						<div className="stats__right__container__predict__stats">
							<strong>{user ? calculGood(user) : 0}</strong>
							<p className="stats__right__container__predict__stats__number">
								{goodPredictPercentage} %
							</p>
						</div>
						<p className="stats__right__container__predict__stats__title">
							Bonnes Prédictions
						</p>
					</div>
					<div className="stats__right__container__predict">
						<div className="stats__right__container__predict__stats">
							<strong>{user ? calculExact(user) : 0}</strong>
							<p className="stats__right__container__predict__stats__number">
								{exactPredictPercentage} %
							</p>
						</div>
						<p className="stats__right__container__predict__stats__title">
							Prédictions Exacts
						</p>
					</div>
				</div>
			</div>
		</div>
	);
};
