import { FC, createContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api";
import { LoginDTO } from "../model/LoginDTO";

export const AuthContext = createContext({});

const AuthProvider: FC<any> = ({ children }) => {
  const navigate = useNavigate();

  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState(false);
  const [isToken, setIsToken] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('token')
    if (token){
      setIsToken(true)
    } else {
      navigate('/login')
    }
    setLoading(false)
  }, []);

  const handleLogin = async (user: LoginDTO) => {
    try {
      const { data } = await api.post("/auth", user);
      localStorage.setItem("token", data);
      api.defaults.headers.common["Authorization"] = data;
      setIsToken(true);
      navigate("/");
    } catch (error) {
      console.log(error);
      setError(true);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    setIsToken(false)
    navigate("/login");
  };

  if (loading) {
    return <h1>Loading</h1>;
  }
  if (error) {
    return <h1>Error</h1>;
  }
  return (
    <AuthContext.Provider value={{ handleLogin, handleLogout, isToken }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
