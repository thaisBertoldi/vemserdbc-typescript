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
    grid-template-columns: 40% 20% 20% 20%;
    border-top: 1px #DFE0EB solid;
`;

export const TableUsers = styled.table`
    display: grid;
    grid-template-columns: 40% 20% 20% 20%;
    opacity: 0.5;
`;

export const AllUsersTitle = styled.h3`
    padding: 32px 0;
`;