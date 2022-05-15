import Head from "next/head";
import Header from "./Header";
function Layout({ children, pagina }) {
  return (
    <>
      <Head>
        <title>Hunt - {pagina}</title>
        <meta name="description" content="Sitio Web de Product Hunt" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossoorigin />
        <link
          rel="stylesheet"
          href="https://necolas.github.io/normalize.css/8.0.1/normalize.css"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Commissioner:wght@400;700&family=Lato:wght@400;700;900&family=Roboto:wght@300;400;500;700&display=swap"
          rel="stylesheet"
        />
        <link rel="stylesheet" href="css/app.css" />
      </Head>

      <Header />

      <main className="contenedor">{children}</main>
    </>
  );
}

export default Layout;
