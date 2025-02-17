import './404.scss'
import logo from "../../assets/Header/Logo.svg";

export const NotFoundPage = () => {
  return (
    <div className="NotFoundPage404">
      <div className="NotFoundPage404__text">
      <h1 className="NotFoundPage404__text__404">404</h1>
      <h2 className="NotFoundPage404__text__h2">Page Not Found</h2>
      </div>
      

      <img src={logo} alt="Logo" className="logo"/>
      </div>


)}
