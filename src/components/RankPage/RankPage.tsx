import { useEffect, useState } from "react";
import BestScore from "./BestScore/BestScore";
import "./RankPage.scss";
import { IUser } from "../../@types";

export const calculPoint = (user: IUser) => {

		let totalPoint = 0;
		for (const predict of user.prediction) {
				totalPoint += (predict.points_score * 50) + (predict.points_outcome * 10);
		}

		return totalPoint;	
}

export const calculExact = (user: IUser) => {
	let totalExact = 0;
	for (const predict of user.prediction) {
		totalExact += predict.points_score;
	}
	return totalExact;
}

export const calculGood = (user: IUser) => {
	let totalGood = 0;
	for (const predict of user.prediction) {
		totalGood += predict.points_score;
	}
	return totalGood;
}


export const RankPage = () => {

	const [users, setUsers] = useState<IUser[]>();

	useEffect(()=> {
		const getUsers = async ()=> {
			try {
				const res = await fetch("http://localhost:3000/api/users");
				const data = await res.json();

				setUsers(data);
				
			} catch (error) {
				console.error(error);
			}
		}
		getUsers();

	}, [])


	users?.sort((a, b)=> {
		return calculPoint(b) - calculPoint(a);
	})
	


	return (
			<main className="rank">
				<h1 className="rank__title">Classements</h1>
				<div className="rank__bestof3">  

					{users?.slice(0, 3).map((user)=>(
						<BestScore key={user.user_id} user={user}/>
					))}

        		</div>

				<div className="rank__List">
					<div className="rank__List__head">
						<div className="rank__List__head__left">
							<h3 className="rank__List__head__left__title">Position</h3>
							<h3 className="rank__List__head__left__title">Pseudo</h3>
						</div>
						<div className="rank__List__head__right">
							<h3 className="rank__List__head__left__title">Good</h3>
							<h3 className="rank__List__head__left__title">Exact</h3>
							<h3 className="rank__List__head__left__title">Points</h3>
						</div>
					</div>
				</div>
			</main>
	);
};
