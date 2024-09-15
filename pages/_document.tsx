// pages/_document.js
import Document, { Html, Head, Main, NextScript } from 'next/document';

class MyDocument extends Document {
  render() {
    return (
      <Html>
        <Head>
          {/* Add the Google verification meta tag here */}
          <meta name="google-site-verification" content="oEcLuk4oUWLp6xS78Shf0l2Z06byovirrU1mAW09fTw" />
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
