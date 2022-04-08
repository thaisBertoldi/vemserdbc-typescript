import { Field, Form, Formik, FormikHelpers, FormikProps } from "formik";
import * as Yup from "yup";
import { useContext, useEffect } from "react";
import api from "../../api";
import InputMask from "react-input-mask"
import { AddressContext } from "../../context/AddressContext";
import { ViaCEPDTO } from "../../model/AddressDTO";
import {
  AlertErrorInput,
  AllFormAddress,
  FormAddress,
  Input,
  LabelInput,
  ListAddress,
  Select,
  TableAddress,
} from "./Address.styles";
import { Button, Container, ContainerInterno } from "../AllPages.styles";

function Address() {
  const {
    getAddress,
    createAddress,
    addressGet,
    returnAddress,
    deleteAddress,
    updateAddress,
  } = useContext<any>(AddressContext);
  const getToken = localStorage.getItem("token");

  useEffect(() => {
    if (getToken) {
      api.defaults.headers.common["Authorization"] = getToken;
    }
    returnAddress();
  }, []);

  const SignupSchema = Yup.object().shape({
    logradouro: Yup.string()
      .min(2, "muito curto")
      .max(50, "muito longo")
      .required("Você precisa preencher esse campo"),
    cep: Yup.string()
      .required("Você precisa preencher esse campo"),
    complemento: Yup.string()
      .min(1, "Complemento precisa conter alguma coisa.")
      .max(50, "Existe mesmo um complemento tão grande assim?")
      .required("Você precisa preencher esse campo"),
    bairro: Yup.string()
      .min(1, "Bairro precisa conter alguma coisa.")
      .max(50, "Existe mesmo um bairro tão grande assim?")
      .required("Você precisa preencher esse campo"),
    localidade: Yup.string()
      .min(1, "Cidade precisa conter alguma coisa.")
      .max(50, "Existe mesmo uma cidade com nome tão grande assim?")
      .required("Você precisa preencher esse campo"),
    uf: Yup.string()
      .min(2, "UF precisa conter duas letras. Ex: RS")
      .max(2, "UF precisa conter duas letras. Ex: RS")
      .required("Você precisa preencher esse campo"),
    numero: Yup.string()
      .max(
        15,
        "Não tem como o número da sua casa ser maior do que isso, acredite."
      )
      .required("Você precisa preencher esse campo"),
    pais: Yup.string()
      .max(
        25,
        "Llanfairpwllgwyngyll é o maior nome de localidade do mundo e tem 20 letras. Consultei no Google, não me tente."
      )
      .required("Você precisa preencher esse campo"),
  });

  return (
    <Container>
      <ContainerInterno>
        <h3>Adicionar novo endereço:</h3>
        <Formik
          initialValues={{
            cep: "",
            logradouro: "",
            complemento: "",
            bairro: "",
            localidade: "",
            uf: "",
            numero: "",
            tipo: "RESIDENCIAL",
            pais: "",
          }}
          validationSchema={SignupSchema}
          onSubmit={(
            values: ViaCEPDTO["viaCep"],
            { setSubmitting }: FormikHelpers<ViaCEPDTO["viaCep"]>
          ) => {
            createAddress(values);
            setSubmitting(false);
          }}
        >
          {(props) => (
            <Form>
              <AllFormAddress>
                <FormAddress>
                  <LabelInput>
                    <label htmlFor="cep">CEP</label>
                    <Field as={InputMask} mask="99999-999" id="cep" name="cep" placeholder="00000-000" />
                    {props.errors.cep && props.touched.cep ? (
                      <AlertErrorInput>{props.errors.cep}</AlertErrorInput>
                    ) : null}

                    <Button
                      type="button"
                      color={"gray"}
                      onClick={() =>
                        getAddress(props.values, props.setFieldValue)
                      }
                    >
                      Buscar CEP
                    </Button>
                  </LabelInput>
                </FormAddress>

                <FormAddress>
                  <LabelInput>
                    <label htmlFor="logradouro">Logradouro</label>
                    <Field
                    as={Input} 
                      id="logradouro"
                      name="logradouro"
                      placeholder="Logradouro"
                    />
                    {props.errors.logradouro && props.touched.logradouro ? (
                      <AlertErrorInput>
                        {props.errors.logradouro}
                      </AlertErrorInput>
                    ) : null}
                  </LabelInput>

                  <LabelInput>
                    <label htmlFor="complemento">Complemento</label>
                    <Field
                    as={Input} 
                      id="complemento"
                      name="complemento"
                      placeholder="Complemento"
                    />
                    {props.errors.complemento && props.touched.complemento ? (
                      <AlertErrorInput>
                        {props.errors.complemento}
                      </AlertErrorInput>
                    ) : null}
                  </LabelInput>

                  <LabelInput>
                    <label htmlFor="bairro">Bairro</label>
                    <Field id="bairro" as={Input} name="bairro" placeholder="Bairro" />
                    {props.errors.bairro && props.touched.bairro ? (
                      <AlertErrorInput>{props.errors.bairro}</AlertErrorInput>
                    ) : null}
                  </LabelInput>

                  <LabelInput>
                    <label htmlFor="localidade">Localidade</label>
                    <Field
                    as={Input} 
                      id="localidade"
                      name="localidade"
                      placeholder="Localidade"
                    />
                    {props.errors.localidade && props.touched.localidade ? (
                      <AlertErrorInput>
                        {props.errors.localidade}
                      </AlertErrorInput>
                    ) : null}
                  </LabelInput>

                  <LabelInput>
                    <label htmlFor="uf">UF</label>
                    <Field id="uf" name="uf" as={Input} placeholder="UF" />
                    {props.errors.uf && props.touched.uf ? (
                      <AlertErrorInput>{props.errors.uf}</AlertErrorInput>
                    ) : null}
                  </LabelInput>

                  <LabelInput>
                    <label htmlFor="numero">numero</label>
                    <Field id="numero" as={Input} name="numero" placeholder="00" />
                    {props.errors.numero && props.touched.numero ? (
                      <AlertErrorInput>{props.errors.numero}</AlertErrorInput>
                    ) : null}
                  </LabelInput>

                  <LabelInput>
                    <label htmlFor="tipo">Tipo:</label>
                    <Field as={Select} name="tipo">
                      <option value="RESIDENCIAL">RESIDENCIAL</option>
                      <option value="COMERCIAL">COMERCIAL</option>
                    </Field>
                  </LabelInput>

                  <LabelInput>
                    <label htmlFor="pais">País</label>
                    <Field id="pais" as={Input} name="pais" placeholder="País" />
                    {props.errors.pais && props.touched.pais ? (
                      <AlertErrorInput>{props.errors.pais}</AlertErrorInput>
                    ) : null}
                  </LabelInput>
                </FormAddress>

                <FormAddress>
                  <LabelInput>
                    <Button type="submit" color={"#29CC97"}>
                      Cadastrar
                    </Button>
                  </LabelInput>
                </FormAddress>
              </AllFormAddress>
            </Form>
          )}
        </Formik>
        <div>
          <h3>All address</h3>
          <TableAddress>
            <p>Logradouro</p>
            <p>Numero</p>
            <p>Complemento</p>
            <p>Cidade</p>
            <p>Estado</p>
            <p>País</p>
          </TableAddress>
          {addressGet.map((add: any) => (
            <ListAddress key={add.idEndereco}>
              <h4>{add.logradouro}</h4>
              <p>{add.numero}</p>
              <p>{add.complemento}</p>
              <p>{add.cidade}</p>
              <p>{add.estado}</p>
              <p>{add.pais}</p>
              <Button
                type="button"
                color={"green"}
                onClick={() => updateAddress(add.idEndereco)}
              >
                Atualizar
              </Button>
              <Button
                type="button"
                color={"red"}
                onClick={() => deleteAddress(add.idEndereco)}
              >
                Deletar
              </Button>
            </ListAddress>
          ))}
        </div>
      </ContainerInterno>
    </Container>
  );
}

export default Address;
