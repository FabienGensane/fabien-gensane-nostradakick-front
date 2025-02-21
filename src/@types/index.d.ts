export interface IMatch {
	competition_id: number;
	date: string;
	match_id: number;
	outcome: string;
	score_away: number;
	score_home: number;
	stadium: string;
	team: ITeam[];
	created_at: string;
	updated_at: null | string;
}

export interface ITeam {
	city: string;
	country: string;
	logo: string;
	name: string;
	team_id: number;
	created_at: string;
	updated_at: null | string;
}

export interface IPredicts {
	match: IMatch;
	match_id: number;
	user: IUser[];
	user_id: number;
	points_outcome: number;
	points_score: number;
	prediction_id: number;
	score_predi_away: number;
	score_predi_home: number;
	created_at: string;
	updated_at: null | string;
}

export interface IUser {
	email: string;
	first_name: string;
	last_name: string;
	password: string;
	picture: null | string;
	user_id: number;
	pseudo: string;
	prediction: IPredicts[];
	created_at: string;
	updated_at: null | string;
}

export interface ICompetition {
	name: string;
	season: string;
	logo: string;
	created_at: string;
	updated_at: null | string;
}
