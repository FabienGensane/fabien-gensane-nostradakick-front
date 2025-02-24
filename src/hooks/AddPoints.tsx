import { useCallback, useEffect, useState } from "react";
import { IMatch, IPredicts } from "../@types";
import { apiRequest } from "../components/utils/api";

type PartialPoints = Partial<IPredicts>;

const useAddPoints = ({
	match,
	scorePredict,
}: {
	match: IMatch;
	scorePredict: IPredicts;
}) => {
	const [addPoint, setAddPoint] = useState<IPredicts>();
	const [pointsData, setPointsData] = useState<PartialPoints | undefined>(
		undefined,
	); // Nouvel état pour stocker les données de points

	// Fonction pour calculer les points (sans useEffect ni useState)
	const calculatePoints = useCallback(() => {
		if (!scorePredict) return null; // Retourne null si scorePredict est absent

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
			return data; // Retourne les données de points
		}
	}, [match, scorePredict]);

	useEffect(() => {
		if (!match || !scorePredict) return; // Sortie rapide si les données nécessaires ne sont pas disponibles

		const points = calculatePoints();
		if (!points) return; // Sortie si aucun point n'est calculé

		setPointsData(points); // Mise à jour de l'état avec les points calculés
	}, [match, scorePredict, calculatePoints]);
	// Dépendances : match et scorePredict

	useEffect(() => {
		// Effect pour patcher les points uniquement quand pointsData change et n'est pas null
		if (pointsData) {
			const patchAddPoint = async () => {
				try {
					const addPointpatch = await apiRequest(
						`/predictions/${scorePredict.prediction_id}`,
						"PATCH",
						pointsData, // Envoie pointsData au lieu de addPointUser()
					);
					setAddPoint(addPointpatch);
				} catch (error) {
					console.error(error);
				}
			};
			patchAddPoint();
		}
	}, [pointsData, scorePredict]); // Dépendances : pointsData et scorePredict

	return { addPoint };
};

export default useAddPoints;
