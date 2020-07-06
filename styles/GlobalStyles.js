import { createGlobalStyle } from 'styled-components';
import colors from '../util/colors';

const GlobalStyle = createGlobalStyle`

	* {
		scrollbar-width: thin;
		scrollbar-color: #A0AEC0;
		scroll-behavior: smooth;

		scrollbar-color: #A0AEC0 transparent;

		&::-webkit-scrollbar {
		width: 5px;
		height: 5px;
		}

		&::-webkit-scrollbar-track {
		border-radius: 10px;
		margin-top: 2px;
		margin-bottom: 2px;
		}

		&::-webkit-scrollbar-thumb {
		background-color: #A0AEC0;
		border-radius: 10px;
		}

		font-family: 'Open Sans', sans-serif;
	}

	*:focus, *:active, *::selection {
		outline: none;
	}

	html, body {
		margin: 0; 
		height: 100%; 
	}

	h1, h2, h3, h4, h5, h6 {
		font-family: 'Poppins', sans-serif;
		font-weight: 600;
		color: ${colors('text.primary')}
	}

	input[type='search']::-webkit-search-decoration,
	input[type='search']::-webkit-search-cancel-button,
	input[type='search']::-webkit-search-results-button,
	input[type='search']::-webkit-search-results-decoration {
		display: none;
	}
`;

export default GlobalStyle;
