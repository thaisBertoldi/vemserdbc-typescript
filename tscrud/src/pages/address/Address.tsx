import { Field, Form, Formik, FormikHelpers } from "formik";
import * as Yup from 'yup';
import { useContext, useEffect } from "react";
import api from "../../api";
import { AddressContext } from "../../context/AddressContext";
import { ViaCEPDTO } from "../../model/AddressDTO";
import { ButtonAddress, ListAddress, TableAddress } from "./Address.styles";

function Address() {
  const { getAddress, createAddress, addressGet, returnAddress, deleteAddress, updateAddress } =
    useContext<any>(AddressContext);
  const getToken = localStorage.getItem("token");

  useEffect(() => {
    if (getToken) {
      api.defaults.headers.common["Authorization"] = getToken;
    }
    returnAddress();
  }, []);

  const SignupSchema = Yup.object().shape({
    logradouro: Yup.string()
      .min(2, 'muito curto')
      .max(50, 'muito longo')
      .required('Favor preencha o campo '),
  });

  return (
    <div>
      <h1>Signup</h1>
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
            <label htmlFor="cep">CEP</label>
            <Field id="cep" name="cep" placeholder="CEP" />

            <button
              type="button"
              onClick={() => getAddress(props.values, props.setFieldValue)}
            >
              Buscar CEP
            </button>

            <label htmlFor="logradouro">Logradouro</label>
            <Field id="logradouro" name="logradouro" placeholder="Logradouro" />
            {props.errors.logradouro && props.touched.logradouro ? (
             <div>{props.errors.logradouro}</div>
           ) : null}

            <label htmlFor="complemento">Complemento</label>
            <Field
              id="complemento"
              name="complemento"
              placeholder="Complemento"
            />

            <label htmlFor="bairro">Bairro</label>
            <Field id="bairro" name="bairro" placeholder="Bairro" />

            <label htmlFor="localidade">Localidade</label>
            <Field id="localidade" name="localidade" placeholder="Localidade" />

            <label htmlFor="uf">UF</label>
            <Field id="uf" name="uf" placeholder="UF" />

            <label htmlFor="numero">numero</label>
            <Field id="numero" name="numero" placeholder="numero" />

            <label htmlFor="tipo">Tipo:</label>
            <Field as="select" name="tipo">
              <option value="RESIDENCIAL">RESIDENCIAL</option>
              <option value="COMERCIAL">COMERCIAL</option>
            </Field>

            <label htmlFor="pais">País</label>
            <Field id="pais" name="pais" placeholder="pais" />

            <button type="submit">Cadastrar</button>
          </Form>
        )}
      </Formik>
      <div>
        <TableAddress>
          <td>Logradouro</td>
          <td>Numero</td>
          <td>Complemento</td>
          <td>Cidade</td>
          <td>Estado</td>
          <td>País</td>
        </TableAddress>
        {addressGet.map((add: any) => (
          <ListAddress key={add.idEndereco}>
            <p>{add.logradouro}</p>
            <p>{add.numero}</p>
            <p>{add.complemento}</p>
            <p>{add.cidade}</p>
            <p>{add.estado}</p>
            <p>{add.pais}</p>
            <ButtonAddress type='button' color={'green'} onClick={() => updateAddress(add.idEndereco)}>Atualizar</ButtonAddress>
            <ButtonAddress type='button' color={'red'} onClick={() => deleteAddress(add.idEndereco)}>Deletar</ButtonAddress>
          </ListAddress>
        ))}
      </div>
    </div>
  );
}

export default Address;
