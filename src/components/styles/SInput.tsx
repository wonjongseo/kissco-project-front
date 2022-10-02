import styled from "styled-components";

const SInput = styled.input`
  padding: ${(p) => p.theme.input_padding};
  font-size: ${(p) => p.theme.input_font_size};
  margin-left: 5px;
  padding-left: 15px;
  border: 1px solid rgba(0, 0, 0, 1);
  border-radius: 10px;

  &::placeholder {
    font-size: 13px;
  }
`;

export default SInput;
