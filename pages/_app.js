import { CartContextProvider } from "@/components/CartContext";
import { SessionProvider } from "next-auth/react";
import { createGlobalStyle } from "styled-components";
import { Helmet } from "react-helmet";

const GlobalStyles = createGlobalStyle`
  body{
    background-color: #eee;
    padding:0;
    margin:0;
    font-family: 'Poppins', sans-serif;
  }
  hr{
    display: block;
    border: 0;
    border-top: 1px solid #ccc;
  }
`;

export default function App({ Component, pageProps: {session, ...pageProps} }) {
  return (
    <>
     <Helmet>
        <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700&display=swap" />
      </Helmet>
      <GlobalStyles/>
      <SessionProvider session={session}>
      <CartContextProvider>
        <Component {...pageProps} />
        </CartContextProvider>
      </SessionProvider>
    </>
  );
}
