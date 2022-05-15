import { useState, useEffect } from "react";
import { db } from "../firebase/config";
import { collection, orderBy, query, onSnapshot } from "@firebase/firestore";

function useProductos(orden) {
  const [productos, setProductos] = useState([]);

  useEffect(() => {
    const obtenerProductos = async () => {
      onSnapshot(
        query(collection(db, "productos"), orderBy(orden, "desc")),
        (snapshot) => {
          setProductos(
            snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }))
          );
        }
      );
    };
    obtenerProductos();
  }, []);

  return { productos };
}

export default useProductos;
