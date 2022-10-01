import { useForm } from "react-hook-form";
import { useLocation, useNavigate } from "react-router-dom";
import { useRecoilState, useResetRecoilState, useSetRecoilState } from "recoil";
import styled from "styled-components";
import { userIdVar } from "../atoms";
import { postLogin } from "../api/auth_api";
import AuthButton from "../components/auth/AuthBotton";
import AuthForm from "../components/auth/AuthForm";
import AuthInput from "../components/auth/AuthInput";
import Container from "../components/Container";
import Error from "../components/Error";
import { useEffect } from "react";

export const LOGIN_PATH = "/login";

const Title = styled.h1`
  font-size: 38px;
  font-weight: 700;
`;

export interface ILoginForm {
  email: string;
  password: string;
  result?: string;
}

interface IState {
  email?: string;
  password?: string;
}
const Login = () => {
  const { state } = useLocation();
  console.log(state);

  const { register, handleSubmit, setError, formState, setFocus } =
    useForm<ILoginForm>({
      defaultValues: { email: state?.email, password: state?.password },
    });
  const nav = useNavigate();

  const setUserId = useSetRecoilState(userIdVar);

  useEffect(() => {
    setFocus("email");
  }, [setFocus]);

  const onValid = async (inputs: ILoginForm) => {
    try {
      const response = await postLogin(inputs);
      const data = response.data;
      sessionStorage.setItem("userId", data.id);
      setUserId(data.id);
      nav("/");
    } catch (e: any) {
      console.log(e.response.data.message);
      setError("result", { message: e.response.data.message });
      nav(0);
    }
  };
  return (
    <Container title="Login">
      <Title>로그인</Title>

      <AuthForm onSubmit={handleSubmit(onValid)}>
        {formState.errors.result && (
          <Error message={formState.errors.result?.message} />
        )}
        <AuthInput {...register("email")} placeholder="email" />
        <AuthInput
          type={"password"}
          {...register("password")}
          placeholder="password"
        />
        <AuthButton>로그인</AuthButton>
      </AuthForm>
    </Container>
  );
};

export default Login;
