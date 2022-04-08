import styled from "styled-components";

export const ContainerPageAddress = styled.div`
  @import url("https://fonts.googleapis.com/css2?family=Mulish:ital,wght@0,400;0,700;1,400&display=swap");
  font-family: Mulish, sans-serif;
  background-color: #e5e5e5;
  display: flex;
  flex-direction: column;
  justify-content: center;
  min-width: 85%;
`;

export const ContainerAddress = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 1122px;
  margin-top: 128px;
  margin-left: 60px;
  background-color: #ffffff;
  border-radius: 8px;
  padding: 15px;
`;

export const TableAddress = styled.div`
  display: grid;
  grid-template-columns: 20% 11% 11% 11% 11% 11%;
  gap: 10px;
  opacity: 0.5;
`;

export const ListAddress = styled.div`
  display: grid;
  grid-template-columns: 20% 11% 11% 11% 11% 11% 10% 10%;
  align-items: center;
  gap: 10px;
  border-top: 1px #dfe0eb solid;
`;

export const ButtonAddress = styled.button`
  background-color: ${(props) => props.color};
  color: #ffffff;
  width: 100px;
  height: 35px;
  border-radius: 8px;
  cursor: pointer;
`;

export const AllFormAddress = styled.div`
  display: grid;
  grid-template-columns: auto;
  border: 1px black dashed;
  background-color: #E5E5E5;
  padding: 50px;
  gap: 30px;
`;

export const FormAddress = styled.div`
  display: grid;
  grid-template-columns: auto auto;
  justify-content: center;
  gap: 10px;
`;

export const LabelInput = styled.div`
  display: flex;
  flex-direction: row;
  gap: 10px;
  align-items: center;
  justify-content: space-between;
`;

export const AlertErrorInput = styled.p`
  color: red;
`;

export const Input = styled.input`
    width: 200px;
    height: 30px;
    border-radius: 4px;
    border: 1px #E5E5E5 solid;
`;

export const Select = styled.select`
    width: 207px;
    height: 30px;
    border-radius: 4px;
    border: 1px #E5E5E5 solid;
`;