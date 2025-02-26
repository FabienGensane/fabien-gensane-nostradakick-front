import dayjs from "dayjs";
import duration from "dayjs/plugin/duration";
import { useEffect } from "react";
import { IMatch } from "../../../../@types";
import iconChrono from "../../../../assets/PredictPage/Chrono.svg";
import "./Chrono.scss";

dayjs.extend(duration);
interface IProspChrono {
	match: IMatch;
	chrono: string;
	setChrono: React.Dispatch<React.SetStateAction<string>>;
}

const Chrono = ({ match, chrono, setChrono }: IProspChrono) => {
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
	}, [match.date, setChrono]);

	return (
		<div className="predictCardNoLogin__containerChrono">
			<img
				src={iconChrono}
				alt="Temps restant avant le dbut du match"
				className="predictCardNoLogin__containerChrono__icon"
			/>
			<p className="predictCardNoLogin__containerChrono__chrono">{chrono}</p>
		</div>
	);
};

export default Chrono;
