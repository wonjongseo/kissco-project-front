import GlobalStyles from "./GlobalStyles";
import Routers from "./Routes";
import { QueryClient, QueryClientProvider } from "react-query";
import { RecoilRoot } from "recoil";
import { HelmetProvider } from "react-helmet-async";
const queryClient = new QueryClient();
function App() {
  return (
    <HelmetProvider>
      <QueryClientProvider client={queryClient}>
        <RecoilRoot>
          <GlobalStyles />
          <Routers />
        </RecoilRoot>
      </QueryClientProvider>
    </HelmetProvider>
  );
}

export default App;
