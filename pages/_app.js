import React from 'react';
import '../styles/index.css';
import '../util/analytics';
import { ProvideAuth } from '../util/auth.js';
import '../styles/imageUploader.css';
// Div100vh helps solve the height issues I faced when developing across devices and screen sizes
import Div100vh from 'react-div-100vh';
import { createGlobalStyle } from 'styled-components';

// Global style to prevent page scrolling while modal open
const GlobalStyle = createGlobalStyle`
  html, body {margin: 0; height: 100%; overflow: hidden}
  /* Hide those nasty nasty scrollbars */
  ::-webkit-scrollbar {
    display: none;
  }
`;

function MyApp({ Component, pageProps }) {
	return (
		<ProvideAuth>
			<GlobalStyle />
			<Div100vh>
				<Component {...pageProps} />
			</Div100vh>
		</ProvideAuth>
	);
}

export default MyApp;
