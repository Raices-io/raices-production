import { ThemeProvider } from "styled-components";
import { gsap } from "gsap/dist/gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";

import theme from "../styles/theme";
import GlobalStyle from "../styles/GlobalStyles";
import SideNavProvider from "../contexts/SideNavContext/SideNavProvider";

gsap.registerPlugin(ScrollTrigger);

export default function MyApp({ Component, pageProps }) {
	return (
		<ThemeProvider theme={theme}>
			<SideNavProvider>
				<GlobalStyle />
				<Component {...pageProps} />
			</SideNavProvider>
		</ThemeProvider>
	);
}
