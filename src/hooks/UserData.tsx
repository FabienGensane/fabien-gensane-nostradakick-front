import { useEffect, useState } from 'react'
import { IUser } from '../@types'

export const useUserData = () => {
const [user, setUser] = useState<IUser[]>()

    useEffect(()=> {
        const getUserData = async () => {
            try {
                const response = await fetch("http://localhost:3000/api/users/profil", {
                    method: "GET",
					headers: {
						Authorization: `Bearer ${localStorage.getItem("jwt")}`, // Ajouter le token dans le header Authorization
					},
                });
                const data = await response.json();
                setUser(data);
            } catch (error) {
                console.error(error);
            }
        }
        getUserData();
    }, []);

    return {user}
};



