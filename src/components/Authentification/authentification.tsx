import logo from "../../assets/Header/Logo.svg";
import "./authentification.scss";

export default function () {
    return (
        <div className="loginPage">
            <div className="loginPage__loginCard">
                <img src={logo} alt="Logo" className="loginPage__loginCard__logo" />
                
                <form>
                    <label>Email</label>
                    <input type="email" placeholder="Votre email" required />

                    <label>Mot de passe</label>
                    <div className="loginPage__loginCard__password">
                        <input
                            type="text"
                            placeholder="Votre mot de passe"
                            required
                        />
                        <button
                            type="button"
                            className="loginPage__loginCard__hidenPassword">
                        </button>
                    </div>

                    <a href="#" className="loginPage__loginCard__forgotPassword">
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
