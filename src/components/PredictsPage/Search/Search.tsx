import "./Search.scss";
import Search_button from "../../../assets/PredictPage/icon_search.svg";
/* import {useState, useEffect} from "react"
 */
interface SearchProps {
	filteredValue: string;
	setFilteredValue: React.Dispatch<React.SetStateAction<string>>;
    className?: string;
}

export const Search = ({ className, filteredValue, setFilteredValue }: SearchProps) => {
	
	/* const [datas,setDatas] = useState([]); */
		
// useEffect(()=>{
// 	fetch("http://localhost:3000/api/predictions")
// 	.then(response => response.json())
// 	.then(json => console.log(json));
// 	},[])



	return (
		<form className={`search__form ${className}`}> 
			<input
				type="text"
				id="search"
				placeholder="Rechercher..."
				// Champ contrôlé afin d'afficher le filtre en temps réel 
				value={filteredValue}
				onChange={(eventChange) => {
					setFilteredValue(eventChange.currentTarget.value);
				}}
				className="search__form__input"
			/>
			<button type="submit" className="search__form__btn">
				<img src={Search_button} alt="" className="search__form__btn__icon" />
			</button>
		</form>
	);
};
