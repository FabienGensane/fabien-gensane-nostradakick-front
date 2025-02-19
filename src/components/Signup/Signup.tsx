import { useNavigate } from "react-router";
import logo from "../../assets/Header/Logo.svg";
import "./Signup.scss";
import { useState } from "react";
import { FaEyeSlash } from "react-icons/fa";
import { IoEyeSharp } from "react-icons/io5";
import "react-toastify/dist/ReactToastify.css";




export default function Signup() {
  const navigate = useNavigate();


  const RegistrFetch = async (user : any) => {
    try {
      const res = await fetch("http://localhost:3000/api/users", {
        method: "POST",
        headers: {
          "Content-type": "application/json; charset=UTF-8",
        },
        body: JSON.stringify(user),
      });

      if (!res.ok) {
        return console.error("Erreur message !");
      }

      const data = await res.json();

      if (data.message === "Votre profil a bien été créé")
        console.log(data.message)
      {
        navigate("/login");
      }
    } catch (error) {}
  };

  const handleRegister = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
  
    const myFormData = new FormData(event.currentTarget);
  
    const createUser = {
      first_name: myFormData.get("first_name") ?.toString() ?? "",
      last_name: myFormData.get("last_name")?.toString() ?? "",
      pseudo: myFormData.get("pseudo")?.toString() ?? "",
      email: myFormData.get("email")?.toString() ?? "",
      password: myFormData.get("password")?.toString() ?? "",
      
    };
    const confirmPassword = myFormData.get("confirmPassword")?.toString() ?? "";
    setError(createUser.password !== confirmPassword);
  
    console.log(createUser);
  
    RegistrFetch(createUser);
  };

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

  const handleConfirmPasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setConfirmPassword(e.target.value);
  }

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
  
  const showPasswordRules = password.length > 0 && (
  !isValideMinChar || !isValideMaxChar || !isValideMinuscule || 
  !isValideMajuscule || !isValideMinNumber || !isValideSpecialChar
  );

  return (
    <div className="registrePage">
      <div className="registrePage__registreCard">
        <form onSubmit={handleRegister}>
          <img
            src={logo}
            alt="Logo"
            className="registrePage__registreCard__logo"
          />

          <label>Prénom</label>
          <div className="registrePage__registreCard__firstName">
            <input
              type="text"
              placeholder="Votre Prénom"
              required
              name="first_name"
            />
          </div>

          <label>Nom</label>
          <div className="registrePage__registreCard__lastName">
            <input 
            type="text" 
            placeholder="Votre Nom" 
            required name="last_name" />
          </div>

          <label>Pseudo</label>
          <div className="registrePage__registreCard__pseudo">
            <input
              type="pseudo"
              placeholder="Votre Pseudo"
              required
              name="pseudo"
            />
          </div>

          <label>Email</label>
          <div className="registrePage__registreCard__email">
            <input
              type="email"
              placeholder="Votre Email"
              required
              name="email"
            />
          </div>

          <label>Mot de passe</label>
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
                {!isValideMinChar && <li>Le mot de passe doit contenir au moins 8 caractères.</li>}
                {!isValideMaxChar && <li>Le mot de passe ne doit pas dépasser 32 caractères.</li>}
                {!isValideMajuscule && <li>Le mot de passe doit contenir au moins une majuscule.</li>}
                {!isValideMinuscule && <li>Le mot de passe doit contenir au moins une minuscule.</li>}
                {!isValideMinNumber && <li>Le mot de passe doit contenir au moins un chiffre.</li>}
                {!isValideSpecialChar && <li>Le mot de passe doit contenir au moins un caractère spécial (@$!%*?&).</li>}
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

          <label>Confirmer mot de passe</label>
          <div className="registrePage__registreCard__confirmedPassword">
            
            <input
              placeholder="Confirmez votre mot de passe"
              required
              name="confirmer_mot_de_passe"
              value={confirmPassword}
              type={visibleConfirmPassword ? "text" : "password"}
              id="confirmPassword"
              onChange={handleConfirmPasswordChange}/>  
              
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

          <button
            type="submit"
            className="registrePage__registreCard__signupButton  "
            disabled={password !== confirmPassword || error} 
                        
          >
            S'inscrire
            
          </button>
          
          <br />

          <p className="registrePage__registreCard__existingAccount">
            Vous avez déja un compte? <a href="/login" className="link">Connecter-vous</a>
          </p>
          <br />

          <p className="registrePage__registreCard__personalData">
		  Vos données personnelles sont traitées conjointement par la Ligue de Football Professionnel et sa filiale LFP 1 (ci-après dénommées ensemble « LFP » pour plus de commodité) dans le but de créer et de gérer votre compte utilisateur. Pour en savoir plus sur le traitement de vos données et vos droits : Politique de protection des données.
          </p>
        </form>
      </div>
    </div>
  );
}
