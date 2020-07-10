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

import { DefaultSeo } from 'next-seo';
// Global style to prevent page scrolling while modal open

function MyApp({ Component, pageProps }) {
	return (
		<ThemeProvider theme={theme}>
			<DefaultSeo
				openGraph={{
					title: 'Raíces - Una mejor forma de comprar una propiedad',
					description:
						'Encuentra tu próximo hogar. Conecta directamente con agentes. Sin contratiempos.',
					type: 'website',
					locale: 'es_CO',
					url: 'https://www.raices.io/',
					site_name: 'Raíces',
					images: [
						{
							url:
								'https://firebasestorage.googleapis.com/v0/b/raices-production.appspot.com/o/images%2FhomeImages%2FxwZEFnJHe5tdSo2PMCIU%2F4-4.JPG?alt=media&token=7915f82d-9610-4a12-bc8b-a5d2ed84862d',
							width: 800,
							height: 600,
							alt: 'Apto en El Retiro',
						},
					],
				}}
				// twitter={{
				// 	handle: '@handle',
				// 	site: '@site',
				// 	cardType: 'summary_large_image',
				// }}
			/>
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
