import styled from "styled-components";

const SWord = styled.div`
  display: flex;

  font-size: 20px;
  div {
    width: ${(p) => p.theme.word_size};
  }
`;
export default SWord;
