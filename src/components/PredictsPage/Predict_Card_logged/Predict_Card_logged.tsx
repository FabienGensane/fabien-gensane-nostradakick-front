import "./Predict_Card_logged.scss";
import dayjs from "dayjs";
import duration from "dayjs/plugin/duration";
import iconTrash from "../../../assets/PredictPage/trash_delete.svg";

import { IMatch } from "../../../@types";
import { useRef, useState } from "react";
import Chrono from "./Chrono/Chrono";
import Input from "./Input/Input";
import Team from "./Team/Team";
import { useUserData } from "../../../hooks/UserData";

interface IPropsCreatePredict {
	match_id: number;
	score_predi_away: number;
	score_predi_home: number;
}

dayjs.extend(duration);

const Predict_Card_logged = ({ match }: { match: IMatch }) => {
	const [chrono, setChrono] = useState("");
	const [scorePredict, setScorePredict] = useState<IPropsCreatePredict>();
	// Etat qui permet de vérifier si une prédiction a été postée. D'origine, l'état est faux.
	const [isValidated, setIsValidated] = useState(false);
	const formRef = useRef<HTMLFormElement>(null);
	const { user } = useUserData();

	// Méthode qui permet d'aller chercher en BDD les scores "prédits" par l'utilisateur afin de les afficher

	// Méthode qui permet de récupérer dans le formulaire "predict_card" les informations nécessaires à la création d'une prédiction
	const handleSubmitPredict = (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		const myFormData = new FormData(event.currentTarget);
		const newPredict = {
			match_id: match.match_id,
			score_predi_home: Number(myFormData.get("home")),
			score_predi_away: Number(myFormData.get("away")),
		};
		createPredict(newPredict);
		setScorePredict(newPredict);
	};

	// Méthode qui permet de créer une prédiction en BDD
	const createPredict = async (data: IPropsCreatePredict) => {
		try {
			const response = await fetch("http://localhost:3000/api/predictions/", {
				method: "POST",
				headers: {
					"Content-type": "application/json; charset=UTF-8",
					Authorization: `Bearer ${localStorage.getItem("jwt")}`, // Ajouter le token dans le header Authorization
				},
				body: JSON.stringify(data),
			});

			if (!response.ok) {
				const errorMessage = await response.text();
				console.error(`Error: ${response.status} - ${errorMessage}`);
				throw new Error(errorMessage);
			}

			console.log("Creation de ta prédiction");
			setIsValidated(true);
		} catch (error) {
			console.error(error);
		}
	};

	// Méthode qui permet de supprimer un pronostic en base de donnée
	const handleDeletePredict = async (
		event: React.FormEvent<HTMLFormElement>,
	) => {
		event.preventDefault();
		try {
			const response = await fetch(
				`http://localhost:3000/api/predictions/${scorePredict?.match_id}`,
				{
					method: "DELETE",
					headers: {
						"Content-type": "application/json; charset=UTF-8",
						Authorization: `Bearer ${localStorage.getItem("jwt")}`,
					},
				},
			);

			if (!response.ok) {
				const errorMessage = await response.text();
				console.error(`Error: ${response.status} - ${errorMessage}`);
				throw new Error(errorMessage);
			}

			console.log("Suppression de la prédiction");
			formRef.current!.reset();
			setIsValidated(false);
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
					<Input name={"home"} />
					<p>VS</p>
					{/* Away Team */}
					<Input name={"away"} />
				</div>
				<Team team={match.team[1]} />
			</div>
			<button type="submit" className="predictCard__btnValidate">
				{isValidated ? "À moi la victoire !" : "Modifier votre Prédiction"}
			</button>
			<button
				type="button"
				className="predictCard__btnDelete"
				// onClick={handleDeletePredict}
			>
				<img src={iconTrash} alt="" className="predictCard__btnDelete__icon" />
			</button>
		</form>
	);
};

export default Predict_Card_logged;
