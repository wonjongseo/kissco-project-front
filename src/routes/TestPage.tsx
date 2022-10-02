import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import styled from "styled-components";
import ContinueContainer from "../components/ContinueContainer";
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

const QuestionContainer = styled.div`
  display: flex;

  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const SButtons = styled.button`
  background-color: #a5f1e9;
  border: 1px solid rgba(0, 0, 0, 0.2);
  border-radius: 10px;
  font-size: ${(p) => p.theme.button_font_size};
  padding: ${(p) => p.theme.button_padding};
  box-shadow: 1px 1px 1px;
  &:hover {
    cursor: pointer;
  }
`;
const Button = styled.div`
  background-color: #a5f1e9;
  border: 1px solid rgba(0, 0, 0, 0.2);
  border-radius: 10px;
  font-size: ${(p) => p.theme.button_font_size};
  padding: ${(p) => p.theme.button_padding};
  /* padding: 1 ; */
  display: flex;
  justify-content: center;
  align-items: center;
  box-shadow: 1px 1px 1px;
  &:hover {
    cursor: pointer;
  }

  width: 100%;
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
  width: 189px;
  grid-row-gap: 16px;
  grid-column-gap: 50px;
  grid-template-columns: repeat(2, 50px);
  grid-template-rows: repeat(2, 50px);
`;

const TopButtonContainer = styled.div`
  display: flex;

  margin-top: 15px;
  margin-right: 15px;
`;

interface IState {
  words: IGetWord[];
  target: string;
}
const TestPage = () => {
  const nav = useNavigate();
  const { words, target } = useLocation().state as IState;
  const [tmp, setTmp] = useState<IGetWord[]>([]);
  const [index, setIndex] = useState(0);
  const [collections, setCollections] = useState<IGetWord[]>([]);
  const [wrongs, setWrongs] = useState<IGetWord[]>([]);

  const onPrevClick = () => {
    nav(-1);
  };

  const onNextClick = (selected: string) => {
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
    const tmp = [] as IGetWord[];
    for (var i = 0; i < 4; i++) {
      const selectionWord = words[Math.floor(Math.random() * words.length)];
      if (tmp.indexOf(selectionWord) === -1) {
        tmp.push(selectionWord);
      } else {
        --i;
      }
    }
    var collectIndex = Math.floor(Math.random() * 4);
    if (tmp.indexOf(words[index + 1]) === -1)
      tmp[collectIndex] = words[index + 1];

    setCollections(tmp);
  };

  const onChangeLanguageClick = () => {
    setTmp((prev) => {
      return prev.map((word) => {
        const ttmp = word.mean;
        word.mean = word.word;
        word.word = ttmp;
        return word;
      });
    });
  };
  useEffect(() => {
    setTmp(words);
    const tmp = [] as IGetWord[];
    for (var i = 0; i < 4; i++) {
      const selectionWord = words[Math.floor(Math.random() * words.length)];

      if (tmp.indexOf(selectionWord) === -1) {
        tmp.push(selectionWord);
      } else {
        --i;
      }
    }

    var collectIndex = Math.floor(Math.random() * 4);
    if (tmp.indexOf(words[0]) === -1) tmp[collectIndex] = words[0];

    setCollections(tmp);
  }, []);

  return (
    <Container>
      <TopButtonContainer>
        <SButton onClick={onChangeLanguageClick}>언어 바꾸기</SButton>
        <SButton onClick={onPrevClick}>나가기</SButton>
      </TopButtonContainer>
      <InnerContainer>
        {index !== tmp.length ? (
          <QuestionContainer>
            <Question>{tmp[index].mean}</Question>
            <MeanBox>
              {collections.map((mean, index) => (
                <Button onClick={() => onNextClick(mean.word)} key={index}>
                  {mean.word}
                </Button>
              ))}
            </MeanBox>
          </QuestionContainer>
        ) : (
          <ContinueContainer
            wrongs={wrongs}
            totalCnt={tmp.length}
            setIndex={setIndex}
            setWrongs={setWrongs}
          />
        )}
      </InnerContainer>
    </Container>
  );
};

export default TestPage;
