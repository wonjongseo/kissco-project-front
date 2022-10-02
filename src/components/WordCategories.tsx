import { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import styled from "styled-components";
import { IGetWord, WORDS_PATH } from "../routes/Words";
import SButton from "./styles/SButton";
import SSelect from "./styles/SSelect";
import STitle from "./styles/STitle";

interface ITestForm {
  count: number;
  target: string;
}
const Form = styled.form`
  margin-left: 11px;
  display: flex;
  align-items: center;
  select {
    margin-left: 5px;
  }
`;
const Category = styled.div`
  padding-bottom: 20px;
  margin-bottom: 30px;
  border-bottom: 1px solid rgba(0, 0, 0, 0.2);
  display: flex;
  justify-content: space-between;
  span {
    font-size: 45px;
    font-weight: bold;
  }
`;

interface IProps {
  data: IGetWord[];
}
const WordCategories = ({ data }: IProps) => {
  const { is_known, page, sort } = useParams();

  const nav = useNavigate();

  const { register, handleSubmit } = useForm<ITestForm>();
  const [isTestBtnClick, setIsTestBtnClick] = useState(false);

  const onChangeCategory = (event: any) => {
    const {
      target: { value },
    } = event;

    nav(`${WORDS_PATH}/1/${sort}/${value}`);
  };

  function shuffle(array: IGetWord[]) {
    const newArray = array;
    newArray.sort(() => Math.random() - 0.5);

    return newArray;
  }
  const onTestClick = (formData: ITestForm) => {
    const { count, target } = formData;

    const shuffledWords = shuffle(data!);
    const newWords = shuffledWords!.slice(0, count);

    if (target === "한국어") {
      for (var i = 0; i < newWords.length; i++) {
        const tmp = newWords[i].word;
        newWords[i].word = newWords[i].mean;
        newWords[i].mean = tmp;
      }
      nav("test", {
        state: {
          words: newWords,
          target,
        },
      });
    } else {
      nav("test", {
        state: {
          words: newWords,
          target,
        },
      });
    }
  };
  return (
    <Category>
      <div style={{ display: "flex", alignItems: "center" }}>
        <SSelect defaultValue={"카테고리"} onChange={onChangeCategory}>
          <>
            <option value={"카테고리"} disabled>
              카테고리
            </option>
            <option value={"all"}>전체</option>
            <option value={"false"}>모름</option>
            <option value={"true"}>앎</option>
          </>
        </SSelect>
        {isTestBtnClick === true ? (
          <Form onSubmit={handleSubmit(onTestClick)}>
            <SSelect defaultValue={0} {...register("count")}>
              <option disabled value={0}>
                문항 수
              </option>
              {Array.from(Array(data!.length - 4 + 1), (e, i) => (
                <option value={i + 4} key={i}>
                  {e} {i + 4}
                </option>
              ))}
            </SSelect>

            <SSelect defaultValue={"언어"} {...register("target")}>
              <option disabled value={"언어"}>
                언어
              </option>
              <option value={"일본어"}>일본어</option>
              <option value={"한국어"}>한국어</option>
            </SSelect>
            <SButton>테스트 시작</SButton>
          </Form>
        ) : data!.length >= 4 ? (
          <SButton onClick={() => setIsTestBtnClick((prev) => !prev)}>
            테스트
          </SButton>
        ) : null}
      </div>
      <STitle>
        {is_known === "all"
          ? "모든 단어"
          : is_known === "false"
          ? "모르는 단어"
          : "아는 단어"}
      </STitle>
      <div></div>
    </Category>
  );
};

export default WordCategories;
