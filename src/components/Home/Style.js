import React from "react";
import styled from "styled-components";

export const Container = styled.div`
  padding: 0;
  background-color: white;
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen,
    Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;
  color: black;
  height: 600px;
`;
export const ContainerGeral = styled.div`
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  width: 100vw;
  height: 100vh;
`;

export const ContainerFiltro = styled.div`
  display: flex;
  flex-direction: column;
  background-color: white;
  width: 300px;
  height: 80vh;
  padding: 10px;
  margin: 10px;
  border: 1px solid black;
`;

export const CrescenteDecrescente = styled.div`
  display: flex;
  flex-direction: row-reverse;
  background-color: white;
  width: 50vw;
  height: 80px;
  justify-content: space-around;
  align-items: center;
  margin: auto;
`;

export const ContainerCard = styled.div`
  display: flex;
  /*flex-direction: row;*/
  flex-wrap: wrap;

  background-color: white;

  justify-content: space-between;
  align-items: center;
  height: 900px;
`;
export const Card = styled.div`
  flex-direction: column;
  border: 1px solid orange;
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  height: 400px;
  width: 250px;
  margin: 2px;
`;
export const Button = styled.div`
  background-color: black;
  color: white;
  height: 50px;
  width: 10vw;
  text-align: center;
  font-size: small;
  flex-wrap: wrap;
  :hover {
    /*NOVO*/
    background-color: rgb(0, 0, 0, 0.5);
  }
`;

export const ContainerCarrinho = styled.div`
  flex-direction: column;
  background-color: white;
  width: 400px;
  height: 95vh;
  padding: 10px;
  margin: 10px;
  border: 1px solid black;
`;


export const IconeX = styled.strong`
  :hover {
    color: orange;
  }
`;


export const Checkbox = styled.input`
display: inline-block;
margin-left: 10px;
margin-top: 8px;

`

