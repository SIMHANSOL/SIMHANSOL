import "../styles/_global.scss";
import "bootstrap/dist/css/bootstrap.css";

import type { AppProps } from "next/app";
import Head from "next/head";
import { ContextProvider } from "../contexts/context";
import { prefix } from "../configs";

if (typeof window !== "undefined") {
  window.bootstrap = require("bootstrap/dist/js/bootstrap.bundle.js");
}

declare global {
  interface Window {
    bootstrap: NodeRequire;
  }
}

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <title>Sim Hansol</title>
      </Head>
      <ContextProvider value={{ prefix: prefix }}>
        <Component {...pageProps} />
      </ContextProvider>
    </>
  );
}

export default MyApp;
