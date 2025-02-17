import "./MainPage.scss";

export const MainPage = () => {
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
          <p>toutou</p>
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

