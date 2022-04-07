import styled from "styled-components";

export const TableAddress = styled.table`
    display: grid;
    grid-template-columns: 15% 11% 11% 11% 11% 11%;
    gap: 10px;
    opacity: 0.5;
`;

export const ListAddress = styled.div`
    width: 100%;
    display: grid;
    grid-template-columns: 15% 11% 11% 11% 11% 11% 10% 10%;
    align-items: center;
    gap: 10px;
    border-top: 1px #DFE0EB solid;
`;

export const ButtonAddress = styled.button`
    background-color: ${(props) => props.color};
    color: #FFFFFF;
    width: 100px;
    height: 35px;
    border-radius: 8px;
    cursor: pointer;
`;