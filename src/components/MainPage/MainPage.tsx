import Predict_Card_nonLogged from "../PredictsPage/Predict_Card_nonLogged/Predict_Card_nonLogged";
import "./MainPage.scss";
import { useEffect, useState } from "react";
import { IMatch } from "../../@types";
import { IUser } from "../../@types";
import BestScore from "../RankPage/BestScore/BestScore";
import { calculPoint } from "../RankPage/RankPage";
import "../RankPage/BestScore/BestScore.scss"




export const MainPage = () => {
    const [matchs, setMatchs] = useState<IMatch[]>([]);
    const [users, setUsers] = useState<IUser[]>();

  useEffect(() => {
		const fetchPredicts = async () => {
			try {
				const response = await fetch("http://localhost:3000/api/calendar");
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

  // Récupération des users avec leurs prédictions
	useEffect(() => {
		const getUsers = async () => {
			try {
				const res = await fetch("http://localhost:3000/api/users");
				const data = await res.json();

				setUsers(data);
			} catch (error) {
				console.error(error);	
			}
		};
		getUsers();
	}, []);

  // Mise en ordre (décroissant) des users par rapport à leurs points
    users?.sort((a, b) => {
      return calculPoint(b) - calculPoint(a);
    });


	

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
					<Predict_Card_nonLogged key={match.match_id} match={match} />
				))}
        </div>
        <div className="homePage__container__ranking">
          <p className="homePage__container__ranking__paragraph">Top</p>
          <h2 className="homePage__container__ranking__title">Des Bookmakers</h2>
          <div className="homePage__container__ranking__top">
            {/* Création des 3 meilleures users */}
				    {users?.slice(0, 3).map((user) => (
					  <BestScore key={user.user_id} user={user} />
				))}
          </div>
          
        </div>
        <div className="homePage__container__joinUs">
          <h2 className="homePage__container__joinUs__title">Rejoins NostradaKick
          dès maintenant...</h2>
          <p className="homePage__container__joinUs__paragraph">et prouve que tu es le meilleur pronostiqueur !</p>
          <a href="/login" className="homePage__container__joinUs__callToAction">Rejoins le jeu gratuitement!</a>
        </div>
			</div>
		</main>
	);
};

