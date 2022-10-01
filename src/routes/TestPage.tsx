import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import styled from "styled-components";
import SButton from "../components/styles/SButton";
import SWord from "../components/styles/SWord";
import { IGetWord } from "./Words";

const Container = styled.div`
  position: fixed;
  border-radius: 30px;
  top: 10vh;
  height: 85%;
  width: 70%;
  background-color: #8bbccc;
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  box-shadow: 4px 4px 20px;
`;

const Button = styled(SButton)`
  margin-left: -10px;
  margin-right: 15px;
  width: 120px;
  margin-top: 15px;
  height: 40px;
`;

const InnerContainer = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: center;
`;
const Question = styled.div`
  margin-bottom: 30px;
  font-size: 120px;
`;

const MeanBox = styled.div`
  display: grid;
  grid-column-gap: 100px;
  grid-template-columns: repeat(2, 50px);
  grid-template-rows: repeat(2, 50px);
`;

const ContinueBox = styled.div`
  display: flex;
  /* justify-content: space-around; */
  flex-direction: column;
  width: 100%;
  align-items: center;
  height: 100%;
`;

const ReTryBox = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  //background-color: red;

  width: 100%;
  height: 100%;
`;

const WrongWordBox = styled.ul`
  font-size: 20px;
  height: 100%;
  /* background-color: red; */
  h1 {
    font-size: 40px;
    margin: 100px 0px 50px 0px;
  }
  ${SWord} {
    margin: 20px 0px;
    font-size: 25px;
  }
  p {
    margin-top: 40px;
    font-size: 20px;
    display: flex;
    align-items: center;
    /* background-color: red; */
  }
`;

const TestResult = styled.div`
  font-size: 50px;
  margin-top: 100px;
`;
interface IState {
  words: IGetWord[];
  target: string;
}
const TestPage = () => {
  const nav = useNavigate();
  const { words, target } = useLocation().state as IState;
  const [index, setIndex] = useState(0);
  const [collections, setCollections] = useState<string[]>([]);
  const [wrongs, setWrongs] = useState<IGetWord[]>([]);
  const onPrevClick = () => {
    nav(-1);
  };
  const onNextClick = (selected: string) => {
    console.log(selected);
    console.log(words[index]);

    if (selected !== words[index].word) {
      setWrongs((prev) => [words[index], ...prev]);
    }

    setIndex((prev) => prev + 1);
    createSelection();
  };

  const createSelection = () => {
    if (index + 1 >= words.length) {
      return;
    }
    const tmp = [] as string[];
    for (var i = 0; i < 4; i++) {
      const selectionWord =
        words[Math.floor(Math.random() * words.length)].word;
      if (tmp.indexOf(selectionWord) === -1) {
        tmp.push(selectionWord);
      } else {
        --i;
      }
    }
    var collectIndex = Math.floor(Math.random() * 4);
    if (tmp.indexOf(words[index + 1].word) === -1)
      tmp[collectIndex] = words[index + 1].word;

    setCollections(tmp);
  };
  const onReTryClick = () => {
    setIndex(0);
    setWrongs([]);
    nav("../test", {
      state: {
        words: wrongs,
      },
      replace: true,
    });
  };
  useEffect(() => {
    const tmp = [] as string[];
    for (var i = 0; i < 4; i++) {
      const selectionWord =
        words[Math.floor(Math.random() * words.length)].word;
      if (tmp.indexOf(selectionWord) === -1) {
        tmp.push(selectionWord);
      } else {
        --i;
      }
    }

    var collectIndex = Math.floor(Math.random() * 4);
    if (tmp.indexOf(words[0].word) === -1) tmp[collectIndex] = words[0].word;

    setCollections(tmp);
  }, []);

  return (
    <Container>
      <div>
        <Button onClick={onPrevClick}>나가기</Button>
      </div>
      <InnerContainer>
        {index !== words.length ? (
          <>
            <Question>{words[index].mean}</Question>
            <MeanBox>
              {collections.map((mean, index) => (
                <Button onClick={() => onNextClick(mean)} key={index}>
                  {mean}
                </Button>
              ))}
            </MeanBox>
          </>
        ) : (
          <ContinueBox>
            <TestResult>
              {words.length}개 중 {words.length - wrongs.length}개를
              맞추셨습니다.
            </TestResult>
            {wrongs.length >= 4 ? (
              <ReTryBox>
                <div>틀리신 문제를 다시 보시겠습니까? </div>
                <SButton onClick={onReTryClick}>네</SButton>
                <SButton onClick={onPrevClick}>아니요</SButton>
              </ReTryBox>
            ) : (
              <ReTryBox>
                <WrongWordBox>
                  <h1>틀린문제</h1>

                  {wrongs.map((word) => (
                    <SWord key={word.id}>
                      <div>{word.word}</div>
                      <div>{word.mean}</div>
                    </SWord>
                  ))}
                  <p>
                    테스트를 진행하기 위해서는 4개 이상의 문항이 필요합니다.
                    <SButton onClick={onPrevClick}>다시하기</SButton>
                  </p>
                </WrongWordBox>
              </ReTryBox>
            )}
          </ContinueBox>
        )}
      </InnerContainer>
    </Container>
  );
};

export default TestPage;
