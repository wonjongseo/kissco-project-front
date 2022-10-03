import GlobalStyles from "./GlobalStyles";
import Routers from "./Routes";
import { useRecoilState } from "recoil";
import { HelmetProvider } from "react-helmet-async";
import { ThemeProvider } from "styled-components";
import { windowWidthVar } from "./atoms";
import { lessThen1000, moreThen1000 } from "./theme";
import { useEffect } from "react";
import { ReactQueryDevtools } from "react-query/devtools";
function App() {
  const [width, setWidth] = useRecoilState(windowWidthVar);
  console.log(width);

  const handleResize = () => {
    setWidth(window.innerWidth);
  };

  useEffect(() => {
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  });
  return (
    <HelmetProvider>
      <ThemeProvider theme={+width < 600 ? lessThen1000 : moreThen1000}>
        <GlobalStyles />
        <Routers />
      </ThemeProvider>
      <ReactQueryDevtools initialIsOpen={true} />
    </HelmetProvider>
  );
}

export default App;
