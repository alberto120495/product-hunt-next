const validarCrearProducto = (valores) => {
  const errores = {};
  if (!valores.nombre) {
    errores.nombre = "El nombre es obligatorio";
  }
  if (!valores.empresa) {
    errores.empresa = "El nombre de Empresa es obligatorio";
  }

  if (!valores.url) {
    errores.url = "La url es obligatoria";
  } else if (!/^(ftp|http|https):\/\/[^ "]+$/.test(valores.url)) {
    errores.url = "La url no es válida";
  }

  if (!valores.descripcion) {
    errores.descripcion = "La descripción es obligatoria";
  }

  return errores;
};

export default validarCrearProducto;
