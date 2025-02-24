import "./Predict_Card_logged.scss";
import dayjs from "dayjs";
import duration from "dayjs/plugin/duration";
import iconTrash from "../../../assets/PredictPage/trash_delete.svg";

import { IMatch, IPredicts, IPropsCreatePredict } from "../../../@types";
import { useEffect, useRef, useState } from "react";
import Chrono from "./Chrono/Chrono";
import Input from "./Input/Input";
import Team from "./Team/Team";
import { apiRequest } from "../../utils/api";

interface PredictCardLoggedProps {
	match: IMatch;
	initialPrediction?: IPropsCreatePredict;
}

dayjs.extend(duration);

const Predict_Card_logged = ({
	match,
	initialPrediction,
}: PredictCardLoggedProps) => {
	// useState
	// Chrono
	const [chrono, setChrono] = useState("");
	// Score Prédiction
	const [scorePredict, setScorePredict] = useState<IPropsCreatePredict | null>(
		initialPrediction || null,
	);
	// Récupération du formulaire
	const formRef = useRef<HTMLFormElement>(null);
	// Etat qui permet de vérifier si une prédiction a été postée. D'origine, l'état est faux.
	const [isValidated, setIsValidated] = useState(false);
	const [homeScore, setHomeScore] = useState(
		initialPrediction?.score_predi_home.toString() || "",
	);
	const [awayScore, setAwayScore] = useState(
		initialPrediction?.score_predi_away.toString() || "",
	);

	const [pointsAdded, setPointsAdded] = useState(false);

	// Méthode qui permet de récupérer dans le formulaire "predict_card" les informations nécessaires à la création d'une prédiction
	const handleSubmitPredict = (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault();

		// const myFormData = new FormData(event.currentTarget);
		const newPredict = {
			prediction_id: initialPrediction?.prediction_id as number,
			match_id: match.match_id,
			score_predi_home: Number(homeScore),
			score_predi_away: Number(awayScore),
		};

		!scorePredict ? createdPredict(newPredict) : handlePatchPredict(newPredict);

		setScorePredict(newPredict);
	};

	// Méthode qui permet de créer une prédiction en BDD
	const createdPredict = async (data: IPropsCreatePredict) => {
		try {
			const predict = await apiRequest("/predictions", "POST", data);
			console.log(predict);
			if (!predict.prediction_id) {
				console.error(
					"❌ ERREUR: prediction_id est undefined après création !",
				);
				return;
			}
			addPointUser();
			updateScorePredict(predict);
			setIsValidated(true);
			console.log("prédiction valide !!");
		} catch (error) {
			console.error(error);
		}
	};

	// Méthode qui permet de supprimer un pronostic en base de donnée
	const handleDeletePredict = async () => {
		if (!scorePredict) {
			return;
		}
		console.log(
			"🔍 Delete : scorePredict actuel =",
			scorePredict.prediction_id,
		);
		try {
			await apiRequest(
				`/predictions/${initialPrediction?.prediction_id}`,
				"DELETE",
			);
			console.log("Suppression de la prédiction");

			// Reset Front + from
			formRef.current!.reset();
			setIsValidated(false);
			updateScorePredict(null);
		} catch (error) {
			console.error(error);
		}
	};

	// Méthode qui permet de patcher un pronostic en base de donnée
	const handlePatchPredict = async (data: IPropsCreatePredict) => {
		if (!scorePredict) {
			return;
		}
		console.log("🔍 PATCH : scorePredict actuel =", scorePredict);
		console.log(localStorage.getItem("jwt"));

		try {
			const patchPredict = await apiRequest(
				`/predictions/${scorePredict.prediction_id}`,
				"PATCH",
				data,
			);

			console.log("Modification de la prédiction");
			setIsValidated(true);
			updateScorePredict(patchPredict);
		} catch (error) {
			console.error(error);
		}
	};

	// Mise a jour de la prédictions
	const updateScorePredict = (predict: IPredicts | null) => {
		setScorePredict(predict);
		setHomeScore(predict !== null ? predict.score_predi_home.toString() : "");
		setAwayScore(predict !== null ? predict.score_predi_away.toString() : "");
	};

	const addPointUser = async () => {
		if (!scorePredict) return;


		const data = {
			prediction_id: scorePredict.prediction_id,
			match_id: match.match_id,
			points_score: 0,
			points_outcome: 0,
			score_predi_home: scorePredict.score_predi_home,
			score_predi_away: scorePredict.score_predi_away,
		};

		if (
			scorePredict.score_predi_home === match.score_home &&
			scorePredict.score_predi_away === match.score_away
		) {
			data.points_score = 1;
		}

		const predictResult = Math.sign(
			scorePredict.score_predi_home - scorePredict.score_predi_away,
		);
		const matchResult = Math.sign(match.score_home - match.score_away);

		
		if (predictResult === matchResult) {
			data.points_outcome = 1;
		}

		if (data.points_score > 0 || data.points_outcome > 0) {
			console.log("Points à ajouter :", data);
			await handlePatchPredict(data);
			setPointsAdded(true);
		}
	};

	useEffect(() => {
		if (chrono === "00:00:00:00" && !pointsAdded && scorePredict) {
			addPointUser();
		}
	}, [chrono, pointsAdded, scorePredict, addPointUser]);

	return (
		<form
			className="predictCard"
			style={chrono === "00:00:00:00" ? { display: "none" } : {}}
			onSubmit={handleSubmitPredict}
			ref={formRef}
		>
			{/* Minuteur */}
			<Chrono chrono={chrono} setChrono={setChrono} match={match} />
			{/* Prédiction */}
			<div className="predictCard__containerPredict">
				{/* Home Team */}
				<Team team={match.team[0]} />
				<div className="predictCard__containerPredict__inputContent">
					<Input
						name="home"
						value={homeScore}
						onChange={(e) => setHomeScore(e.target.value)}
					/>
					<p>VS</p>
					{/* Away Team */}
					<Input
						name={"away"}
						value={awayScore}
						onChange={(e) => setAwayScore(e.target.value)}
					/>
				</div>
				<Team team={match.team[1]} />
			</div>
			<button type="submit" className="predictCard__btnValidate">
				{isValidated || initialPrediction
					? "Modifier votre Prédiction"
					: "À moi la victoire !"}
			</button>
			<button
				type="button"
				className="predictCard__btnDelete"
				onClick={handleDeletePredict}
			>
				<img src={iconTrash} alt="" className="predictCard__btnDelete__icon" />
			</button>
		</form>
	);
};

export default Predict_Card_logged;
