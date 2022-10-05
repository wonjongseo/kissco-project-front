import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useRecoilValue } from "recoil";
import styled from "styled-components";
import { addCustomVoca, addVoca } from "../api";
import { userIdVar } from "../atoms";
import Loading from "./Loading";
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

  console.log(data);

  const nav = useNavigate();
  const [isCustom, setIsCustom] = useState(false);
  const { register, handleSubmit } = useForm<{ mean: string }>();
  const [isNotFound, setIsNotFound] = useState(false);
  const onSaveClick = async () => {
    await addVoca(+userId!, data.word, data.mean);
    nav(0);
  };
  const onCustomSaveClick = async ({ mean }: any) => {
    await addCustomVoca(+userId!, data.word, mean);

    nav(0);
  };
  useEffect(() => {
    console.log(data.mean.includes(data.word));

    if (data.mean.includes(data.word)) {
      setIsNotFound(true);
    }
  }, []);
  return (
    <Container>
      <>
        {isNotFound ? (
          <Loading text={`${data.word} 를 찾을 수 없습니다.`} />
        ) : (
          <SWord>
            {data.word} {data.mean}
          </SWord>
        )}
      </>
      {userId !== null && !isNotFound ? (
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
