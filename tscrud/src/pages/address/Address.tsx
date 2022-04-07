import { Field, Form, Formik, FormikHelpers } from "formik";
import { useContext, useEffect } from "react";
import api from "../../api";
import { AddressContext } from "../../context/AddressContext";
import { ViaCEPDTO } from "../../model/AddressDTO";

function Address() {
  const {getAddress, createAddress} = useContext<any>(AddressContext)
  const getToken = localStorage.getItem("token");

  useEffect(() => {
    if (getToken) {
      api.defaults.headers.common["Authorization"] = getToken;
    }
  }, []);

  return (
    <div>
      <h1>Signup</h1>
      <Formik
        initialValues={{
          cep: '',
          logradouro: '',
          complemento: '',
          bairro: '',
          localidade: '',
          uf: '',
          numero: '',
          tipo: '',
          pais: ''
        }}
        onSubmit={(
          values: ViaCEPDTO["viaCep"],
          { setSubmitting }: FormikHelpers<ViaCEPDTO["viaCep"]>
        ) => {
            createAddress(values)
            setSubmitting(false);
        }}
      >
        {props => (
        <Form>
          <label htmlFor="cep">CEP</label>
          <Field id="cep" name="cep" placeholder="CEP" />

          <button type='button' onClick={() => getAddress(props.values, props.setFieldValue)}>Buscar CEP</button>

          <label htmlFor="logradouro">Logradouro</label>
          <Field id="logradouro" name="logradouro" placeholder="Logradouro" />

          <label htmlFor="complemento">Complemento</label>
          <Field id="complemento" name="complemento" placeholder="Complemento" />

          <label htmlFor="bairro">Bairro</label>
          <Field id="bairro" name="bairro" placeholder="Bairro"/>

          <label htmlFor="localidade">Localidade</label>
          <Field id="localidade" name="localidade" placeholder="Localidade" />

          <label htmlFor="uf">UF</label>
          <Field id="uf" name="uf" placeholder="UF" />

          <label htmlFor="numero">numero</label>
          <Field id="numero" name="numero" placeholder="numero" />

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
    </div>
  );
}

export default Address;
