import "./Predict_Card.scss";

import logoMontpellier from "../../../assets/PredictPage/Logo_Montpellier.png";
import logoOL from "../../../assets/PredictPage/Logo_OL.png";
import iconTrash from "../../../assets/PredictPage/trash_delete.svg";
import iconEdit from "../../../assets/PredictPage/pen_edit.svg";
import iconChrono from "../../../assets/PredictPage/Chrono.svg";

const Predict_Card = () => {
	return (
		<div className="predictCard">
			<div className="predictCard__containerChrono">
				<img
					src={iconChrono}
					alt=""
					className="predictCard__containerChrono__icon"
				/>
				<p className="predictCard__containerChrono__chrono">
					03 : 12 : 34 : 56
				</p>
			</div>
			<div className="predictCard__containerPredict">
				<div className="predictCard__containerPredict__Team">
					<img
						src={logoMontpellier}
						alt=""
						className="predictCard__containerPredict__Team__logo"
					/>
					<p className="predictCard__containerPredict__Team__name">
						Montpellier
					</p>
				</div>
				<div className="predictCard__containerPredict__inputContent">
                    <div className="predictCard__containerPredict__input">
                        <input
                            type="text"
                            className="predictCard__containerPredict__input__score"
                        />
                        <button
                            type="button"
                            className="predictCard__containerPredict__input__edit"
                        >
                            <img
                                src={iconEdit}
                                alt=""
                                className="predictCard__containerPredict__input__edit__icon"
                            />
                        </button>
                    </div>
                    <p>VS</p>
                    <div className="predictCard__containerPredict__input">
                        <input
                            type="text"
                            className="predictCard__containerPredict__input__score"
                        />
                        <button
                            type="button"
                            className="predictCard__containerPredict__input__edit"
                        >
                            <img
                                src={iconEdit}
                                alt=""
                                className="predictCard__containerPredict__input__edit__icon"
                            />
                        </button>
                    </div>
                </div>
				<div className="predictCard__containerPredict__Team">
					<img
						src={logoOL}
						alt=""
						className="predictCard__containerPredict__Team__logo"
					/>
					<p className="predictCard__containerPredict__Team__name">
						OL
					</p>
				</div>
			</div>
			<button type="button" className="predictCard__btnValidate">
				À moi la victoire !
			</button>
			<button type="button" className="predictCard__btnDelete">
				<img src={iconTrash} alt="" className="predictCard__btnDelete__icon" />
			</button>
		</div>
	);
};

export default Predict_Card;
