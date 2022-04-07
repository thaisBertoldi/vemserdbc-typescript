import { useContext, useEffect, useState } from "react";
import api from "../../api";
import Error from "../../components/error/Error";
import Loading from "../../components/loading/Loading";
import { UserContext } from "../../context/UserContext";
import List from "./List";
import {
  AllUsersTitle,
  ContainerList,
  ContainerPageUsers,
  TableUsers,
} from "./Users.styles";

function Users() {
  const { user, getUsers, loading, error } = useContext<any>(UserContext);
  const getToken = localStorage.getItem("token");

  useEffect(() => {
    if (getToken) {
      api.defaults.headers.common["Authorization"] = getToken;
    }
    getUsers();
  }, []);

  if (error) {
    return <Error />;
  }
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
        {loading && <Loading />}
        {!loading && <List users={user} />}
      </ContainerList>
    </ContainerPageUsers>
  );
}

export default Users;
