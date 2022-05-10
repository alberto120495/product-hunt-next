import Link from "next/link";
import styled from "styled-components";
import AuthContext from "../../context/AuthProvider";
import { useContext } from "react";

function Navegacion() {
  const { user } = useContext(AuthContext);

  return (
    <Nav>
      <Link href="/">Inicio</Link>
      <Link href="/populares">Populares</Link>
      {user && <Link href="/nuevo-producto">Nuevo Producto</Link>}
    </Nav>
  );
}

export default Navegacion;

const Nav = styled.nav`
  padding-left: 2rem;

  a {
    font-size: 1.8rem;
    margin-left: 2rem;
    color: var(--gris2);
  }

  &:hover {
    cursor: pointer;
  }

  &::last-of-type {
    margin-right: 0;
  }
`;
