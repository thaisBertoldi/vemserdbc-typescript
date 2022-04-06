import { createContext, FC, useEffect, useState } from "react";
import api from "../api";
import { UsersDTO } from "../model/UsersDTO";

export const UserContext = createContext({});

const UserProvider: FC<any> = ({children}) => {
    const [user, setUser] = useState<UsersDTO['users']>([]);

    const getUsers = async () => {
        try {
            const {data} = await api.get('/pessoa')
            setUser(data)
            console.log(data)
        } catch (error) {
            console.log(error)
        }
    }


    return (
        <UserContext.Provider value={{getUsers, user}}>
            {children}
        </UserContext.Provider>
    )
}

export default UserProvider;