import { useQuery } from "react-query";
import { Link, Route, Routes, useParams } from "react-router-dom";
import styled from "styled-components";
import { getCountWord, getWords } from "../api";
import Container from "../components/Container";
import Loading from "../components/Loading";
import Word from "../components/Word";
import { useRecoilValue } from "recoil";
import { userIdVar } from "../atoms";
import TestPage from "./TestPage";
import WordCategories from "../components/WordCategories";
import SubjectiveTestPage from "./SubjectiveTestPage";

export const WORDS_PATH = "/words";

const Aaaa = styled.div`
  width: 70vw;
  flex-direction: column;
  justify-content: space-between;
  align-items: flex-start;
  padding-top: 150px;
  height: 100vh;
`;

const PageNav = styled.ul`
  position: fixed;
  bottom: 100px;
  /* background-color: red; */
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

  &:hover {
    cursor: pointer;
  }
`;

export interface IGetWord {
  id: number;
  word: string;
  mean: string;
  known: boolean;
}

const WordsContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

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

  const loading = isLoading || countLoading;

  return (
    <Container title="Words">
      {loading ? (
        <Loading text="Loading..." />
      ) : (
        <Aaaa>
          <WordCategories data={data!} />

          {data!.length === 0 ? (
            <Loading text="저장되어 있는 단어가 없습니다" />
          ) : (
            <WordsContainer>
              {data!.map((word, index) => (
                <Word {...word} known={"" + word.known} key={index} />
              ))}
            </WordsContainer>
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
        <Route path="subjective-test" element={<SubjectiveTestPage />} />
      </Routes>
    </Container>
  );
};

export default Words;
