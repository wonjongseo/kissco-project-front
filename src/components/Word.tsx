import { useEffect, useState } from "react";
import { render } from "react-dom";
import { useLocation, useNavigate } from "react-router-dom";
import styled from "styled-components";
import { changeIsKnown, deleteVoca } from "../api";
import SButton from "./styles/SButton";
import SSelect from "./styles/SSelect";

export interface GetIWord {
  word: string;
  mean: string;
  id: number;
  known: string;
  source: string;
}

const Form = styled.div`
  margin-top: 11px;
  display: flex;
  align-items: center;
  /* background-color: red; */
`;

const SWord = styled.div`
  font-size: 20px;
  margin-right: 10px;
`;

const Word = (data: GetIWord) => {
  const nav = useNavigate();
  const { pathname } = useLocation();
  const onIsKnownChange = async (event: any) => {
    const {
      target: { value },
    } = event;

    console.log(value);

    await changeIsKnown(data.id, value);

    nav(0);
  };
  const onDeleteClick = async () => {
    console.log(data.id);

    await deleteVoca(data.id, 1);
    nav(0);
  };

  return (
    <Form>
      <SWord>
        {data.word} {data.mean}
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
    </Form>
  );
};

export default Word;
