import React, { useEffect } from "react";
import "../styles/index.css";
import "../util/analytics";
import Head from "next/head";
import Router from "next/router";
import { ProvideAuth } from "../util/auth.js";
import "../styles/imageUploader.css";
// Div100vh helps solve the height issues I faced when developing across devices and screen sizes
import Div100vh from "react-div-100vh";
import { createGlobalStyle } from "styled-components";

// Global style to prevent page scrolling while modal open
const GlobalStyle = createGlobalStyle`
  html, body {margin: 0; height: 100%; overflow: hidden}
  /* Hide those nasty nasty scrollbars */
  ::-webkit-scrollbar {
    display: none;
  }
`;

function MyApp({ Component, pageProps }) {
  useEffect(() => {
    const handleRouteChange = (url) => {
      gtag.pageview(url);
    };
    Router.events.on("routeChangeComplete", handleRouteChange);
    return () => {
      Router.events.off("routeChangeComplete", handleRouteChange);
    };
  }, []);
  return (
    <ProvideAuth>
      <Head>
        {/* Dev gtm: GTM-TXBVQV6 */}
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
              new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
              'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
              })(window,document,'script','dataLayer','${
                process.env.ENV == "production" ? "GTM-WGRFWGT" : "GTM-TXBVQV6"
              }');`,
          }}
        />
      </Head>
      <GlobalStyle />
      <Div100vh>
        <Component {...pageProps} />
      </Div100vh>
    </ProvideAuth>
  );
}

export default MyApp;
