import "./Predict_Card.scss";
import dayjs from "dayjs";
import duration from "dayjs/plugin/duration";

import iconTrash from "../../../assets/PredictPage/trash_delete.svg";
import iconEdit from "../../../assets/PredictPage/pen_edit.svg";
import iconChrono from "../../../assets/PredictPage/Chrono.svg";
import { IMatch } from "../../../@types";
import { useEffect, useState } from "react";

interface IProspMatch {
	match: IMatch;
}

interface IPropsCreatePredict {
	match_id: number;
	score_predi_away: number;
	score_predi_home: number;
	user_id: number;
}

dayjs.extend(duration);

const Predict_Card = ({ match }: IProspMatch) => {
	const [chrono, setChrono] = useState("");
	const [scorePredict, setScorePredict] = useState<IPropsCreatePredict>();

	console.log(scorePredict);

	// Timer
	useEffect(() => {
		// Fonction formatage de la date
		const updateCountdown = () => {
			const date = dayjs(match.date);
			const dateSecond = date.diff(dayjs(), "second");

			if (dateSecond <= 0) {
				// Si le compte à rebours est terminé
				setChrono("00:00:00:00");
				return;
			}
			setChrono(dayjs.duration(dateSecond, "seconds").format("DD:HH:mm:ss"));
		};

		// Mettre à jour le compte à rebours toutes les secondes
		const timer = setInterval(updateCountdown, 1000);

		// Nettoyer l'intervalle lorsque le composant est démonté
		return () => clearInterval(timer);
	}, [match.date]);

	// Bloquer les inputs
	const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
		// Autoriser uniquement les touches numériques et quelques touches spéciales
		if (
			!/[0-9]/.test(event.key) && // Bloque tout sauf les chiffres
			event.key !== "Backspace" // Autorise la touche "Effacer"
		) {
			event.preventDefault(); // Empêche la saisie des caractères non autorisés
		}
	};

	// Submit predict
	const handleSubmitPredict = (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		const myFormData = new FormData(event.currentTarget);
		const newPredict = {
			user_id: 2,
			match_id: match.match_id,
			score_predi_home: Number(myFormData.get("home")),
			score_predi_away: Number(myFormData.get("away")),
		};
		createPredict(newPredict);
		setScorePredict(newPredict);
	};

	// Post predict
	const createPredict = async (data: IPropsCreatePredict) => {
		try {
			const response = await fetch("http://localhost:3000/api/predictions", {
				method: "POST",
				headers: {
					"Content-type": "application/json; charset=UTF-8",
				},
				body: JSON.stringify(data),
			});

			if (!response.ok) {
				const errorMessage = await response.text();
				console.error(`Error: ${response.status} - ${errorMessage}`);
				throw new Error(errorMessage);
			}

			console.log("Creation de ta prédiction");
		} catch (error) {
			console.error(error);
		}
	};

	return (
		<form
			className="predictCard"
			style={chrono === "00:00:00:00" ? { display: "none" } : {}}
			onSubmit={handleSubmitPredict}
		>
			<div className="predictCard__containerChrono">
				<img
					src={iconChrono}
					alt="Temps restant avant le dbut du match"
					className="predictCard__containerChrono__icon"
				/>
				<p className="predictCard__containerChrono__chrono">{chrono}</p>
			</div>
			<div className="predictCard__containerPredict">
				<div className="predictCard__containerPredict__Team">
					<img
						src={match.team[0].logo}
						alt=""
						className="predictCard__containerPredict__Team__logo"
					/>
					<p className="predictCard__containerPredict__Team__name">
						{match?.team?.[0]?.name}
					</p>
				</div>
				<div className="predictCard__containerPredict__inputContent">
					<div className="predictCard__containerPredict__input">
						<input
							type="text"
							className="predictCard__containerPredict__input__score"
							name="home"
							onKeyDown={handleKeyDown}
							maxLength={2}
							value={scorePredict?.score_predi_home}
						/>
						<button
							type="button"
							className="predictCard__containerPredict__input__edit"
						>
							<img
								src={iconEdit}
								alt=""
								className="predictCard__containerPredict__input__edit__icon"
							/>
						</button>
					</div>
					<p>VS</p>
					<div className="predictCard__containerPredict__input">
						<input
							type="text"
							className="predictCard__containerPredict__input__score"
							name="away"
							onKeyDown={handleKeyDown}
							maxLength={2}
							value={scorePredict?.score_predi_away}
						/>
						<button
							type="button"
							className="predictCard__containerPredict__input__edit"
						>
							<img
								src={iconEdit}
								alt=""
								className="predictCard__containerPredict__input__edit__icon"
							/>
						</button>
					</div>
				</div>
				<div className="predictCard__containerPredict__Team">
					<img
						src={match.team[1].logo}
						alt=""
						className="predictCard__containerPredict__Team__logo"
					/>
					<p className="predictCard__containerPredict__Team__name">
						{match?.team?.[1]?.name}
					</p>
				</div>
			</div>
			<button type="submit" className="predictCard__btnValidate">
				À moi la victoire !
			</button>
			<button type="button" className="predictCard__btnDelete">
				<img src={iconTrash} alt="" className="predictCard__btnDelete__icon" />
			</button>
		</form>
	);
};

export default Predict_Card;
