import { createGlobalStyle } from 'styled-components';

const GlobalStyles = createGlobalStyle`
html, body, * {
		margin: 0;     
	}
	* {
    
		margin: 0;
		box-sizing: border-box;
		/* overflow-x: hidden; */
		scrollbar-width: thin;
		scrollbar-color: 
			darkgray
			transparent;
		

		&::-webkit-scrollbar {
			width: 5px;
			height: 5px;
		}
		
		&::-webkit-scrollbar-track {
			background-color: transparent;
			border-radius: 10px;
			margin-top: 2px;
			margin-bottom: 2px;
		}
		
		&::-webkit-scrollbar-thumb {
			background-color: darkgray;
			border-radius: 10px;
		}
	}
`;

export default GlobalStyles;
