import Router from "next/router";
import { useState } from "react";
import styled from "styled-components";
function Buscar() {
  const [busqueda, setBusqueda] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    if (busqueda.trim() === "") return;

    Router.push({
      pathname: "/buscar",
      query: { q: busqueda },
    });
  };
  return (
    <form onSubmit={handleSubmit}>
      <InputText
        type="text"
        placeholder="Buscar Productos"
        value={busqueda}
        onChange={(e) => setBusqueda(e.target.value)}
      />
      <InputSubmit type="submit">Buscar</InputSubmit>
    </form>
  );
}

export default Buscar;

const InputText = styled.input`
  min-width: 300px;
  height: 40px;
  border: 1px solid var(--gris3);
  border-radius: 5px;
  padding: 1rem;
  font-size: 14px;
  color: #333;
  outline: none;
  transition: all 0.3s ease;
`;

const InputSubmit = styled.button`
  width: 3rem;
  height: 3rem;
  display: block;
  background-size: 4rem;
  background-image: url("/img/buscar.png");
  background-repeat: no-repeat;
  position: absolute;
  right: 1rem;
  top: 1px;
  background-color: white;
  border: none;
  cursor: pointer;
  text-indent: -9999px;
`;
