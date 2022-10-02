import { useEffect, useState } from "react";
import { render } from "react-dom";
import { useLocation, useNavigate } from "react-router-dom";
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

  const { pathname } = useLocation();

  const onIsKnownChange = async (event: any) => {
    const {
      target: { value },
    } = event;

    await changeIsKnown(data.id, +userId!, value);

    nav(0);
  };
  const onDeleteClick = async () => {
    await deleteVoca(data.id, +userId!);
    nav(0);
  };

  return (
    <WordContainer>
      <SWord>
        <div>{data.word}</div>
        <div>{data.mean}</div>
      </SWord>
      {pathname === "/" ? null : (
        <SSelect onChange={onIsKnownChange}>
          {data.known === "false" ? (
            <>
              <option value={"false"}>모름</option>
              <option value={"true"}>앎</option>
            </>
          ) : (
            <>
              <option value={"true"}>앎</option>
              <option value={"false"}>모름</option>
            </>
          )}
        </SSelect>
      )}

      <SButton onClick={onDeleteClick}>삭제</SButton>
    </WordContainer>
  );
};

export default Word;
