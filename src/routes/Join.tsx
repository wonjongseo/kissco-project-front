import { useEffect } from "react";
import { useForm } from "react-hook-form";
import styled from "styled-components";
import { postJoin } from "../api/auth_api";
import AuthButton from "../components/auth/AuthBotton";
import AuthForm from "../components/auth/AuthForm";
import AuthInput from "../components/auth/AuthInput";

import Container from "../components/Container";
import Error from "../components/Error";

export const JOIN_PATH = "/join";
const Title = styled.h1`
  font-size: 38px;
  font-weight: 700;
`;
export interface IJoinForm {
  email: string;
  password: string;
  password2: string;
  username: string;
  result?: string;
}

const Join = () => {
  const { register, handleSubmit, formState, setError, setFocus } =
    useForm<IJoinForm>({
      // mode: "onBlur",
    });

  useEffect(() => {
    setFocus("email");
  }, [setFocus]);

  const onValid = async (inputs: IJoinForm) => {
    if (inputs.password !== inputs.password2) {
      setError(
        "password",
        { message: "비밀번호가 일치하지 않습니다." },
        {
          shouldFocus: true,
        }
      );

      return;
    }
    try {
      const data = await postJoin(inputs);
      console.log(data);
    } catch (e: any) {
      setError("email", {
        message: "이메일이 이미 존재합니다.",
        type: "focus",
      });
    }
  };
  return (
    <Container>
      <Title>회원가입</Title>
      <AuthForm onSubmit={handleSubmit(onValid)}>
        {formState.errors && (
          <>
            {formState.errors.result && (
              <Error message={formState.errors.result?.message} />
            )}
            {formState.errors.email && (
              <Error message={formState.errors.email?.message} />
            )}
            {formState.errors.password && (
              <Error message={formState.errors.password?.message} />
            )}
          </>
        )}
        <AuthInput
          {...register("email", {
            required: "이메일을 입력해주세요",
            minLength: {
              value: 6,
              message: "이메일을 6글자 이상 입력 해주십시오.",
            },
          })}
          placeholder="email"
        />
        <AuthInput
          type={"password"}
          {...register("password", {
            required: "비밀번호를 입력해주세요",
            minLength: {
              value: 4,
              message: "비밀번호를 4글자 이상 입력 해주십시오.",
            },
          })}
          placeholder="password"
        />
        <AuthInput
          type={"password"}
          {...register("password2")}
          placeholder="check"
        />
        <AuthInput
          {...register("username", {
            required: "유저네임을 입력해주세요",
            minLength: {
              value: 4,
              message: "유저네임을 4글자 이상 입력 해주십시오.",
            },
          })}
          placeholder="username"
        />
        <AuthButton>회원가입</AuthButton>
      </AuthForm>
    </Container>
  );
};

export default Join;
