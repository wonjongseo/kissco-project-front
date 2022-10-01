import { BASE_URL } from "../api";
import axios from "axios";
import { IJoinForm } from "../routes/Join";
import { ILoginForm } from "../routes/Login";

export const postLogin = async ({ email, password }: ILoginForm) => {
  const new_url = `${BASE_URL}/api/login`;

  const response = await axios.post(new_url, {
    email,
    password,
  });
  return response;
  // const data = response.data;

  // return data;
};

export const postJoin = async ({
  email,
  password,
  password2,
  username,
}: IJoinForm) => {
  const new_url = `${BASE_URL}/api/join`;

  const response = await axios.post(new_url, {
    email,
    password,
    password2,
    username,
  });

  console.log(response);

  const data = response.data;

  return data;
};
