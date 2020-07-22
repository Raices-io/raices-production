import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
    * {
        margin: 0;
        padding: 0;
        box-sizing: border-box;
        text-decoration: none;
        list-style: none;

        font-family: "Open Sans", system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", "Roboto", "Oxygen", "Ubuntu", "Cantarell", "Fira Sans", "Droid Sans", "Helvetica Neue", sans-serif;
    
        h1, h2, h3, h4, h5, h6 {
            font-family: 'Poppins',sans-serif;
            font-weight: 600;
            font-style: normal;
        }

        html {font-size: 100%;} /*16px*/

        body {
            background-color: white;
            font-weight: 400;
            line-height: 1.65;
        }

        p, a {margin-bottom: 1.15rem; line-height: 1.5;}

        a {
            display: block;
            &:hover {
                text-decoration: underline;
            }
        }

        h1, h2, h3, h4, h5 {
            margin-bottom: 2rem;
            font-weight: 500;
            line-height: 1.5;
        }

        h1 {
            font-size: 3.052em;
        }

        h2 {font-size: 2.441em;}

        h3 {font-size: 1.953em;}

        h4 {font-size: 1.563em;}

        h5 {font-size: 1.25em;}
    }
`;

export default GlobalStyle;
