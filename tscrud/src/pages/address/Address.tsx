import { FormikHelpers, useFormik } from "formik";
import * as Yup from "yup";
import Notiflix from 'notiflix';
import { useContext, useEffect, useState } from "react";
import api from "../../api";
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
import axios from "axios";

function Address() {
  const { createAddress, addressGet, returnAddress, deleteAddress } =
    useContext<any>(AddressContext);

  const [idAddress, setIdAddress] = useState<number | null>();

  const getToken = localStorage.getItem("token");

  useEffect(() => {
    if (getToken) {
      api.defaults.headers.common["Authorization"] = getToken;
    }
    returnAddress();
  }, []);

  const formik = useFormik({
    initialValues: {
      cep: "",
      logradouro: "",
      complemento: "",
      bairro: "",
      localidade: "",
      uf: "",
      numero: "",
      tipo: "RESIDENCIAL",
      pais: "",
    },
    // validationSchema={SignupSchema}
    onSubmit: (
      values: ViaCEPDTO["viaCep"],
      { setSubmitting }: FormikHelpers<ViaCEPDTO["viaCep"]>
    ) => {
      createAddress(values);
      console.log(values);
      setSubmitting(false);
    },
  });

  async function getAddress(values: string) {
    console.log(values);
    try {
      const { data } = await axios.get(
        `https://viacep.com.br/ws/${values}/json/`
      );
      formik.setFieldValue("logradouro", data.logradouro);
      formik.setFieldValue("bairro", data.bairro);
      formik.setFieldValue("localidade", data.localidade);
      formik.setFieldValue("uf", data.uf);
      formik.setFieldValue("complemento", data.complemento);
      // setFieldValue("bairro", data.bairro);
      // setFieldValue("logradouro", data.logradouro);
      //
      // setFieldValue("localidade", data.localidade);
      // setFieldValue("uf", data.uf);
    } catch (error) {
      console.log("Erro ao tentar acessar a api viacep", error);
    }
  }

  async function choiceUpdateAddress(id: number) {
    try {
      const { data } = await api.get(`endereco/${id}`);
      setIdAddress(id);
      formik.setFieldValue("logradouro", data.logradouro);
      formik.setFieldValue("localidade", data.cidade);
      formik.setFieldValue("uf", data.estado);
      formik.setFieldValue("complemento", data.complemento);
      formik.setFieldValue("numero", data.numero);
      formik.setFieldValue("cep", data.cep);
      formik.setFieldValue("pais", data.pais);
      formik.setFieldValue("tipo", data.tipo);
    } catch (error) {
      console.log("Erro ao tentar acessar api endereço por id", error);
    }
  }

  async function updateAddress() {
    const newAddressData = {
      cep: formik.values.cep,
      cidade: formik.values.localidade,
      complemento: formik.values.complemento,
      estado: formik.values.uf,
      logradouro: formik.values.logradouro,
      pais: formik.values.pais,
      tipo: formik.values.tipo,
      numero: Number(formik.values.numero),
      idEndereco: idAddress,
    };
    try {
      const { data } = await api.put(`/endereco/${idAddress}`, newAddressData);
      Notiflix.Notify.success('Endereço atualizado com sucesso!');
      returnAddress();
    } catch (error) {
      console.log("Deu erro na hora de tentar atualizar o endereço. Afe", error)
      Notiflix.Notify.failure('Sinto muito, mas nao foi possivel criar esse endereço.');
    }
  }

  // const SignupSchema = Yup.object().shape({
  //   logradouro: Yup.string()
  //     .min(2, "muito curto")
  //     .max(50, "muito longo")
  //     .required("Você precisa preencher esse campo"),
  //   cep: Yup.string()
  //     .required("Você precisa preencher esse campo"),
  //   complemento: Yup.string()
  //     .min(1, "Complemento precisa conter alguma coisa.")
  //     .max(50, "Existe mesmo um complemento tão grande assim?")
  //     .required("Você precisa preencher esse campo"),
  //   bairro: Yup.string()
  //     .min(1, "Bairro precisa conter alguma coisa.")
  //     .max(50, "Existe mesmo um bairro tão grande assim?")
  //     .required("Você precisa preencher esse campo"),
  //   localidade: Yup.string()
  //     .min(1, "Cidade precisa conter alguma coisa.")
  //     .max(50, "Existe mesmo uma cidade com nome tão grande assim?")
  //     .required("Você precisa preencher esse campo"),
  //   uf: Yup.string()
  //     .min(2, "UF precisa conter duas letras. Ex: RS")
  //     .max(2, "UF precisa conter duas letras. Ex: RS")
  //     .required("Você precisa preencher esse campo"),
  //   numero: Yup.string()
  //     .max(
  //       15,
  //       "Não tem como o número da sua casa ser maior do que isso, acredite."
  //     )
  //     .required("Você precisa preencher esse campo"),
  //   pais: Yup.string()
  //     .max(
  //       25,
  //       "Llanfairpwllgwyngyll é o maior nome de localidade do mundo e tem 20 letras. Consultei no Google, não me tente."
  //     )
  //     .required("Você precisa preencher esse campo"),
  // });

  return (
    <Container>
      <ContainerInterno>
        <h3>Adicionar novo endereço:</h3>
        <form onSubmit={formik.handleSubmit}>
          <AllFormAddress>
            <FormAddress>
              <LabelInput>
                <label htmlFor="cep">CEP</label>
                <Input
                  id="cep"
                  name="cep"
                  placeholder="00000-000"
                  value={formik.values.cep}
                  onChange={formik.handleChange}
                />
                {/* {props.errors.cep && props.touched.cep ? (
                      <AlertErrorInput>{props.errors.cep}</AlertErrorInput>
                    ) : null} */}

                <Button
                  type="button"
                  color={"gray"}
                  onClick={() => getAddress(formik.values.cep)}
                >
                  Buscar CEP
                </Button>
              </LabelInput>
            </FormAddress>

            <FormAddress>
              <LabelInput>
                <label htmlFor="logradouro">Logradouro</label>
                <Input
                  value={formik.values.logradouro}
                  onChange={formik.handleChange}
                  id="logradouro"
                  name="logradouro"
                  placeholder="Logradouro"
                />
                {/* {props.errors.logradouro && props.touched.logradouro ? (
                      <AlertErrorInput>
                        {props.errors.logradouro}
                      </AlertErrorInput>
                    ) : null} */}
              </LabelInput>

              <LabelInput>
                <label htmlFor="complemento">Complemento</label>
                <Input
                  value={formik.values.complemento}
                  onChange={formik.handleChange}
                  id="complemento"
                  name="complemento"
                  placeholder="Complemento"
                />
                {/* {props.errors.complemento && props.touched.complemento ? (
                      <AlertErrorInput>
                        {props.errors.complemento}
                      </AlertErrorInput>
                    ) : null} */}
              </LabelInput>

              <LabelInput>
                <label htmlFor="bairro">Bairro</label>
                <Input
                  id="bairro"
                  name="bairro"
                  placeholder="Bairro"
                  value={formik.values.bairro}
                  onChange={formik.handleChange}
                />
                {/* {props.errors.bairro && props.touched.bairro ? (
                      <AlertErrorInput>{props.errors.bairro}</AlertErrorInput>
                    ) : null} */}
              </LabelInput>

              <LabelInput>
                <label htmlFor="localidade">Localidade</label>
                <Input
                  value={formik.values.localidade}
                  onChange={formik.handleChange}
                  id="localidade"
                  name="localidade"
                  placeholder="Localidade"
                />
                {/* {props.errors.localidade && props.touched.localidade ? (
                      <AlertErrorInput>
                        {props.errors.localidade}
                      </AlertErrorInput>
                    ) : null} */}
              </LabelInput>

              <LabelInput>
                <label htmlFor="uf">UF</label>
                <Input
                  id="uf"
                  name="uf"
                  placeholder="UF"
                  value={formik.values.uf}
                  onChange={formik.handleChange}
                />
                {/* {props.errors.uf && props.touched.uf ? (
                      <AlertErrorInput>{props.errors.uf}</AlertErrorInput>
                    ) : null} */}
              </LabelInput>

              <LabelInput>
                <label htmlFor="numero">numero</label>
                <Input
                  id="numero"
                  name="numero"
                  placeholder="00"
                  value={formik.values.numero}
                  onChange={formik.handleChange}
                />
                {/* {props.errors.numero && props.touched.numero ? (
                      <AlertErrorInput>{props.errors.numero}</AlertErrorInput>
                    ) : null} */}
              </LabelInput>

              <LabelInput>
                <label htmlFor="tipo">Tipo:</label>
                <Select
                  name="tipo"
                  value={formik.values.tipo}
                  onChange={formik.handleChange}
                >
                  <option value="RESIDENCIAL">RESIDENCIAL</option>
                  <option value="COMERCIAL">COMERCIAL</option>
                </Select>
              </LabelInput>

              <LabelInput>
                <label htmlFor="pais">País</label>
                <Input
                  id="pais"
                  name="pais"
                  placeholder="País"
                  value={formik.values.pais}
                  onChange={formik.handleChange}
                />
                {/* {props.errors.pais && props.touched.pais ? (
                      <AlertErrorInput>{props.errors.pais}</AlertErrorInput>
                    ) : null} */}
              </LabelInput>
            </FormAddress>

            <FormAddress>
              <LabelInput>
                <Button type="submit" color={"#29CC97"}>
                  Cadastrar
                </Button>
                <Button
                  type="button"
                  color={"#b4cc29"}
                  onClick={() => updateAddress()}
                >
                  Atualizar
                </Button>
              </LabelInput>
            </FormAddress>
          </AllFormAddress>
        </form>

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
                onClick={() => choiceUpdateAddress(add.idEndereco)}
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
