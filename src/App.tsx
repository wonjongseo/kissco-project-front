import GlobalStyles from "./GlobalStyles";
import Routers from "./Routes";
import { QueryClient, QueryClientProvider } from "react-query";
import { RecoilRoot, useRecoilState, useSetRecoilState } from "recoil";
import { HelmetProvider } from "react-helmet-async";
import { ThemeProvider } from "styled-components";
import { windowWidthVar } from "./atoms";
import { lessThen1000, moreThen1000 } from "./theme";
import { useEffect } from "react";
const queryClient = new QueryClient();
function App() {
  // const setWidth = useSetRecoilState(windowWidthVar);
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
      <QueryClientProvider client={queryClient}>
        <ThemeProvider theme={+width >= 1000 ? moreThen1000 : lessThen1000}>
          <GlobalStyles />
          <Routers />
        </ThemeProvider>
      </QueryClientProvider>
    </HelmetProvider>
  );
}

export default App;
