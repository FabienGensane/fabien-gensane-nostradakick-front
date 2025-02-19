import { useNavigate } from "react-router";
import logo from "../../assets/Header/Logo.svg";
import { IUser } from "../../@types";
import "./authentification.scss";

export default function Auth() {
	const navigate = useNavigate();

	const loginFetch = async (user:Iuser) => {
		try {
			const res = await fetch("http://localhost:3000/api/signin", {
				method: "POST",
				headers: {
					"Content-type": "application/json; charset=UTF-8",
				},
				body: JSON.stringify(user),
			})

			if (!res.ok) {
				return console.error("Mauvais identifiant !");
			}

			const data = await res.json();

			localStorage.setItem("jwt", data.token);
			console.log("token enregistré !");

			if (data.message === "Authentifié avec succès") {
				navigate("/predictions");
			}
		} catch (error) {}
	};

	const HandleLogin = (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		const myFormData = new FormData(event.currentTarget);
		const userLogin = {
			email: myFormData.get("email") as string,
			password: myFormData.get("password") as string,
		};
		console.log(userLogin);
		loginFetch(userLogin);
	};

	return (
		<div className="loginPage">
			<div className="loginPage__loginCard">
				<form onSubmit={HandleLogin}>
					<img src={logo} alt="Logo" className="loginPage__loginCard__logo" />

					<label>Email
					<div className="loginPage__loginCard__password">
						<input
							type="email"
							placeholder="email@nostradakick.fr"
							required
							name="email"
						/>
						<button
							type="button"
							className="loginPage__loginCard__hidenPassword"
						>
							<img src="" alt="" />
						</button>
					</div>
					</label>

					<label>Mot de passe
					<div className="loginPage__loginCard__password">
						<input
							type="password"
							placeholder="Votre mot de passe"
							required
							name="password"
						/>
						<button
							type="button"
							className="loginPage__loginCard__hidenPassword"
						>
							<img src="" alt="" />
						</button>
					</div>
					</label>

					<a href="/" className="loginPage__loginCard__forgotPassword">
						Mot de passe oublié
					</a>

					<button type="submit" className="loginPage__loginCard__loginButton">
						Se connecter
					</button>

					<p className="loginPage__loginCard__terms">
						En poursuivant, vous acceptez les conditions générales d'utilisation
						et reconnaissez avoir lu la politique de protection des données.
					</p>
				</form>
			</div>
		</div>
	);
}
