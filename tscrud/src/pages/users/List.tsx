import moment from "moment";
import { useContext } from "react";
import { UserContext } from "../../context/UserContext";
import { UsersDTO } from "../../model/UsersDTO";
import { ButtonAddress } from "../address/Address.styles";
import { ListUsers } from "./Users.styles";

function List({ users }: UsersDTO) {
  const {updateUser, deleteUser} = useContext<any>(UserContext);
  const formatarCPF = (cpf: string) => {
    return cpf.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, "$1.$2.$3-$4");
  };

  return (
    <>
      {users.map((u) => (
        <ListUsers key={u.idPessoa}>
          <div>
            <h4>{u.nome}</h4>
          </div>
          <div>
            <p>{moment(u.dataNascimento).format("DD/MM/YYYY")}</p>
          </div>
          <div>
            <p>{formatarCPF(u.cpf)}</p>
          </div>
          <div>
            <p>{u.email}</p>
          </div>
          <ButtonAddress type='button' color={'green'} onClick={() => updateUser(u.idPessoa)}>Atualizar</ButtonAddress>
            <ButtonAddress type='button' color={'red'} onClick={() => deleteUser(u.idPessoa)}>Deletar</ButtonAddress>
        </ListUsers>
      ))}
    </>
  );
}

export default List;
