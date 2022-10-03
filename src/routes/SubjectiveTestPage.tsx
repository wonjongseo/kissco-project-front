import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useLocation, useNavigate } from "react-router-dom";
import styled from "styled-components";
import ContinueContainer from "../components/ContinueContainer";
import SButton from "../components/styles/SButton";
import SInput from "../components/styles/SInput";
import SContainer from "../components/test/SContainer";
import SInnerContainer from "../components/test/SInnerContainer";
import SQuestion from "../components/test/SQuestion";
import SQuestionContainer from "../components/test/SQuestionContainer";
import { IGetWord } from "./Words";

interface IState {
  words: IGetWord[];
}
const Button = styled.button`
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
const TopButtonContainer = styled.div`
  display: flex;

  margin-top: 15px;
  margin-right: 15px;
`;
const Form = styled.form`
  display: flex;
`;

interface IForm {
  answer: string;
}
const SubjectiveTestPage = () => {
  const nav = useNavigate();
  const { words } = useLocation().state as IState;
  const [tmp, setTmp] = useState<IGetWord[]>([]);
  const { register, handleSubmit, setFocus, setValue } = useForm<IForm>();

  const [isFinish, setIsFinish] = useState(false);
  const [wrongs, setWrongs] = useState<IGetWord[]>([]);
  const [index, setIndex] = useState(0);
  useEffect(() => {
    setTmp(words);
  }, []);

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

  const onPrevClick = () => {
    nav(-1);
  };

  const onNextClick = ({ answer }: IForm) => {
    if (answer === "") {
      setFocus("answer");
      return;
    }

    if (index < words.length) {
      if (answer === words[index].word) {
      } else {
        setWrongs((prev) => [words[index], ...prev]);
      }
      setIndex((prev) => prev + 1);
    } else {
      if (answer === words[index].word) {
      } else {
        setWrongs((prev) => [words[index], ...prev]);
      }

      setIsFinish(true);
    }
    setValue("answer", "");
  };
  return (
    <SContainer>
      <TopButtonContainer>
        <SButton onClick={onChangeLanguageClick}>언어 바꾸기</SButton>
        <SButton onClick={onPrevClick}>나가기</SButton>
      </TopButtonContainer>
      <SInnerContainer>
        {index < words.length ? (
          <>
            <SQuestionContainer>
              <SQuestion>{words[index].mean}</SQuestion>
            </SQuestionContainer>
            <Form onSubmit={handleSubmit(onNextClick)}>
              <SInput {...register("answer")} placeholder="정답을 입력하시오" />
              <Button>Next</Button>
            </Form>
          </>
        ) : (
          <div>
            <ContinueContainer
              wrongs={wrongs}
              totalCnt={tmp.length}
              setIndex={setIndex}
              setWrongs={setWrongs}
            />
          </div>
        )}
      </SInnerContainer>
    </SContainer>
  );
};
export default SubjectiveTestPage;
