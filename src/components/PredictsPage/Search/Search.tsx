import "./Search.scss";
import Search_button from "../../../assets/PredictPage/icon_search.svg";

export const Search = () => {
	return (
		<form className="search__form"> 
			<input
				type="text"
				id="search"
				placeholder="Rechercher..."
				className="search__form__input"
			/>
			<button type="submit" className="search__form__btn">
				<img src={Search_button} alt="" className="search__form__btn__icon" />
			</button>
		</form>
	);
};
