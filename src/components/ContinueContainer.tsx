import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { IGetWord } from "../routes/Words";
import SButton from "./styles/SButton";
import SWord from "./styles/SWord";

const ContinueBox = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  align-items: center;
  height: 100%;
`;

const ReTryBox = styled.div`
  width: 100%;
  margin-left: 80px;
`;

const WrongWordBox = styled.ul`
  font-size: 18px;
  height: 100%;
  width: 100%;
  h1 {
    font-size: ${(p) => p.theme.test_title_font_size};
    color: red;
    margin: 80px 0px 40px 0px;
  }
  ${SWord} {
    margin: 20px 0px;
    font-size: 25px;
  }
  p {
    margin-top: 70px;
    font-size: 20px;
    display: flex;
    align-items: center;
  }
`;

const TestResult = styled.div`
  margin-top: 20px;
  font-size: ${(p) => p.theme.test_title_font_size};
`;

interface IProps {
  wrongs: IGetWord[];
  totalCnt: number;
  setIndex: any;
  setWrongs: any;
}

const Bbbb = styled.div`
  display: flex;
  align-items: center;
  div {
    font-size: ${(p) => p.theme.test_continue_font_size};
  }
`;

const ContinueContainer = ({
  wrongs,
  totalCnt,
  setIndex,
  setWrongs,
}: IProps) => {
  function shuffle(array: IGetWord[]) {
    const newArray = array.slice();
    newArray.sort(() => Math.random() - 0.5);

    return newArray;
  }
  const nav = useNavigate();
  const [words, setWords] = useState<IGetWord[]>([]);
  const onSubjectiveTestClick = () => {
    const suffledWords = shuffle(words);
    setWords(suffledWords);

    setIndex(0);
    setWrongs([]);
    nav("../subjective-test", {
      state: {
        words: suffledWords,
      },
      replace: true,
    });
  };
  const onReTryClick = () => {
    setIndex(0);
    const newWord = shuffle(words);

    nav("../test", {
      state: {
        words: newWord,
      },
      replace: true,
    });
  };

  useEffect(() => {
    console.log("called");
    setWords(wrongs);
    setWrongs([]);
  }, []);
  const onPrevClick = () => {
    nav(-1);
  };

  return (
    <ContinueBox>
      <TestResult>
        {totalCnt}??? ??? {totalCnt - words.length}?????? ??????????????????.
      </TestResult>
      {words.length === 0 ? (
        <CongraturationBox>
          <div>???????????????. </div>
          <Button onClick={onPrevClick}>????????? ?????????</Button>
        </CongraturationBox>
      ) : words.length >= 4 ? (
        <ReTryBox>
          <WrongWordBox>
            <h1>????????????</h1>
            {words.map((word) => (
              <SWord key={word.id}>
                <div>{word.word}</div>
                <div>{word.mean}</div>
              </SWord>
            ))}
            <Bbbb>
              <div>
                <Bbbb>????????? ????????? ?????? ??????????????????? </Bbbb>
              </div>
              <div>
                <SButton onClick={onReTryClick}>???</SButton>
                <SButton onClick={onPrevClick}>?????????</SButton>
              </div>
            </Bbbb>
          </WrongWordBox>
        </ReTryBox>
      ) : (
        <ReTryBox>
          {words.length >= 1 && (
            <WrongWordBox>
              <h1>????????????</h1>
              {words.map((word) => (
                <SWord key={word.id}>
                  <div>{word.word}</div>
                  <div>{word.mean}</div>
                </SWord>
              ))}
              <Bbbb>
                <div>
                  <Bbbb>????????? ????????? ?????? ???????????????????</Bbbb>
                </div>
                <div>
                  <SButton onClick={onSubjectiveTestClick}>???</SButton>
                  <SButton onClick={onPrevClick}>?????????</SButton>
                </div>
              </Bbbb>
            </WrongWordBox>
          )}
        </ReTryBox>
      )}
    </ContinueBox>
  );
};

const Button = styled(SButton)`
  margin-top: 10px;
  margin-left: 0;
`;
export default ContinueContainer;
const CongraturationBox = styled.div`
  div {
    font-weight: bold;
    color: tomato;
    font-size: 50px;
  }
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 40px;
`;
