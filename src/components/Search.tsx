import { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useRecoilValue } from "recoil";
import styled from "styled-components";
import { addCustomVoca, addVoca } from "../api";
import { userIdVar } from "../atoms";
import SButton from "./styles/SButton";
import SInput from "./styles/SInput";
import SWord from "./styles/SWord";
import { GetIWord } from "./Word";

const Container = styled.div`
  margin-top: 22px;
  display: flex;
  align-items: center;
`;

const Search = (data: GetIWord) => {
  const userId = useRecoilValue(userIdVar);

  const nav = useNavigate();
  const [isCustom, setIsCustom] = useState(false);
  const { register, handleSubmit } = useForm<{ mean: string }>();

  const onSaveClick = async () => {
    await addVoca(+userId!, data.word, data.mean, data.source);
    nav(0);
  };
  const onCustomSaveClick = async ({ mean }: any) => {
    await addCustomVoca(+userId!, data.word, mean);

    nav(0);
  };
  return (
    <Container>
      <>
        <SWord>
          {data.word} {data.mean}
        </SWord>
      </>
      {userId !== null ? (
        <>
          {isCustom ? (
            <form onSubmit={handleSubmit(onCustomSaveClick)}>
              <SInput
                {...register("mean")}
                placeholder="수정할 의미을 입력주세요."
              />
              <SButton onClick={() => setIsCustom(false)}>취소</SButton>
              <SButton onClick={onCustomSaveClick}>저장2</SButton>
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
