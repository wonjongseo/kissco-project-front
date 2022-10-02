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
import WordCategories from "../components/WordCategories";

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

  const { isLoading, data } = useQuery<IGetWord[]>(
    [`words-${is_known}-${page}`, userId],
    () => getWords(+userId!, +page!, is_known!, "asc")
  );

  const { isLoading: countLoading, data: count } = useQuery(
    [`words-${is_known}-count`, userId],
    () => getCountWord(+userId!, is_known!)
  );

  return (
    <Container title="Words">
      {isLoading ? (
        <Loading text="Loading..." />
      ) : (
        <Aaaa>
          <WordCategories data={data!} />

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
              <Page isClick={+page! === i + 1} key={i}>
                <Link to={`${WORDS_PATH}/${i + 1}/asc/${is_known}`}>
                  {i + 1}
                </Link>
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
