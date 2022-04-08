import styled from "styled-components";

export const ContainerPageUsers = styled.div`
  @import url("https://fonts.googleapis.com/css2?family=Mulish:ital,wght@0,400;0,700;1,400&display=swap");
  font-family: Mulish, sans-serif;
  background-color: #e5e5e5;
  display: flex;
  justify-content: center;
  min-width: 85%;
`;

export const ContainerList = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 1122px;
  margin-top: 128px;
  background-color: #ffffff;
  border-radius: 8px;
  padding: 15px;
`;

export const ListUsers = styled.div`
  display: grid;
  grid-template-columns: 20% 10% 10% 20% 10% 10%;
  border-top: 1px #dfe0eb solid;
  gap: 45px;
`;

export const TableUsers = styled.div`
  display: grid;
  grid-template-columns: 20% 10% 10% 20% 10% 10%;
  opacity: 0.5;
  gap: 45px;
`;

export const AllUsersTitle = styled.h3`
  padding: 32px 0;
`;

export const FormNewUser = styled.div`
  max-width: 800px;
  margin: 0 auto;
  border-top: 1px solid rgb(214, 214, 214);
  display: flex;
  flex-direction: column;
  padding-top: 5px;

`;

export const ButtonCadastrar = styled.button`
  border: none;
  padding: 1% 0;
  color: white;
  font-weight: bold;
  border-radius: 5px;
  cursor: pointer;
`;
