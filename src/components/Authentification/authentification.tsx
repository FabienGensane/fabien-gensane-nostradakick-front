import { redirect, useNavigate } from "react-router";
import logo from "../../assets/Header/Logo.svg";
import "./authentification.scss";
import { Link } from "react-router";
import { IUser } from "../../@types";


export default function Auth() {
	const navigate = useNavigate();

	const loginFetch = async (user:IUser) => {
		try {
			const res = await fetch("http://localhost:3000/api/signin", {
				method: "POST",
				headers: {
					"Content-type": "application/json; charset=UTF-8",
				},
				body: JSON.stringify(user),
			});

			if (!res.ok) {
				return console.error("Mauvais identifiant !");
			}

			const data = await res.json();

			localStorage.setItem("jwt", data.token);
			console.log("token enregistré !");

			if (data.message === "Authentifié avec succès") {
				navigate("/predictions");
			}
		} catch (error) {
			console.error(error);
		}
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
			<div className="menu__desktop_login">
			<header className="menu__desktop__login__header">				
				
				<div className="menu__desktop__login__header__buttons">
					
				</div>
					
			</header>
		</div>

			<div className="loginPage__loginCard">
				<form onSubmit={HandleLogin}>
					<img src={logo} alt="Logo" className="loginPage__loginCard__logo" />

<<<<<<< HEAD
					<label>
						Email
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

					<label>
						Mot de passe
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
=======
					<label>Email
					<div className="loginPage__loginCard__password">
						<input
							type="email"
							placeholder="email@nostradakick.fr"
							required
							name="email"
						/>
						
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
						
					</div>
>>>>>>> f0a27a4974038d8b070308e9bb8ce62d06266204
					</label>

					<a href="/" className="loginPage__loginCard__forgotPassword">
						Mot de passe oublié
					</a>

					<button type="submit" className="loginPage__loginCard__loginButton">
						Se connecter
					</button>

					<a href="/signup" >						
							Créer un compte						
					</a>

					<p className="loginPage__loginCard__terms">
						En poursuivant, vous acceptez les conditions générales d'utilisation
						et reconnaissez avoir lu la politique de protection des données.
					</p>
				</form>
				
			<Link to="/"
						className="menu__desktop__login__header__buttons__homePage">					
						Retour au vestiaire (Accueil)
					</Link>
			</div>
		</div>
	);
}
