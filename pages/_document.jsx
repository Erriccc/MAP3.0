import Document, { Head, Html, Main, NextScript, } from 'next/document';


class CustomDocument extends Document {
    static async getInitialProps(ctx) {
        return Document.getInitialProps(ctx);
    }
    render() {
        return (<Html lang="en-US" dir="ltr" className="light">
        <Head>
          <link rel="preconnect" href="https://fonts.googleapis.com"/>
          <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin/>
          <link href="https://fonts.googleapis.com/css2?family=Gantari:wght@400;500&display=swap" rel="stylesheet"/>
          <link href='https://api.tiles.mapbox.com/mapbox-gl-js/v0.53.0/mapbox-gl.css' rel='stylesheet' />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>);
    }
}
export default CustomDocument;
