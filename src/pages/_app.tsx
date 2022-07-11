import "../styles/_global.scss";

import type { AppProps } from "next/app";
import Head from "next/head";
import { PrefixProvider } from "../contexts";
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
        <title>한솔 박스</title>
      </Head>
      <PrefixProvider value={{ prefix: prefix }}>
        <Component {...pageProps} />
      </PrefixProvider>
    </>
  );
}

export default MyApp;
