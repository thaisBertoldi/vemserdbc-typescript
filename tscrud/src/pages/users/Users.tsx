import { useContext, useEffect } from "react";
import api from "../../api";
import { UserContext } from "../../context/UserContext";
import List from "./List";
import { AllUsersTitle, ContainerList, ContainerPageUsers, TableUsers } from "./Users.styles";

function Users() {
  const { user, getUsers } = useContext<any>(UserContext);
  const getToken = localStorage.getItem("token");

  useEffect(() => {
    if (getToken) {
      api.defaults.headers.common["Authorization"] = getToken;
    }
    getUsers();
  }, []);

  return (
    <ContainerPageUsers>
      <ContainerList>
      <AllUsersTitle>All users</AllUsersTitle>
      <TableUsers>
        <td>Name User</td>
        <td>Birthday</td>
        <td>Cpf</td>
        <td>Email</td>
      </TableUsers>
      <List users={user} />
      </ContainerList>
    </ContainerPageUsers>
  );
}

export default Users;
