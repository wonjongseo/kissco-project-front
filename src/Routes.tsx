import { useEffect } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { useSetRecoilState } from "recoil";
import { windowWidthVar } from "./atoms";
import Home from "./routes/Home";
import Join, { JOIN_PATH } from "./routes/Join";
import Login, { LOGIN_PATH } from "./routes/Login";
import Logout, { LOGOUT_PATH } from "./routes/Logout";
import Words, { WORDS_PATH } from "./routes/Words";

const Routers = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path={JOIN_PATH} element={<Join />} />
        <Route path={LOGIN_PATH} element={<Login />} />
        <Route path={LOGOUT_PATH} element={<Logout />} />
        <Route
          path={`${WORDS_PATH}/:page/:sort/:is_known/*`}
          element={<Words />}
        />
      </Routes>
    </BrowserRouter>
  );
};

export default Routers;
