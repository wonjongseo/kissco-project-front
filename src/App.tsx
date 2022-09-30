import GlobalStyles from "./GlobalStyles";
import Routers from "./Routes";
import { QueryClient, QueryClientProvider } from "react-query";
import { RecoilRoot } from "recoil";

const queryClient = new QueryClient();
function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <RecoilRoot>
        <GlobalStyles />
        <Routers />
      </RecoilRoot>
    </QueryClientProvider>
  );
}

export default App;
