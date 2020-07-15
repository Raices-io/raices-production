import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
    * {
        margin: 0;
        padding: 0;
        box-sizing: border-box;
        text-decoration: none;
        list-style: none;
        color: #333;

        font-family: system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", "Roboto", "Oxygen", "Ubuntu", "Cantarell", "Fira Sans", "Droid Sans", "Helvetica Neue", sans-serif;
    
        h1, h2, h3, h4, h5, h6 {
            font-family: futura-pt,sans-serif;
            font-weight: 600;
            font-style: normal;
        }

        html {font-size: 100%;} /*16px*/

        body {
            background-color: white;
            font-weight: 400;
            line-height: 1.65;
            color: #333;
        }

        p, a {margin-bottom: 1.15rem;}

        a {
            display: block;
            &:hover {
                text-decoration: underline;
            }
        }

        h1, h2, h3, h4, h5 {
            margin: 2.75rem 0 1.05rem;
            font-weight: 400;
            line-height: 1.15;
        }

        h1 {
            margin-top: 0;
            font-size: 3.052em;
        }

        h2 {font-size: 2.441em;}

        h3 {font-size: 1.953em;}

        h4 {font-size: 1.563em;}

        h5 {font-size: 1.25em;}
    }
`;

export default GlobalStyle;
