import Buscar from "../ui/Buscar";
import Navegacion from "./Navegacion";
import Link from "next/link";
import styled from "styled-components";
import Boton from "../ui/Boton";
function Header() {
  const user = false;
  return (
    <header>
      <ContenedorHeader>
        <div className="logo">
          <Link href="/">
            <Logo>P</Logo>
          </Link>
          <Buscar />
          <Navegacion />
        </div>

        <div className="botones-container">
          {user ? (
            <>
              <p className="parrafo">Hola: Alberto</p>
              <Boton bgColor={true}>Cerrar Sesion</Boton>
            </>
          ) : (
            <>
              <Link href="/login">
                <Boton bgColor={true}>Iniciar Sesion</Boton>
              </Link>
              <Link href="/crear-cuenta">
                <Boton>Crear Cuenta</Boton>
              </Link>
            </>
          )}
        </div>
      </ContenedorHeader>
    </header>
  );
}

const ContenedorHeader = styled.div`
  max-width: 1200px;
  width: 95%;
  margin: 0 auto;

  @media (min-width: 768px) {
    display: flex;
    justify-content: space-between;
  }
`;

const Logo = styled.p`
  color: var(--naranja);
  font-size: 4rem;
  line-height: 0;
  font-weight: 700;
  margin-right: 2rem;
  cursor: pointer;
`;

export default Header;
