import "./Input.scss";
import iconEdit from "../../../../assets/PredictPage/pen_edit.svg";

const Input = ({ name }: { name: string }) => {
	// Bloquer les inputs
	const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
		// Autoriser uniquement les touches numériques et quelques touches spéciales
		if (
			!/[0-9]/.test(event.key) && // Bloque tout sauf les chiffres
			event.key !== "Backspace" // Autorise la touche "Effacer"
		) {
			event.preventDefault(); // Empêche la saisie des caractères non autorisés
		}
	};

	return (
		<div className="predictCardNoLogin__containerPredict__input">
			<input
				type="text"
				className="predictCardNoLogin__containerPredict__input__score"
				name={name}
				onKeyDown={handleKeyDown}
				maxLength={2}
			/>
		</div>
	);
};

export default Input;
