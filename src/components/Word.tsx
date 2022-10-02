import { useEffect, useState } from "react";
import { render } from "react-dom";
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import { useRecoilValue } from "recoil";
import styled from "styled-components";
import { changeIsKnown, deleteVoca } from "../api";
import { userIdVar } from "../atoms";
import SButton from "./styles/SButton";
import SSelect from "./styles/SSelect";
import SWord from "./styles/SWord";

export interface GetIWord {
  word: string;
  mean: string;
  id: number;
  known: string;
}

const WordContainer = styled.div`
  padding-bottom: 25px;

  display: flex;
  align-items: center;
`;

const Word = (data: GetIWord) => {
  const nav = useNavigate();
  const userId = useRecoilValue(userIdVar);
  const params = useParams();

  const onIsKnownChange = async (event: any) => {
    const {
      target: { value },
    } = event;

    if (value === "delete") {
      await deleteVoca(data.id, +userId!);
    } else {
      if (params.is_known === "all") {
        await changeIsKnown(data.id, +userId!, value);
        return;
      }

      await changeIsKnown(data.id, +userId!, value);
    }
    nav(0);
  };

  return (
    <WordContainer>
      <SWord>
        <div>{data.word}</div>
        <div>{data.mean}</div>
      </SWord>
      <SSelect onChange={onIsKnownChange}>
        {data.known === "false" ? (
          <>
            <option value={"false"}>모름</option>
            <option value={"true"}>앎</option>
            <option value={"delete"}>삭제</option>
          </>
        ) : (
          <>
            <option value={"true"}>앎</option>
            <option value={"false"}>모름</option>
            <option value={"delete"}>삭제</option>
          </>
        )}
      </SSelect>
    </WordContainer>
  );
};

export default Word;
