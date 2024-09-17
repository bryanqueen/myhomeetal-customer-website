// pages/_document.js
import Document, { Html, Head, Main, NextScript } from 'next/document';

class MyDocument extends Document {
  render() {
    return (
      <Html>
        <Head>
          {/* Add the Google verification meta tag here */}
          <meta name="google-site-verification" content="xY6atIcfgkBRJeb0a4RqeJCghSo1oxL93JS1eV8GxKk" />
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
