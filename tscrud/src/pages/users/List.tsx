import moment from "moment";
import { UsersDTO } from "../../model/UsersDTO";
import { ListUsers } from "./Users.styles";

function List({ users }: UsersDTO) {

  const formatarCPF = (cpf: string) => {
    return cpf.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, "$1.$2.$3-$4")
  }

  return (
    <>
      {users.map((u) => (
        <ListUsers>
          <div>
            <h4>{u.nome}</h4>
          </div>
          <div>
            <p>{moment(u.dataNascimento).format('DD/MM/YYYY')}</p>
          </div>
          <div>
            <p>{formatarCPF(u.cpf)}</p>
          </div>
          <div>
            <p>{u.email}</p>
          </div>
        </ListUsers>
      ))}
    </>
  );
}

export default List;
