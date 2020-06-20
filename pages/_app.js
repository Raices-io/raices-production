import React, { useEffect } from "react";
import "../styles/index.css";
import "../util/analytics";
import Head from "next/head";
import Router from "next/router";
import { ProvideAuth } from "../util/auth.js";
import "../styles/imageUploader.css";
// Div100vh helps solve the height issues I faced when developing across devices and screen sizes
import Div100vh from "react-div-100vh";
import { createGlobalStyle, ThemeProvider } from "styled-components";
import Layout from '../components/Layout';

// Global style to prevent page scrolling while modal open
const GlobalStyle = createGlobalStyle`
	@import url("https://use.typekit.net/hcg0pwq.css");

	html, body {
		margin: 0; 
		height: 100%; 
	}
	/* Hide those nasty nasty scrollbars */

	/* ::-webkit-scrollbar {
		display: none;
	} */
`;
const theme = {
  color100: "#EBF4FF",
  color200: "#C3DAFE",
  color300: "#A3BFFA",
  color400: "#7F9CF5",
  color500: "#667EEA",
  color600: "#5A67D8",
  color700: "#4C51BF",
  color800: "#434190",
  color900: "#3C366B",
};

function MyApp({ Component, pageProps }) {
  return (
    <ThemeProvider theme={theme}>
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
    </ThemeProvider>
  );
}

export default MyApp;
