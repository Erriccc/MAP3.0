import Document, { Head, Html, Main, NextScript, } from 'next/document';


// import Document from 'next/document'
import { ServerStyleSheet } from 'styled-components'

// export default class MyDocument extends Document {
  export default class CustomDocument extends Document {
  
  static async getInitialProps(ctx) {
    const sheet = new ServerStyleSheet()
    const originalRenderPage = ctx.renderPage

    try {
      ctx.renderPage = () =>
        originalRenderPage({
          enhanceApp: (App) => (props) =>
            sheet.collectStyles(<App {...props} />),
        })

      const initialProps = await Document.getInitialProps(ctx)
      return {
        ...initialProps,
        styles: (
          <>
            {initialProps.styles}
            {sheet.getStyleElement()}
          </>
        ),
      }
    } finally {
      sheet.seal()
    }
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





















// class CustomDocument extends Document {
//     static async getInitialProps(ctx) {
//         return Document.getInitialProps(ctx);
//     }
//     render() {
//         return (<Html lang="en-US" dir="ltr" className="light">
//         <Head>
//           <link rel="preconnect" href="https://fonts.googleapis.com"/>
//           <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin/>
//           <link href="https://fonts.googleapis.com/css2?family=Gantari:wght@400;500&display=swap" rel="stylesheet"/>
//           <link href='https://api.tiles.mapbox.com/mapbox-gl-js/v0.53.0/mapbox-gl.css' rel='stylesheet' />
//         </Head>
//         <body>
//           <Main />
//           <NextScript />
//         </body>
//       </Html>);
//     }
// }
// export default CustomDocument;
