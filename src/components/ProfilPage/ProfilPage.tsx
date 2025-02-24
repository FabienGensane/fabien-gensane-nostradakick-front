import HeaderProfil from "./HeaderProfil/HeaderProfil";
import MyPredict from "./MyPredict/MyPredict";
import "./ProfilPage.scss";

export const ProfilPage = () => {
	return (
		<div className="profilPage">
			<HeaderProfil />
			<MyPredict />
		</div>
	);
};
