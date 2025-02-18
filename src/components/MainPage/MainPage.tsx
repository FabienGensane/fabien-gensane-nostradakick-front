import Predict_Card from "../PredictsPage/Predict_Card/Predict_Card";
import "./MainPage.scss";
import { useEffect, useState } from "react";
import { IMatch } from "../../@types";


export const MainPage = () => {

    const [matchs, setMatchs] = useState<IMatch[]>([]);

  useEffect(() => {
		const fetchPredicts = async () => {
			try {
				const response = await fetch("http://localhost:3000/api/matchs");
				const data = await response.json();
				setMatchs(data);
			} catch (error) {
				console.log("erreur");
			} 
		};
		fetchPredicts();
	}, []);


	// Trier les débuts de matchs par ordre croissant
	matchs.sort((a, b) => a.date.localeCompare(b.date));

  return (
    <main className="homePage">
			<div className="homePage__container">
        <div className="homePage__container__catchPhrases">
          <h3 className="homePage__container__catchPhrases__description">Pronos foot entre amis</h3>
          <h1 className="homePage__container__catchPhrases__question">Qui sera le roi du terrain ?</h1>
          <p className="homePage__container__catchPhrases__paragraph">NostradaKick, le jeu de pronostics foot qui te permet de défier tes amis et de grimper au classement !</p>
          <a href="/login" className="homePage__container__catchPhrases__callToAction">Rejoins le jeu gratuitement!</a>
        </div>
        <div className="homePage__container__matchs">
        {matchs.slice(0,6).map((match) => (
					<Predict_Card key={match.match_id} match={match} />
				))}
        </div>
        <div className="homePage__container__joinUs">
          <h2>Rejoins NostradaKick
          dès maintenant...</h2>
          <p>et prouve que tu es le meilleur pronostiqueur !</p>
          <a href="/login" className="homePage__container__catchPhrases__callToAction">Rejoins le jeu gratuitement!</a>
        </div>
			</div>
		</main>
	);
};

