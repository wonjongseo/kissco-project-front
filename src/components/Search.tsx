import { useEffect, useState } from "react";
import { useForm, UseFormSetFocus } from "react-hook-form";
import { useLocation, useNavigate } from "react-router-dom";
import { useRecoilValue } from "recoil";
import styled from "styled-components";
import { addCustomVoca, addVoca } from "../api";
import { userIdVar } from "../atoms";
import Loading from "./Loading";
import SButton from "./styles/SButton";
import SInput from "./styles/SInput";
import SWord from "./styles/SWord";

const Container = styled.div`
  margin-top: 22px;
  display: flex;
  align-items: center;
`;

interface GetIWord {
  word: string;
  mean: string;
  id: number;
  known: string;
  searchWordFocus?: any;
}

const Search = (data: GetIWord) => {
  const location = useLocation();
  console.log(location);

  const userId = useRecoilValue(userIdVar);

  const nav = useNavigate();
  const [isCustom, setIsCustom] = useState(false);
  const { register, setValue, handleSubmit, formState, setError, setFocus } =
    useForm<{
      mean: string;
      result?: string;
    }>();
  const [isNotFound, setIsNotFound] = useState(false);
  const onSaveClick = async () => {
    try {
      await addVoca(+userId!, data.word, data.mean);

      nav(0);
    } catch (error: any) {
      setError("result", {
        message: error.response.data.message,
      });

      data.searchWordFocus!("word", {
        shouldSelect: true,
      });
    }
  };
  const onCustomSaveClick = async ({ mean }: any) => {
    await addCustomVoca(+userId!, data.word, mean);

    nav(0);
  };
  useEffect(() => {
    if (data.mean.includes(data.word)) {
      setIsNotFound(true);
    }
  }, []);
  return (
    <Container>
      <>
        {isNotFound ? (
          <Loading text={`${data.word} 를 찾을 수 없습니다.`} />
        ) : formState?.errors?.result ? (
          <Loading text={`${formState?.errors?.result?.message} .`} />
        ) : (
          <>
            <SWord>
              {data.word} {data.mean}
            </SWord>
          </>
        )}
      </>
      {userId !== null && !isNotFound && !formState?.errors?.result ? (
        <>
          {isCustom ? (
            <form onSubmit={handleSubmit(onCustomSaveClick)}>
              <SInput
                {...register("mean")}
                placeholder="수정할 의미을 입력주세요."
              />
              <SButton onClick={() => setIsCustom(false)}>취소</SButton>
              <SButton>저장</SButton>
            </form>
          ) : (
            <>
              <SButton onClick={() => setIsCustom(true)}>수정</SButton>
            </>
          )}
          {isCustom ? null : <SButton onClick={onSaveClick}>저장</SButton>}
        </>
      ) : null}
    </Container>
  );
};

export default Search;
