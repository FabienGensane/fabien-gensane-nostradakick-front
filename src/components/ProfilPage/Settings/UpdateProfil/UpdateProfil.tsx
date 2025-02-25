import { useUserData } from "../../../../hooks/UserData";
import "./UpdateProfil.scss";
import iconEdit from "../../../../assets/PredictPage/pen_edit.svg";

const UpdateProfil = () => {
	const { user } = useUserData();

	return (
		<div className="updateProfil">
			<form action="" className="updateProfil__form">
				<label htmlFor="Firstname">Prénom</label>
				<input type="text" name="Firstname" id="Firstname" />

				<label htmlFor="Lastname">Nom</label>
				<input type="text" name="Lastname" id="Lastname" />

				<label htmlFor="Pseudo">Pseudo</label>
				<input type="text" name="Pseudo" id="Pseudo" />

				<button type="submit">Enregistrer</button>
			</form>
			<div className="updateProfil__photo">
				<img
					src={user?.picture}
					alt=""
					className="updateProfil__photo__profil"
				/>
				<img src={iconEdit} alt="" className="updateProfil__photo__edit" />
			</div>
		</div>
	);
};

export default UpdateProfil;
