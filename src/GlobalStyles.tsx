import { createGlobalStyle } from "styled-components";
import reset from "styled-reset";
const GlobalStyles = createGlobalStyle`
@import url('https://fonts.googleapis.com/css2?family=Source+Sans+Pro:wght@300;400&display=swap');
    ${reset}
    head {
        title {
            color: white
        }
    }
    body {
        font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif ;
        /* font-family: 'Source Sans Pro', sans-serif; */
        background-color:rgba(248, 237, 227,0.8)
    }
    a{
        color: inherit;
        text-decoration: none ;

    }
`;

export default GlobalStyles;
