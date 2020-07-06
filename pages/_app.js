import '../styles/index.css';
// Div100vh helps solve the height issues I faced when developing across devices and screen sizes
import Div100vh from 'react-div-100vh';

import '../util/analytics';
import '../styles/imageUploader.css';

import { ProvideAuth } from '../util/auth.js';
import { ThemeProvider } from 'styled-components';

import GlobalStyle from '../styles/GlobalStyles';
import theme from '../styles/theme';
import NavigationProvider from '../context/navigation/NavigationProvider';

// Global style to prevent page scrolling while modal open

function MyApp({ Component, pageProps }) {
	return (
		<ThemeProvider theme={theme}>
			<ProvideAuth>
				<NavigationProvider>
					<GlobalStyle />
					<Div100vh>
						<Component {...pageProps} />
					</Div100vh>
				</NavigationProvider>
			</ProvideAuth>
		</ThemeProvider>
	);
}

export default MyApp;
