import { useEffect, useState } from 'react'
import { IUser } from '../@types'

export const useUserData = () => {
const [user, setUser] = useState<IUser>();

    useEffect(()=> {
        const getUserData = async () => {
            try {
                const token = localStorage.getItem("jwt");
                
                if (!token) {
                    throw new Error("Le Token n'a pas été trouvé");
                }
                const response = await fetch("http://localhost:3000/api/users/profil", {
                    method: "GET",
					headers: {
						Authorization: `Bearer ${token}`, // Ajouter le token dans le header Authorization
					},
                });
                
                if(!response) {
                    throw new Error("Aucune donnée n'a été trouvée");
                    
                }
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



