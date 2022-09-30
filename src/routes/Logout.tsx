import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSetRecoilState } from "recoil";
import { userIdVar } from "../atoms";

export const LOGOUT_PATH = "/logout";

const Logout = () => {
  const setUserId = useSetRecoilState(userIdVar);
  const nav = useNavigate();
  useEffect(() => {
    setUserId(null);
    sessionStorage.removeItem("userId");
    nav("/");
  });
  return <div>Logout</div>;
};

export default Logout;
