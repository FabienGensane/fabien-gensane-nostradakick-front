import "./DateResult.scss";

const DateResult = ({ date }: { date: { date: string; jour: string } }) => {
	return (
		<div className="date">
			<div className="date__containerDate">
				<p className="date__containerDate__date">{date.date}</p>
				<p className="date__containerDate__day">{date.jour}</p>
			</div>
		</div>
	);
};

export default DateResult;
