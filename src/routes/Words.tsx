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

export const WORDS_PATH = "/words";

const Aaaa = styled.div`
  width: 70vw;
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

const Words = () => {
  const { is_known, page, sort } = useParams();

  const userId = useRecoilValue(userIdVar);
  const navigator = useNavigate();
  let suffledWords = [] as IGetWord[];
  const { isLoading, data } = useQuery<IGetWord[]>(
    [`words-${is_known}`, userId],
    () => getWords(+userId!, 1, is_known!, "asc")
  );

  const { isLoading: countIsLoading, data: count } = useQuery(
    [`words-${is_known}-count`, userId],
    () => getCountWord(+userId!)
  );

  const onChange = (event: any) => {
    const {
      target: { value },
    } = event;
    navigator(`${WORDS_PATH}/${page}/${sort}/${value}`);
  };

  function shuffle() {
    data!.sort(() => Math.random() - 0.5);
  }

  const onTestClick = () => {
    shuffle();
    navigator("test", {
      state: {
        words: data!.splice(0, 9),
      },
    });
  };
  return (
    <Container>
      {isLoading ? (
        <Loading text="Loading..." />
      ) : (
        <Aaaa>
          <Category>
            <div>
              <SSelect onChange={onChange}>
                <option value={"all"}>전체</option>
                <option value={"false"}>모름</option>
                <option value={"true"}>앎</option>
              </SSelect>
              <SButton onClick={onTestClick}>테스트</SButton>
            </div>
            <span>
              {is_known === "all"
                ? "모든 단어"
                : is_known === "false"
                ? "모르는 단어"
                : "아는 단어"}
            </span>
            <form>
              <SInput placeholder="저장된 단어를 검색하시오" />
              <SButton value="검색" />
            </form>
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
        </Aaaa>
      )}
      <Routes>
        <Route path="test" element={<TestPage />} />
      </Routes>
    </Container>
  );
};

export default Words;
