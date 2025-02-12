import { Search } from "./Search/Search";
import Predict_Card from "./Predict_Card/Predict_Card";

import "./PredicstPage.scss";
import { useEffect, useState } from "react";

export const PredictsPage = () => {

	const [predicts, setPredicts] = useState([]);

	const fetchPredicts = async () => {
		try {
			const response = await fetch("http://localhost:3000/api/predictions");
			const data = await response.json();
			console.log(data);
			setPredicts(data);
		} catch (error) {
			console.log('erreur');
		}
	}
	
	useEffect (()=> {	
		fetchPredicts();
	}, [])
	

	console.log(predicts)
	
	return (
		<main className="main__predicts">
			<Search />
			<div className="main__predicts__container">
                <Predict_Card />
				
            </div>
		</main>
	);
};
