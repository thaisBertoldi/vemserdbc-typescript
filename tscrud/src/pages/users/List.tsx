import moment from "moment";
import { useContext } from "react";
import { UserContext } from "../../context/UserContext";
import { UsersDTO } from "../../model/UsersDTO";
import { Button } from "../AllPages.styles";
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
          <Button type='button' color={'green'} onClick={() => updateUser(u.idPessoa)}>Atualizar</Button>
            <Button type='button' color={'red'} onClick={() => deleteUser(u.idPessoa)}>Deletar</Button>
        </ListUsers>
      ))}
    </>
  );
}

export default List;
