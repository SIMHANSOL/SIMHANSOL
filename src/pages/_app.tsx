import "../styles/_global.scss";

import type { AppProps } from "next/app";
import Head from "next/head";
import { PrefixProvider } from "../contexts";
import { prefix } from "../configs";

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
