import { useQuery } from "react-query";
import { Link, Route, Routes, useNavigate, useParams } from "react-router-dom";
import styled from "styled-components";
import { getCountWord, getWords } from "../api";
import SButton from "../components/styles/SButton";
import SInput from "../components/styles/SInput";
import SSelect from "../components/styles/SSelect";
import Container from "../components/Container";
import Loading from "../components/Loading";
import Word from "../components/Word";
import { useRecoilValue } from "recoil";
import { userIdVar } from "../atoms";
import TestPage from "./TestPage";
import { useState } from "react";
import { useForm } from "react-hook-form";

export const WORDS_PATH = "/words";

const Aaaa = styled.div`
  width: 70vw;
  flex-direction: column;
  justify-content: space-between;
  align-items: flex-start;
  padding-top: 150px;
  height: 100vh;

  /* background-color: red; */
`;
const Category = styled.div`
  padding-bottom: 20px;
  margin-bottom: 40px;
  border-bottom: 1px solid rgba(0, 0, 0, 0.2);
  display: flex;
  justify-content: space-between;

  span {
    font-size: 45px;
    font-weight: bold;
  }
`;
const NavButtons = styled.div`
  position: fixed;
  bottom: 50px;
  display: flex;
`;

const NavButton = styled.h1``;
const Form = styled.form`
  margin-left: 11px;
  display: flex;
  align-items: center;
  select {
    margin-left: 5px;
  }
`;
export interface IGetWord {
  id: number;
  word: string;
  mean: string;
  known: boolean;
}

interface IProps {
  page: number;
  sort: string;
}

interface ITestForm {
  count: number;
  target: string;
}
const Words = () => {
  const { is_known, page, sort } = useParams();

  const userId = useRecoilValue(userIdVar);
  const nav = useNavigate();
  const { register, handleSubmit } = useForm<ITestForm>();
  const [isTestBtnClick, setIsTestBtnClick] = useState(false);

  const { isLoading, data } = useQuery<IGetWord[]>(
    [`words-${is_known}-${page}`, userId],
    () => getWords(+userId!, +page!, is_known!, "asc")
  );

  const onChange = (event: any) => {
    const {
      target: { value },
    } = event;
    nav(`${WORDS_PATH}/${page}/${sort}/${value}`);
  };

  function shuffle(array: IGetWord[]) {
    array.sort(() => Math.random() - 0.5);
  }

  const onQustionForTestClick = () => {
    console.log(isTestBtnClick);

    setIsTestBtnClick((prev) => !prev);
  };

  const onNextPageClick = () => {
    nav(`${WORDS_PATH}/${+page! + 1}/${sort}/${is_known}`, { replace: true });
  };

  const onPrevPageClick = () => {
    nav(`${WORDS_PATH}/${+page! - 1}/${sort}/${is_known}`, { replace: true });
  };
  const onTestClick = (formData: ITestForm) => {
    console.log(formData);

    const { count, target } = formData;

    var tmp = data;
    shuffle(tmp!);
    const newWords = tmp!.slice(0, count);

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
    <Container>
      {isLoading ? (
        <Loading text="Loading..." />
      ) : (
        <Aaaa>
          <Category>
            <div style={{ display: "flex", alignItems: "center" }}>
              <SSelect defaultValue={"카테고리"} onChange={onChange}>
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
                  <SSelect defaultValue={-1} {...register("count")}>
                    <option disabled value={-1}>
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
                <SButton onClick={onQustionForTestClick}>테스트</SButton>
              ) : null}
            </div>
            <span>
              {is_known === "all"
                ? "모든 단어"
                : is_known === "false"
                ? "모르는 단어"
                : "아는 단어"}
            </span>
            <Form>
              <SInput placeholder="저장된 단어를 검색하시오" />
              <SButton>검색</SButton>
            </Form>
          </Category>

          <div>
            {data!.length === 0 ? (
              <Loading text="저장되어 있는 단어가 없습니다" />
            ) : (
              <div>
                {data!.map((word, index) => (
                  <Word
                    source="ko"
                    {...word}
                    known={"" + word.known}
                    key={index}
                  />
                ))}
              </div>
            )}
          </div>
          <NavButtons>
            {+page! >= 2 && (
              <SButton onClick={onPrevPageClick}>이전페이지</SButton>
            )}
            {data!.length >= 10 && (
              <SButton onClick={onNextPageClick}>다음페이지</SButton>
            )}
          </NavButtons>
        </Aaaa>
      )}
      <Routes>
        <Route path="test" element={<TestPage />} />
      </Routes>
    </Container>
  );
};

export default Words;
