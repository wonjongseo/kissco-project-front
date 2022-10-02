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
import STitle from "../components/styles/STitle";
import { useEffect } from "react";

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
  margin-bottom: 30px;
  border-bottom: 1px solid rgba(0, 0, 0, 0.2);
  display: flex;
  justify-content: space-between;
  span {
    font-size: 45px;
    font-weight: bold;
  }
`;
const PageNav = styled.ul`
  width: 100%;
  margin: 0 auto;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Page = styled.li<{ isClick?: boolean }>`
  padding: 8px;
  margin-left: 10px;

  font-size: ${(p) => (p.isClick ? "22px" : "14px")};
  color: ${(p) => (p.isClick ? "red" : "black")};

  /* font-weight: ${(p) => (p.isClick ? "bold" : "600")}; */
  &:hover {
    cursor: pointer;
  }
`;

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

  const { isLoading: countLoading, data: count } = useQuery(
    [`words-${is_known}-count`, userId],
    () => getCountWord(+userId!, is_known!)
  );

  const onChange = (event: any) => {
    const {
      target: { value },
    } = event;
    console.log(is_known, value);

    nav(`${WORDS_PATH}/1/${sort}/${value}`);
  };

  function shuffle(array: IGetWord[]) {
    array.sort(() => Math.random() - 0.5);
  }

  const onQustionForTestClick = () => {
    console.log(isTestBtnClick);

    setIsTestBtnClick((prev) => !prev);
  };

  const onNextPageClick = (page: number) => {
    nav(`${WORDS_PATH}/${page}/${sort}/${is_known}`, { replace: true });
  };

  const onTestClick = (formData: ITestForm) => {
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
    <Container title="Words">
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
                <SButton onClick={onQustionForTestClick}>테스트</SButton>
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

          {data!.length === 0 ? (
            <Loading text="저장되어 있는 단어가 없습니다" />
          ) : (
            <div>
              {data!.map((word, index) => (
                <Word {...word} known={"" + word.known} key={index} />
              ))}
            </div>
          )}
          <PageNav>
            {Array.from(Array(Math.floor((count - 1) / 10) + 1), (e, i) => (
              <Page
                isClick={+page! === i + 1}
                onClick={() => onNextPageClick(i + 1)}
                key={i}
              >
                {i + 1}
              </Page>
            ))}
          </PageNav>
        </Aaaa>
      )}
      <Routes>
        <Route path="test" element={<TestPage />} />
      </Routes>
    </Container>
  );
};

export default Words;
