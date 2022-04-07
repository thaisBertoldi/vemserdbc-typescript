import { Field, Form, Formik } from "formik";
import { useContext, useEffect} from "react";
import api from "../../api";
import Error from "../../components/error/Error";
import Loading from "../../components/loading/Loading";
import { UserContext } from "../../context/UserContext";
import { NewUserDTO } from "../../model/NewUserDTO";
import List from "./List";
import {
  AllUsersTitle,
  ContainerList,
  ContainerPageUsers,
  TableUsers,
} from "./Users.styles";

function Users() {
  const { user, getUsers, loading, error, createUser } = useContext<any>(UserContext);
  const getToken = localStorage.getItem("token");

  useEffect(() => {
    if (getToken) {
      api.defaults.headers.common["Authorization"] = getToken;
    }
    getUsers();
  }, []);

  if (error) {
    return <Error />;
  }
  return (
    <ContainerPageUsers>
      <ContainerList>
        <h3>Cadastrar novo usuário:</h3>
      <Formik
        initialValues={{
          nome: '',
          email: '',
          dataNascimento: '',
          cpf: '',
        }}
        onSubmit={async (values: NewUserDTO) => {
          createUser(values)
        }}
      >
        {(props) => (
          <Form>
            <div>
              <label htmlFor="nome">Nome:</label>
              <Field id="nome" name="nome" placeholder="Digite seu nome" />
            </div>

            <div>
              <label htmlFor="email">Email:</label>
              <Field
                id="email"
                name="email"
                placeholder="Digite seu email"
                type="email"
              />
            </div>

            <div>
              <label htmlFor="dataNascimento">Data de nascimento:</label>
              <Field
                id="dataNascimento"
                name="dataNascimento"
                placeholder="Digite sua data de nascimento"
              />
            </div>

            <div>
              <label htmlFor="cpf">CPF:</label>
              <Field id="cpf" name="cpf" placeholder="Digite seu cpf" />
            </div>

            <div>
              <button type="submit">Cadastrar</button>
            </div>
          </Form>
        )}
      </Formik>
        <AllUsersTitle>All users</AllUsersTitle>
        <TableUsers>
          <td>Name User</td>
          <td>Birthday</td>
          <td>Cpf</td>
          <td>Email</td>
        </TableUsers>
        {loading && <Loading />}
        {!loading && <List users={user} />}
      </ContainerList>
    </ContainerPageUsers>
  );
}

export default Users;
