import { useEffect, useState } from "react";
import { auth } from "../firebase/config";

const useAuth = () => {
  const [usuarioAutenticado, setUsuarioAutenticado] = useState(null);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        setUsuarioAutenticado(user);
      } else {
        setUsuarioAutenticado(null);
      }
    });
    return () => unsubscribe;
  }, []);

  return usuarioAutenticado;
};

export default useAuth;
