import { useState } from "react";
import { useForm } from "react-hook-form";
import styled from "styled-components";
import { searchWord } from "../api";
import SButton from "../components/styles/SButton";
import SInput from "../components/styles/SInput";
import Container from "../components/Container";
import Loading from "../components/Loading";
import Search from "../components/Search";
import { useEffect } from "react";
import STitle from "../components/styles/STitle";

interface InputedWord {
  word: string;
  mean: string;
}

const Aaaaa = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
`;
const Form = styled.form`
  display: flex;
  align-items: center;
  margin-top: 30px;
`;

interface ISearch {
  word: string;
}

const EmptyBox = styled.div`
  height: 25vw;
`;
const Home = () => {
  const [word, setWord] = useState<InputedWord>({
    word: "",
    mean: "",
  });

  const [isLoading, setIsLoading] = useState(false);
  const [isNotFound, setIsNotFound] = useState(false);
  const { register, handleSubmit, setFocus, setValue } = useForm<ISearch>();

  const onValid = async (data: ISearch) => {
    if (data.word.length === 0) {
      setFocus("word");
      return;
    }
    setIsLoading(true);

    const searchedMena = await searchWord(data.word);

    // if (searchedMena.mean === data.word) {
    //   console.log("aaa");

    //   setIsLoading(false);
    //   setFocus("word");
    //   setIsNotFound(true);
    //   return;
    // }

    setWord({
      word: data.word,
      mean: searchedMena.mean,
    });

    setIsLoading(false);
    setValue("word", "");
    setFocus("word");
  };

  useEffect(() => {
    setFocus("word");
  }, []);
  console.log(isNotFound);

  return (
    <Container title="Home">
      <Aaaaa>
        <STitle>단어 검색</STitle>
        <Form onSubmit={handleSubmit(onValid)}>
          <SInput placeholder="단어를 입력해주세요." {...register("word")} />
          <SButton type={"submit"}>찾기</SButton>
        </Form>
        {isLoading ? (
          <Loading text="Loading..." />
        ) : word.word === "" ? null : (
          <Search {...word} known={"false"} id={0} searchWordFocus={setFocus} />
        )}
        <EmptyBox />
      </Aaaaa>
    </Container>
  );
};

export default Home;
