import { Field, Form, Formik } from "formik";
import { useContext, useEffect } from "react";

import * as Yup from "yup";
import api from "../../api";
import Error from "../../components/error/Error";
import Loading from "../../components/loading/Loading";
import { UserContext } from "../../context/UserContext";
import { NewUserDTO } from "../../model/NewUserDTO";
import { AlertErrorInput } from "../address/Address.styles";
import { Button, Container, ContainerInterno } from "../AllPages.styles";
import List from "./List";
import {
  AllUsersTitle,
  DivLabelField,
  FormNewUser,
  InputWithMask,
  TableUsers,
} from "./Users.styles";

function Users() {
  const { user, getUsers, loading, error, createUser } =
    useContext<any>(UserContext);
  const getToken = localStorage.getItem("token");

  useEffect(() => {
    if (getToken) {
      api.defaults.headers.common["Authorization"] = getToken;
    }
    getUsers();
  }, []);

  const SignupSchema = Yup.object().shape({
    nome: Yup.string()
      .min(2, "muito curto")
      .max(50, "muito longo")
      .required("Você precisa preencher esse campo"),
    email: Yup.string()
      .email("Este campo precisa ser preenchido com um email.")
      .required("Você precisa preencher esse campo"),
    dataNascimento: Yup.string().required("Você precisa preencher esse campo"),
    cpf: Yup.string().required("Você precisa preencher esse campo"),
  });

  return (
    <Container>
      <ContainerInterno>
        <h3>Cadastrar novo usuário:</h3>
        <Formik
          initialValues={{
            nome: "",
            email: "",
            dataNascimento: "",
            cpf: "",
          }}
          validationSchema={SignupSchema}
          onSubmit={async (values: NewUserDTO) => {
            createUser(values);
          }}
        >
          {(props) => (
            <Form>
              <FormNewUser>
                <DivLabelField>
                  <label htmlFor="nome">Nome:</label>
                  <Field
                    as={InputWithMask}
                    id="nome"
                    name="nome"
                    placeholder="Name"
                  />
                  {props.errors.nome && props.touched.nome ? (
                    <AlertErrorInput>{props.errors.nome}</AlertErrorInput>
                  ) : null}
                </DivLabelField>

                <DivLabelField>
                  <label htmlFor="email">Email:</label>
                  <Field
                    as={InputWithMask}
                    id="email"
                    name="email"
                    placeholder="youremail@email.com"
                    type="email"
                  />
                  {props.errors.email && props.touched.email ? (
                    <AlertErrorInput>{props.errors.email}</AlertErrorInput>
                  ) : null}
                </DivLabelField>

                <DivLabelField>
                  <label htmlFor="dataNascimento">Data de nascimento:</label>
                  <Field
                    as={InputWithMask}
                    mask="99/99/9999"
                    id="dataNascimento"
                    name="dataNascimento"
                    placeholder="00/00/0000"
                  />
                  {props.errors.dataNascimento &&
                  props.touched.dataNascimento ? (
                    <AlertErrorInput>
                      {props.errors.dataNascimento}
                    </AlertErrorInput>
                  ) : null}
                </DivLabelField>

                <DivLabelField>
                  <label htmlFor="cpf">CPF:</label>
                  <Field
                    as={InputWithMask}
                    mask="999.999.999-99"
                    id="cpf"
                    name="cpf"
                    placeholder="000.000.000-00"
                  />
                  {props.errors.cpf && props.touched.cpf ? (
                    <AlertErrorInput>{props.errors.cpf}</AlertErrorInput>
                  ) : null}
                </DivLabelField>

                <DivLabelField>
                  <Button type="submit" color={"#29CC97"}>
                    Cadastrar
                  </Button>
                </DivLabelField>
              </FormNewUser>
              <AllUsersTitle>All users</AllUsersTitle>
              <TableUsers>
                <p>Name User</p>
                <p>Birthday</p>
                <p>Cpf</p>
                <p>Email</p>
              </TableUsers>
              {loading && <Loading />}
              {error && <Error />}
              {!loading && !error && <List users={user}/>}
            </Form>
          )}
        </Formik>
      </ContainerInterno>
    </Container>
  );
}

export default Users;
