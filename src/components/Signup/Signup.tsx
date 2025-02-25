import { useNavigate } from "react-router";
import logo from "../../assets/Header/Logo.svg";
import "./Signup.scss";
import { useState } from "react";
import { FaEyeSlash } from "react-icons/fa";
import { IoEyeSharp } from "react-icons/io5";
import "react-toastify/dist/ReactToastify.css";
import { Link } from "react-router";
import { apiRequest } from "../utils/api";
import { toast } from "react-toastify";
import { ToastContainer,toast } from "react-toastify";

interface ICreateUser {
	first_name: string;
	last_name: string;
	pseudo: string;
	email: string;
	password: string;
}

export default function Signup() {

	const toastCreatUser =  () => toast('Votre compte à été crée avec succé !');




	const navigate = useNavigate();
	const creationNotification = () =>
		toast.success("Votre compte à bien été créé!", {
			className: "creationUserToast",
			autoClose: 975,
		});

	const createUser = async (data?: ICreateUser) => {
		try {
			const createUser = await apiRequest<ICreateUser>("/users", "POST", data);
			if (createUser) {
				creationNotification();
				setTimeout(() => navigate("/login"), 1500);
			}
		} catch (error) {
			console.error(error);
		}
	};

	const handleRegister = (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault();

		const myFormData = new FormData(event.currentTarget);

		const createUserData = {
			first_name: myFormData.get("first_name") as string,
			last_name: myFormData.get("last_name") as string,
			pseudo: myFormData.get("pseudo") as string,
			email: myFormData.get("email") as string,
			password: myFormData.get("password") as string,
		};
		// Cette variable est en dehors de la data transmise car sert uniquement à vérifier l'équivalence avec le password qui sera envoyé en BDD
		const confirmPassword = myFormData.get("confirmPassword")?.toString() ?? "";
		setError(createUserData.password !== confirmPassword);

		createUser(createUserData);
	};

	// const [pseudo, setPseudo] = useState
	const [password, setPassword] = useState("");
	const [confirmPassword, setConfirmPassword] = useState("");
	const [visiblePassword, setVisiblePassword] = useState(false);
	const [visibleConfirmPassword, setVisibleConfirmPassword] = useState(false);
	const [error, setError] = useState(false);

	const [isValideMinChar, setIsValideMinChar] = useState(false);
	const [isValideMaxChar, setIsValideMaxChar] = useState(true);
	const [isValideMinuscule, setIsValideMinuscule] = useState(false);
	const [isValideMajuscule, setIsValideMajuscule] = useState(false);
	const [isValideMinNumber, setIsValideMinNumber] = useState(false);
	const [isValideSpecialChar, setIsValideSpecialChar] = useState(false);

	const handleConfirmPasswordChange = (
		e: React.ChangeEvent<HTMLInputElement>,
	) => {
		setConfirmPassword(e.target.value);
	};

	const validatePassword = (password: string) => {
		setIsValideMinChar(password.length >= 8);
		setIsValideMaxChar(password.length <= 32);
		setIsValideMinuscule(/[a-z]/.test(password));
		setIsValideMajuscule(/[A-Z]/.test(password));
		setIsValideMinNumber(/\d/.test(password));
		setIsValideSpecialChar(/[@$!%*?&]/.test(password));
	};

	const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const newPassword = e.target.value;
		setPassword(newPassword);
		validatePassword(newPassword);
	};

	const showPasswordRules =
		password.length > 0 &&
		(!isValideMinChar ||
			!isValideMaxChar ||
			!isValideMinuscule ||
			!isValideMajuscule ||
			!isValideMinNumber ||
			!isValideSpecialChar);

	return (
		<div className="registrePage">
			<div className="registrePage__registreCard">
				<form onSubmit={handleRegister}>
					<Link to="/">
						<img
							src={logo}
							alt="Logo"
							className="registrePage__registreCard__logo"
						/>
					</Link>

					<label htmlFor="first_name">Prénom</label>
					<div className="registrePage__registreCard__firstName">
						<input type="text" placeholder="Votre Prénom" name="first_name" />
					</div>

					<label htmlFor="last_name">Nom</label>
					<div className="registrePage__registreCard__lastName">
						<input type="text" placeholder="Votre Nom" name="last_name" />
					</div>

					<label htmlFor="pseudo">
						Pseudo<span>*</span>
						<i>(requis)</i>
					</label>
					<div className="registrePage__registreCard__pseudo">
						<input
							type="pseudo"
							placeholder="Votre Pseudo"
							required
							name="pseudo"
						/>
					</div>

					<label htmlFor="email">
						Email<span>*</span>
						<i>(requis)</i>
					</label>
					<div className="registrePage__registreCard__email">
						<input
							type="email"
							placeholder="Votre Email"
							required
							name="email"
						/>
					</div>

					<label htmlFor="password">
						Mot de passe<span>*</span>
						<i>(requis)</i>
					</label>
					<div className="registrePage__registreCard__password">
						<input
							placeholder="Votre Mot de passe"
							required
							name="password"
							value={password}
							type={visiblePassword ? "text" : "password"}
							id="password"
							onChange={handlePasswordChange}
						/>
						{showPasswordRules && (
							<ul className="toast__password">
								{!isValideMinChar && (
									<li>Le mot de passe doit contenir au moins 8 caractères.</li>
								)}
								{!isValideMaxChar && (
									<li>Le mot de passe ne doit pas dépasser 32 caractères.</li>
								)}
								{!isValideMajuscule && (
									<li>Le mot de passe doit contenir au moins une majuscule.</li>
								)}
								{!isValideMinuscule && (
									<li>Le mot de passe doit contenir au moins une minuscule.</li>
								)}
								{!isValideMinNumber && (
									<li>Le mot de passe doit contenir au moins un chiffre.</li>
								)}
								{!isValideSpecialChar && (
									<li>
										Le mot de passe doit contenir au moins un caractère spécial
										(@$!%*?&).
									</li>
								)}
							</ul>
						)}

						<button
							type="button"
							className="registrePage__registreCard__password__hidenPassword"
							onClick={() => setVisiblePassword(!visiblePassword)}
						>
							<div className="registrePage__registreCard__password__eyesButton">
								{visiblePassword ? <FaEyeSlash /> : <IoEyeSharp />}
							</div>
						</button>
					</div>

					<label htmlFor="confirmPassword">
						Confirmer mot de passe<span>*</span>
						<i>(requis)</i>
					</label>
					<div className="registrePage__registreCard__confirmedPassword">
						<input
							placeholder="Confirmez votre mot de passe"
							required
							name="confirmer_mot_de_passe"
							value={confirmPassword}
							type={visibleConfirmPassword ? "text" : "password"}
							id="confirmPassword"
							onChange={handleConfirmPasswordChange}
						/>

						<button
							type="button"
							className="registrePage__registreCard__password__hidenPassword"
							onClick={() => setVisibleConfirmPassword(!visibleConfirmPassword)}
						>
							<div className="eyesButton">
								{visibleConfirmPassword ? <FaEyeSlash /> : <IoEyeSharp />}
							</div>
						</button>
					</div>

					<p className="registrePage__registreCard__terms">
						En poursuivant, vous acceptez les conditions générales d'utilisation
						et reconnaissez avoir lu la politique de protection des données.
					</p>

					
					<div className="grid place-items-center h-dvh bg-zinc-900/15">
					<button					
						onClick={toastCreatUser}						
						type="submit"
						className="registrePage__registreCard__signupButton  "
						disabled={password !== confirmPassword || error}>						
						S'inscrire
					</button>					
					</div>
					

					<br />

					<p className="registrePage__registreCard__existingAccount">
						Vous avez déja un compte?{" "}
						<a href="/login" className="link">
							Connecter-vous
						</a>
					</p>

					<br />

					<p className="registrePage__registreCard__personalData">
						Vos données personnelles sont traitées conjointement par la Ligue de
						Football Professionnel et sa filiale LFP 1 (ci-après dénommées
						ensemble « LFP » pour plus de commodité) dans le but de créer et de
						gérer votre compte utilisateur. Pour en savoir plus sur le
						traitement de vos données et vos droits : Politique de protection
						des données.
					</p>
				</form>
			</div>
		</div>
	);
}
