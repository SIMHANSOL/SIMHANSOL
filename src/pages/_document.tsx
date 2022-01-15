import Document, { Html, Head, Main, NextScript } from "next/document";
import { prefix } from "../configs";

class MyDocument extends Document {
  static async getInitialProps(ctx: any) {
    const initialProps = await Document.getInitialProps(ctx);
    return { ...initialProps };
  }

  render() {
    return (
      <Html>
        <Head>
          <meta name="description" content="Sim Hansol" />
          <meta name="og:title" content="Sim Hansol" />
          <meta name="og:description" content="심한솔 사이트" />
          <link rel="icon" href={`${prefix}/favicon.ico`} />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;
