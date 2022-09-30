import axios from "axios";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import styled from "styled-components";
import { IGetWord } from "./Words";

const Container = styled.div`
  position: fixed;
  top: 10vh;
  height: 85%;
  width: 70%;
  background-color: gray;
  display: flex;
  flex-direction: column;
  align-items: flex-end;
`;

const Button = styled.button`
  margin-right: 15px;
  width: 80px;
  height: 40px;
  margin-top: 15px;
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
  font-size: 100px;
`;

const MeanBox = styled.div`
  display: grid;
  grid-column-gap: 40px;
  grid-template-columns: repeat(2, 50px);
  grid-template-rows: repeat(2, 50px);
`;

interface IState {
  words: IGetWord[];
}
const TestPage = () => {
  const nav = useNavigate();
  const { words } = useLocation().state as IState;
  const [correctIndex, setCorrectIndex] = useState(0);
  const [curWords, setCurWords] = useState<IGetWord>();
  const [index, setIndex] = useState(0);
  const [collection, setCollection] = useState<string[]>([]);
  let meansIndex = [] as number[];
  let tempMean = [] as string[];
  let collectCnt = 0;
  const onPrevClick = () => {
    nav(-1);
  };
  const onNextClick = () => {
    setIndex((prev) => prev + 1);

    createSelection();
  };

  const createSelection = () => {
    const tmpcorrectIndex = Math.floor(Math.random() * 4);
    setCorrectIndex(tmpcorrectIndex);
    setCurWords(words[index]);
    let tmpMean = new Array(4);
    tmpMean[correctIndex] = words[index].word;

    for (var i = 0; i < 4; i++) {
      let otherIndex = Math.floor(Math.random() * words.length);
      if (i === tmpcorrectIndex) {
        console.log("tmpcorrectIndex", tmpcorrectIndex);
      }

      if (tmpMean.indexOf(words[otherIndex].word) === -1)
        tmpMean[i] = words[otherIndex].word;
      else {
        i--;
      }
    }

    console.log("tmpMean", tmpMean);

    setCollection(tmpMean);
    console.log("collection", collection);
  };

  useEffect(() => {
    createSelection();
  }, []);

  return (
    <Container>
      <div>
        <Button onClick={onPrevClick}>Exit</Button>
      </div>
      <InnerContainer>
        {index !== words.length ? (
          <>
            <Question>{curWords?.mean}</Question>
            <MeanBox>
              {collection.map((mean, index) => (
                <Button onClick={onNextClick} key={index}>
                  {mean}
                </Button>
              ))}
            </MeanBox>
          </>
        ) : null}
      </InnerContainer>
    </Container>
  );
};

export default TestPage;
