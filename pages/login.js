import { useState } from "react";
import Layout from "../components/layout/Layout";
import {
  Formulario,
  Campo,
  InputSubmit,
  Error,
} from "../components/ui/Formulario";
import useValidacion from "../hooks/useValidacion";
import validarIniciarSesion from "../hooks/helpers/validarIniciarSesion";
import { auth, signInWithEmailAndPassword } from "../firebase/config";
import Router from "next/router";

function Login() {
  const stateInicial = {
    email: "",
    password: "",
  };
  const [error, setError] = useState(false);

  const { handleChange, handleSubmit, valores, errores, handleBlur } =
    useValidacion(stateInicial, validarIniciarSesion, iniciarSesion);

  const { email, password } = valores;

  async function iniciarSesion() {
    try {
      const response = await signInWithEmailAndPassword(auth, email, password);
      Router.push("/");
      return response;
    } catch (error) {
      setError(error.message);
    }
  }
  return (
    <>
      <Layout pagina="Login">
        <h1 className="titulo">Login</h1>
        <Formulario onSubmit={handleSubmit}>
          <Campo>
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              placeholder="Tu email"
              value={email}
              onChange={handleChange}
              onBlur={handleBlur}
            />
          </Campo>
          {errores.email && <Error>{errores.email}</Error>}

          <Campo>
            <label htmlFor="password">Contraseña</label>
            <input
              type="password"
              id="password"
              name="password"
              placeholder="Password"
              value={password}
              onChange={handleChange}
              onBlur={handleBlur}
            />
          </Campo>
          {errores.password && <Error>{errores.password}</Error>}

          {error && <Error>{error}</Error>}

          <InputSubmit type="submit" value="Iniciar Sesion" />
        </Formulario>
      </Layout>
    </>
  );
}

export default Login;
