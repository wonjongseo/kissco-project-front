import { useState } from "react";
import { useForm } from "react-hook-form";
import { useRecoilValue } from "recoil";
import styled from "styled-components";
import { searchWord } from "../api";
import { windowWidthVar } from "../atoms";
import SButton from "../components/styles/SButton";
import SInput from "../components/styles/SInput";
import Container from "../components/Container";
import Select from "../components/styles/SSelect";
import Loading from "../components/Loading";
import Search from "../components/Search";

import Word from "../components/Word";
import { useEffect } from "react";

interface InputedWord {
  word: string;
  mean: string;
  source: string;
}
const Aaaaaaa = styled.div`
  margin-top: 400px;
`;
const Form = styled.form`
  height: 50px;
  margin-top: 30px;
`;
const Title = styled.h1`
  font-size: 38px;
  font-weight: 700;
`;
interface ISearch {
  source: string;
  word: string;
}

const Home = () => {
  const [word, setWord] = useState<InputedWord>({
    word: "",
    mean: "",
    source: "",
  });

  const [isLoading, setIsLoading] = useState(false);
  const { register, handleSubmit, setFocus } = useForm<ISearch>();

  const onValid = async (data: ISearch) => {
    console.log(data);

    setIsLoading(true);

    const searchedMena = await searchWord(data.source, data.word);
    setWord({
      word: data.word,
      mean: searchedMena.mean,
      source: data.source,
    });

    setIsLoading(false);
  };

  useEffect(() => {
    setFocus("word");
  }, []);

  return (
    <Container>
      <Title>단어 검색</Title>
      <Form onSubmit={handleSubmit(onValid)}>
        <Select {...register("source")}>
          <option value={"ko"}>한국어</option>
          <option value={"ja"}>일본어</option>
        </Select>

        <SInput placeholder="단어를 입력해주세요." {...register("word")} />

        <SButton type={"submit"}>찾기</SButton>
      </Form>

      {isLoading ? (
        <Loading text="Loading..." />
      ) : word.word === "" ? null : (
        <Search {...word} known={"false"} id={0} />
      )}
      <Aaaaaaa />
    </Container>
  );
};

export default Home;
