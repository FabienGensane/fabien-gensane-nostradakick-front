import { IDate } from "../ResultPage";
import "./DateResult.scss";

interface IDateResultProps {
	date: { date: number; day: string; month: string; year: number };
	ActiveDate: IDate;
	setActiveDate: React.Dispatch<React.SetStateAction<IDate>>;
}

const DateResult = ({ date, ActiveDate, setActiveDate }: IDateResultProps) => {
	return (
		<div
			className="date"
			onClick={() => setActiveDate(date)}
			onKeyDown={() => setActiveDate(date)}
		>
			<div
				className={
					ActiveDate.date === date.date
						? "date__containerDate--Active"
						: "date__containerDate"
				}
			>
				<p className="date__containerDate__date">{date.date}</p>
				<p className="date__containerDate__day">{date.day}</p>
			</div>
		</div>
	);
};

export default DateResult;
