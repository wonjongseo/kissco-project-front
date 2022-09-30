import { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useRecoilValue } from "recoil";
import styled from "styled-components";
import { addCustomVoca, addVoca } from "../api";
import { userIdVar } from "../atoms";
import SButton from "./styles/SButton";
import SInput from "./styles/SInput";
import { GetIWord } from "./Word";

const Container = styled.div`
  margin-top: 22px;
  display: flex;
  align-items: center;
`;

const SWord = styled.div`
  font-size: 30px;
  margin-right: 10px;
`;

const Search = (data: GetIWord) => {
  const userId = useRecoilValue(userIdVar);

  const nav = useNavigate();
  const [isCustom, setIsCustom] = useState(false);
  const { register, handleSubmit } = useForm<{ mean: string }>();
  const onSaveClick = async () => {
    const response = await addVoca(+userId!, data.word, data.mean, data.source);
    console.log(response);
    nav(0);
  };
  console.log("data.known  ", data.known);

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
              <SInput {...register("mean")} placeholder="뜻을 수정해주세요." />
              <SButton value="저장" />
            </form>
          ) : (
            <SButton value="수정" onClick={() => setIsCustom(true)} />
          )}
          {isCustom ? null : <SButton value="저장" onClick={onSaveClick} />}
        </>
      ) : null}
    </Container>
  );
};

export default Search;
