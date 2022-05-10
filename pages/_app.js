import "../styles/globals.css";
import useAuth from "../hooks/useAuth";
import AuthContext from "../context/AuthProvider";

function MyApp({ Component, pageProps }) {
  const user = useAuth();
  return (
    <AuthContext.Provider value={{ user }}>
      <Component {...pageProps} />
    </AuthContext.Provider>
  );
}

export default MyApp;
