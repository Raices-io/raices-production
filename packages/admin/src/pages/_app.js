import React from 'react';
import '../styles/index.css';
import '../util/analytics';
import { ProvideAuth } from '../util/auth.js';
import GlobalStyles from '../styles/GlobalStyles';

function MyApp({ Component, pageProps }) {
	return (
		<ProvideAuth>
			<GlobalStyles />
			<Component {...pageProps} />
		</ProvideAuth>
	);
}

export default MyApp;
