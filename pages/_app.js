import React from "react";
import "../styles/index.css";
import "../util/analytics";
import { ProvideAuth } from "../util/auth.js";
import "../styles/imageUploader.css";
// Div100vh helps solve the height issues I faced when developing across devices and screen sizes
import Div100vh from "react-div-100vh";
import { createGlobalStyle, ThemeProvider } from "styled-components";

// Global style to prevent page scrolling while modal open
const GlobalStyle = createGlobalStyle`
  html, body {margin: 0; height: 100vh; overflow: hidden}

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
        <GlobalStyle />
        <Div100vh>
          <Component {...pageProps} />
        </Div100vh>
      </ProvideAuth>
    </ThemeProvider>
  );
}

export default MyApp;
