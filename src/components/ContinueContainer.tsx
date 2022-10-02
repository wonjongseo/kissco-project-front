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
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
`;

const WrongWordBox = styled.ul`
  font-size: 20px;
  height: 100%;
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
  }
`;

const TopButtonContainer = styled.div`
  display: flex;

  margin-top: 15px;
  margin-right: 15px;
`;

const TestResult = styled.div`
  font-size: 50px;
  margin-top: 100px;
`;

interface IProps {
  wrongs: IGetWord[];
  totalCnt: number;
  setIndex: any;
  setWrongs: any;
}
const ContinueContainer = ({
  wrongs,
  totalCnt,
  setIndex,
  setWrongs,
}: IProps) => {
  const nav = useNavigate();
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

  const onPrevClick = () => {
    nav(-1);
  };

  return (
    <ContinueBox>
      <TestResult>
        {totalCnt}개 중 {totalCnt - wrongs.length}개를 맞추셨습니다.
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
  );
};

export default ContinueContainer;
