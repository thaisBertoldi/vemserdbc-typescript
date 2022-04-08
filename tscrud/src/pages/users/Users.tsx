import { Field, Form, Formik } from "formik";
import { useContext, useEffect} from "react";
import api from "../../api";
import Error from "../../components/error/Error";
import Loading from "../../components/loading/Loading";
import { UserContext } from "../../context/UserContext";
import { NewUserDTO } from "../../model/NewUserDTO";
import { ButtonAddress } from "../address/Address.styles";
import List from "./List";
import {
  AllUsersTitle,
  ContainerList,
  ContainerPageUsers,
  FormNewUser,
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
            <FormNewUser>
            <div>
              <label htmlFor="nome">Nome:</label>
              <Field id="nome" name="nome" placeholder="Name" />
            </div>

            <div>
              <label htmlFor="email">Email:</label>
              <Field
                id="email"
                name="email"
                placeholder="youremail@email.com"
                type="email"
              />
            </div>

            <div>
              <label htmlFor="dataNascimento">Data de nascimento:</label>
              <Field
                id="dataNascimento"
                name="dataNascimento"
                placeholder="0000-00-00"
              />
            </div>

            <div>
              <label htmlFor="cpf">CPF:</label>
              <Field id="cpf" name="cpf" placeholder="000.000.000-00" />
            </div>

            <div>
              <ButtonAddress type="submit" color={"#29CC97"}>Cadastrar</ButtonAddress>
            </div>
            </FormNewUser>
          </Form>
        )}
      </Formik>
        <AllUsersTitle>All users</AllUsersTitle>
        <TableUsers>
          <p>Name User</p>
          <p>Birthday</p>
          <p>Cpf</p>
          <p>Email</p>
        </TableUsers>
        {loading && <Loading />}
        {!loading && <List users={user} />}
      </ContainerList>
    </ContainerPageUsers>
  );
}

export default Users;
