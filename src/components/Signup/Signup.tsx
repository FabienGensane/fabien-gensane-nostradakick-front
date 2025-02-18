import { useNavigate } from "react-router";
import logo from "../../assets/Header/Logo.svg";
import "./Signup.scss";
import { useState } from "react";
import { FaEyeSlash } from "react-icons/fa";
import { IoEyeSharp } from "react-icons/io5";

export default function Signup() {
  const navigate = useNavigate();

  const RegistrFetch = async (user : any) => {
    try {
      const res = await fetch("http://localhost:3000/api/signup", {
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

      if (data.message === "Votre profile à bien été créé") {
        navigate("/predictions");
      }
    } catch (error) {}
  };

  const HandleLogin = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const myFormData = new FormData(event.currentTarget);
    const creatUser = {
      first_name: myFormData.get("Prénom") as string,
      last_name: myFormData.get("Nom") as string,
      pseudo: myFormData.get("pseudo") as string,
      email: myFormData.get("Email") as string,
      password: myFormData.get("Mot de passe") as string,
    };
    console.log(creatUser);
    RegistrFetch(creatUser);
  };

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [visiblePassword, setVisiblePassword] = useState(false);
  const [visibleConfirmPassword, setVisibleConfirmPassword] = useState(false);

  return (
    <div className="registrePage">
      <div className="registrePage__registreCard">
        <form onSubmit={HandleLogin}>
          <img
            src={logo}
            alt="Logo"
            className="registrePage__registreCard__logo"
          />

          <label>Prénom</label>
          <div className="registrePage__registreCard__firstName">
            <input
              type="prénom"
              placeholder="Votre Prénom"
              required
              name="prénom"
            />
          </div>

          <label>Nom</label>
          <div className="registrePage__registreCard__lastName">
            <input type="nom" placeholder="Votre Nom" required name="nom" />
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
              name="mot de passe"
              value={password}
              type={visiblePassword ? "text" : "password"}
              id="password"
              onChange={(e) => setPassword(e.target.value)}
            />
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
              name="confirmer mot de passe"
              value={confirmPassword}
              type={visibleConfirmPassword ? "text" : "password"}
              id="confirmPassword"
              onChange={(e) => setConfirmPassword(e.target.value)}
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

          <button
            type="submit"
            className="registrePage__registreCard__signupButton"
          >
            S'inscrire
          </button>
          <br />

          <p className="registrePage__registreCard__existingAccount">
            Vous avez déja un compte? <a href="/singnin">Connecter-vous</a>
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
