import { createContext, FC, ReactNode, useState } from "react";
import api from "../api";
import { UsersDTO } from "../model/UsersDTO";
import Notiflix from 'notiflix';
import { NewUserDTO } from "../model/NewUserDTO";

export const UserContext = createContext({});

const UserProvider: FC<ReactNode> = ({children}) => {
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

    const createUser = async (values: NewUserDTO) => {
        try {
            const {data} = await api.post('/pessoa', values)
            Notiflix.Notify.success('Contato criado com sucesso!');
            getUsers()
        } catch (error) {
            console.log('Algo de errado nao esta certo no createUser', error)
            Notiflix.Notify.failure('Sinto muito, mas nao foi possivel criar esse contato.');
        }
    }

    const updateUser = async (id: number) => {
        console.log(id)
    }

    const deleteUser = (id: number) => {
        Notiflix.Confirm.show(
            'Alerta de Confirmação',
            'Tem certeza que deseja apagar esse contato?',
            'Yes',
            'No',
            async function okCb() {
                try {
                    await api.delete(`/pessoa/${id}`)
                    getUsers()
                    Notiflix.Notify.success('Você excluiu esse contato.');
                } catch (error) {
                    Notiflix.Notify.failure('Sinto muito, mas nao foi possivel excluir esse contato.');
                    console.log(error)
                }  
            },
            function cancelCb() {
                Notiflix.Notify.failure('Então pq clicou? Afe');
            },
            {
              width: '320px',
              borderRadius: '8px',
            },
          );
    }

    return (
        <UserContext.Provider value={{getUsers, user, loading, setLoading, error, setError, updateUser, deleteUser, createUser}}>
            {children}
        </UserContext.Provider>
    )
}

export default UserProvider;