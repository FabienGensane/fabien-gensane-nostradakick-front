import "./Predict_Card_nonLogged.scss";
import dayjs from "dayjs";
import duration from "dayjs/plugin/duration";
import { IMatch } from "../../../@types";
import { useRef, useState } from "react";
import Chrono from "./Chrono/Chrono";
import Input from "./Input/Input";
import Team from "./Team/Team";

import { useNavigate } from "react-router";

dayjs.extend(duration);

const Predict_Card_nonLogged = ({ match }: { match: IMatch }) => {
	const navigate = useNavigate();
	const [chrono, setChrono] = useState("");
	// Etat qui permet de vérifier si une prédiction a été postée. D'origine, l'état est faux.
	const formRef = useRef<HTMLFormElement>(null);

	// Méthode qui permet d'aller chercher en BDD les scores "prédits" par l'utilisateur afin de les afficher

	// Méthode qui permet de récupérer dans le formulaire "predict_card" les informations nécessaires à la création d'une prédiction
	const handleSubmitPredict = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		// Votre logique de soumission ici

		// Redirection
		navigate("/login");
	};

	return (
		<form
			className="predictCardNoLogin"
			style={chrono === "00:00:00:00" ? { display: "none" } : {}}
			onSubmit={handleSubmitPredict}
			ref={formRef}
		>
			{/* Minuteur */}
			<Chrono chrono={chrono} setChrono={setChrono} match={match} />
			{/* Prédiction */}
			<div className="predictCardNoLogin__containerPredict">
				{/* Home Team */}
				<Team team={match.team[0]} />
				<div className="predictCardNoLogin__containerPredict__inputContent">
					<Input name={"home"} />
					<p>VS</p>
					{/* Away Team */}
					<Input name={"away"} />
				</div>
				<Team team={match.team[1]} />
			</div>
			<button type="submit" className="predictCardNoLogin__btnValidate">
				Prédis l'issue du match!
			</button>
		</form>
	);
};

export default Predict_Card_nonLogged;
