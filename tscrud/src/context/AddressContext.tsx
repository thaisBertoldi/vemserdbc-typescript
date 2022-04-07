import axios from "axios";
import { createContext, FC, ReactNode, useEffect, useState } from "react";
import api from "../api";
import { ViaCEPDTO } from "../model/AddressDTO";

export const AddressContext = createContext({});

const AddressProvider: FC<ReactNode> = ({ children }) => {
  const [addressGet, setAddressGet] = useState<any>([]);

  async function getAddress(values: ViaCEPDTO["viaCep"], setFieldValue: any) {
    try {
      const { data } = await axios.get(
        `https://viacep.com.br/ws/${values.cep}/json/`
      );
      setFieldValue("bairro", data.bairro);
      setFieldValue("logradouro", data.logradouro);
      setFieldValue("complemento", data.complemento);
      setFieldValue("localidade", data.localidade);
      setFieldValue("uf", data.uf);
    } catch (error) {
      console.log("Erro ao tentar acessar a api viacep", error);
    }
  }

  async function createAddress(values: ViaCEPDTO["viaCep"]) {
    const addressApi = {
      cep: values.cep,
      cidade: values.localidade,
      complemento: values.complemento,
      estado: values.uf,
      logradouro: values.logradouro,
      numero: parseInt(values.numero),
      pais: values.pais,
      tipo: values.tipo,
    };
    console.log(addressApi)
    try {
      const { data } = await api.post("/endereco/662", addressApi);
      console.log(data);
    } catch (error) {
      console.log("Erro ao tentar criar endereço na api.", error);
    }
  }

  async function returnAddress() {
    try {
      const { data } = await api.get("/endereco");
      setAddressGet(data);
    } catch (error) {
      console.log("Erro ao tentar pegar os endereços cadastrados", error);
    }
  }

  async function updateAddress(id: number){
    console.log(id)
  }

  async function deleteAddress(id: number){
    console.log(id)
  }

  return (
    <AddressContext.Provider
      value={{ getAddress, createAddress, returnAddress, addressGet, deleteAddress, updateAddress }}
    >
      {children}
    </AddressContext.Provider>
  );
};

export default AddressProvider;
