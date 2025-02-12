import { Search } from "./Search/Search";
import Predict_Card from "./Predict_Card/Predict_Card";

import "./PredicstPage.scss";

export const PredictsPage = () => {
	return (
		<main className="main__predicts">
			<Search />
			<div className="main__predicts__container">
                <Predict_Card />
                <Predict_Card />
                <Predict_Card />
                <Predict_Card />
				
            </div>
		</main>
	);
};
