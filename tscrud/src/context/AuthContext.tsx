import {FC, createContext, useState } from "react";
import {useNavigate} from 'react-router-dom'
import api from "../api";
import { LoginDTO } from "../model/LoginDTO";

export const AuthContext = createContext({});

const AuthProvider: FC<any> = ({children}) => {
    const navigate = useNavigate()

    const [token, setToken] = useState<string>('')

    const handleLogin = async (user:LoginDTO) => {
        try {
          const {data} = await api.post('/auth', user)
          setToken(data)
          localStorage.setItem('token', data)
          api.defaults.headers.common['Authorization'] = data;
          navigate('/')
        } catch (error) {
            console.log(error)
        }
        
    }

    const handleLogout = () => {
        localStorage.removeItem('token');
        navigate('/login')
    }

    return (
        <AuthContext.Provider value={{handleLogin, token, handleLogout}}>
        {children}
        </AuthContext.Provider>
    )
}

export default AuthProvider