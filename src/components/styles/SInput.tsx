import styled from "styled-components";

const SInput = styled.input`
  padding: ${(p) => p.theme.input_padding};
  font-size: ${(p) => p.theme.input_font_size};
  margin-left: 5px;
`;

export default SInput;
