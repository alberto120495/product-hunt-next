import { useState } from "react";
import Layout from "../components/layout/Layout";
import {
  Formulario,
  Campo,
  InputSubmit,
  Error,
} from "../components/ui/Formulario";
import useValidacion from "../hooks/useValidacion";
import validarCrearCuenta from "../hooks/helpers/validarCrearCuenta";
import { auth, createUserWithEmailAndPassword } from "../firebase/config";
import { updateProfile } from "firebase/auth";
import Router from "next/router";

function CrearCuenta() {
  const stateInicial = {
    nombre: "",
    email: "",
    password: "",
  };
  const [error, setError] = useState(false);

  const { handleChange, handleSubmit, valores, errores, handleBlur } =
    useValidacion(stateInicial, validarCrearCuenta, crearCuenta);

  const { nombre, email, password } = valores;

  async function crearCuenta() {
    try {
      const response = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );

      await updateProfile(auth.currentUser, { displayName: nombre });

      Router.push("/");
      return response;
    } catch (error) {
      setError(error.message);
    }
  }

  return (
    <>
      <Layout pagina="Crear Cuenta">
        <h1 className="titulo">Crear Cuenta</h1>
        <Formulario onSubmit={handleSubmit}>
          <Campo>
            <label htmlFor="nombre">Nombre</label>
            <input
              type="text"
              id="nombre"
              name="nombre"
              placeholder="Tu Nombre"
              value={nombre}
              onChange={handleChange}
              onBlur={handleBlur}
            />
          </Campo>
          {errores.nombre && <Error>{errores.nombre}</Error>}

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

          <InputSubmit type="submit" value="Crear Cuenta" />
        </Formulario>
      </Layout>
    </>
  );
}

export default CrearCuenta;
