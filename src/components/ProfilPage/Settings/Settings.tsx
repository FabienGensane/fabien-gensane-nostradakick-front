import "./Settings.scss";
import UpdateProfil from "./UpdateProfil/UpdateProfil";

export default function Settings() {
	return (
		<div className="settings">
			<ul className="settings__list">
				<li className="settings__list__item">Changer mon profil</li>
				<li className="settings__list__item">Changer mon mot de passe</li>
				<li className="settings__list__item">Supprimer mon compte</li>
			</ul>
			<UpdateProfil />
		</div>
	);
}
