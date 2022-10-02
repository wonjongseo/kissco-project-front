import { useState } from "react";
import { useForm } from "react-hook-form";
import styled from "styled-components";
import { searchWord } from "../api";
import SButton from "../components/styles/SButton";
import SInput from "../components/styles/SInput";
import Container from "../components/Container";
import SSelect from "../components/styles/SSelect";
import Loading from "../components/Loading";
import Search from "../components/Search";
import { Helmet } from "react-helmet-async";
import { useEffect } from "react";
import STitle from "../components/styles/STitle";

interface InputedWord {
  word: string;
  mean: string;
  source: string;
}

const Form = styled.form`
  display: flex;
  align-items: center;
  margin-top: 30px;
`;

interface ISearch {
  source: string;
  word: string;
}

const Aaaaa = styled.div`
  height: 50vw;
  background-color: red;
`;
const Home = () => {
  const [word, setWord] = useState<InputedWord>({
    word: "",
    mean: "",
    source: "",
  });

  const [isLoading, setIsLoading] = useState(false);
  const { register, handleSubmit, setFocus, setValue } = useForm<ISearch>();

  const onValid = async (data: ISearch) => {
    if (data.word.length === 0) {
      setFocus("word");
      return;
    }

    setIsLoading(true);

    const searchedMena = await searchWord(data.source, data.word);
    setWord({
      word: data.word,
      mean: searchedMena.mean,
      source: data.source,
    });

    setIsLoading(false);
    setValue("word", "");
    setFocus("word");
  };

  useEffect(() => {
    setFocus("word");
  }, []);

  return (
    <Container title="Home">
      <STitle>단어 검색</STitle>
      <Form onSubmit={handleSubmit(onValid)}>
        <SSelect {...register("source")}>
          <option value={"ko"}>한국어</option>
          <option value={"ja"}>일본어</option>
        </SSelect>

        <SInput placeholder="단어를 입력해주세요." {...register("word")} />

        <SButton type={"submit"}>찾기</SButton>
      </Form>

      {isLoading ? (
        <Loading text="Loading..." />
      ) : word.word === "" ? null : (
        <Search {...word} known={"false"} id={0} />
      )}
      <Aaaaa />
    </Container>
  );
};

export default Home;
