import { createContext, FC, useState } from "react";
import api from "../api";
import { UsersDTO } from "../model/UsersDTO";

export const UserContext = createContext({});

const UserProvider: FC<any> = ({children}) => {
    const [user, setUser] = useState<UsersDTO['users']>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState(false);

    const getUsers = async () => {
        try {
            const {data} = await api.get('/pessoa')
            setUser(data)
            setLoading(false)
        } catch (error) {
            console.log(error)
            setLoading(false)
            setError(true)
        }
    }

    return (
        <UserContext.Provider value={{getUsers, user, loading, setLoading, error, setError}}>
            {children}
        </UserContext.Provider>
    )
}

export default UserProvider;