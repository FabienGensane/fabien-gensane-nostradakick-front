import "./Predict_Card_logged.scss";
import dayjs from "dayjs";
import duration from "dayjs/plugin/duration";
import iconTrash from "../../../assets/PredictPage/trash_delete.svg";

import { IMatch, IPropsCreatePredict } from "../../../@types";
import { useEffect, useRef, useState } from "react";
import Chrono from "./Chrono/Chrono";
import Input from "./Input/Input";
import Team from "./Team/Team";
import { useUserData } from "../../../hooks/UserData";
import { data } from "react-router";

interface PredictCardLoggedProps {
	match: IMatch;
	initialPrediction?: IPropsCreatePredict;
}

dayjs.extend(duration);

const Predict_Card_logged = ({
	match,
	initialPrediction,
}: PredictCardLoggedProps) => {
	const [chrono, setChrono] = useState("");
	const [scorePredict, setScorePredict] = useState<IPropsCreatePredict | null>(
		initialPrediction || null,
	);
	// Etat qui permet de vérifier si une prédiction a été postée. D'origine, l'état est faux.
	const [isValidated, setIsValidated] = useState(initialPrediction);
	const [homeScore, setHomeScore] = useState(
		initialPrediction?.score_predi_home.toString() || "",
	);
	const [awayScore, setAwayScore] = useState(
		initialPrediction?.score_predi_away.toString() || "",
	);
	const formRef = useRef<HTMLFormElement>(null);

	// Méthode qui permet d'aller chercher en BDD les scores "prédits" par l'utilisateur afin de les afficher

	// Méthode qui permet de récupérer dans le formulaire "predict_card" les informations nécessaires à la création d'une prédiction
	const handleSubmitPredict = (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault();

		// const myFormData = new FormData(event.currentTarget);
		const newPredict = {
			match_id: match.match_id,
			score_predi_home: Number(homeScore),
			score_predi_away: Number(awayScore),
		};
		if (!scorePredict) {
			createPredict(newPredict);
		} else {
			handlePatchPredict(newPredict);
		}

		setScorePredict(newPredict);
	};

	// Méthode qui permet de créer une prédiction en BDD
	const createPredict = async (data: IPropsCreatePredict) => {
		try {
			const response = await fetch("http://localhost:3000/api/predictions/", {
				method: "POST",
				headers: {
					"Content-type": "application/json; charset=UTF-8",
					Authorization: `Bearer ${localStorage.getItem("jwt")}`,
				},
				body: JSON.stringify(data),
			});

			if (!response.ok) {
				const errorMessage = await response.text();
				console.error(`Error: ${response.status} - ${errorMessage}`);
				throw new Error(errorMessage);
			}

			const createdPredict = await response.json();
			console.log("✔ Prédiction créée avec succès :", createdPredict);

			// ✅ Vérifions bien la valeur de prediction_id retournée
			if (!createdPredict.prediction_id) {
				console.error(
					"❌ ERREUR: prediction_id est undefined après création !",
				);
				return;
			}

			// ✅ Mettre à jour `scorePredict` avec `prediction_id`
			setScorePredict((prev) => {
				const updated = {
					...prev,
					...data,
					prediction_id: createdPredict.prediction_id, // 🔥 On stocke l'ID ici !
				};
				console.log("🔄 Nouveau scorePredict après POST :", updated);
				return updated;
			});

			setIsValidated(true);
		} catch (error) {
			console.error(error);
		}
	};

	useEffect(() => {
		if (scorePredict?.prediction_id) {
			console.log("🎯 prediction_id mis à jour :", scorePredict.prediction_id);
		}
	}, [scorePredict]);

	// Méthode qui permet de supprimer un pronostic en base de donnée
	const handleDeletePredict = async () => {
		if (!scorePredict) {
			return;
		}
		console.log("🔍 Delete : scorePredict actuel =", scorePredict);
		try {
			const response = await fetch(
				`http://localhost:3000/api/predictions/${scorePredict.prediction_id}`,
				{
					method: "DELETE",
					headers: {
						"Content-type": "application/json; charset=UTF-8",
						Authorization: `Bearer ${localStorage.getItem("jwt")}`,
					},
				},
			);
			console.log(
				"DELETE request URL:",
				`http://localhost:3000/api/predictions/${scorePredict?.prediction_id}`,
			);

			if (!response.ok) {
				const errorMessage = await response.text();
				console.error(`Error: ${response.status} - ${errorMessage}`);
				throw new Error(errorMessage);
			}

			console.log("Suppression de la prédiction");
			formRef.current!.reset();
			setIsValidated(true);
			setScorePredict(null);
			setHomeScore("");
			setAwayScore("");
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

		try {
			const response = await fetch(
				`http://localhost:3000/api/predictions/${scorePredict.prediction_id}`,
				{
					method: "PATCH",
					headers: {
						"Content-type": "application/json; charset=UTF-8",
						Authorization: `Bearer ${localStorage.getItem("jwt")}`,
					},
					body: JSON.stringify(data),
				},
			);
			console.log(
				"PATCH request URL:",
				`http://localhost:3000/api/predictions/${scorePredict.prediction_id}`,
			);
			console.log("Data sent:", data);

			if (!response.ok) {
				const errorMessage = await response.text();
				console.error(`Error: ${response.status} - ${errorMessage}`);
				throw new Error(errorMessage);
			}

			console.log("Suppression de la prédiction");
			formRef.current!.reset();
			setIsValidated(true);
			setScorePredict(data);
			setHomeScore(data.score_predi_home.toString());
			setAwayScore(data.score_predi_away.toString());
		} catch (error) {
			console.error(error);
		}
	};

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
				{isValidated ? "Modifier votre Prédiction" : "À moi la victoire !"}
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
