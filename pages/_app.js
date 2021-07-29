import "../styles/globals.css";
import {authSecondary} from "../BD/conf";
import Head from "next/head";
import { useState } from "react";
import Login from "./Login";
import Menu from "./Components/Menu"
 function MyApp({ Component, pageProps }) {
  const [userName, setuserName] = useState(null);
  return (
    <>
      <Head>
        <title>Sistema de Gestion de Inventario</title>
      </Head>
      {authSecondary.onAuthStateChanged((user) => 
          setuserName(user)
        )
      }
      {userName ? (
         <Menu>
          <Component {...pageProps} />
         </Menu>
      ) : (
        <Login />
      )}
    </>
  );
}

export default MyApp;