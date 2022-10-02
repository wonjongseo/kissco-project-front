import styled from "styled-components";

const SButton = styled.button`
  margin-left: 10px;
  background-color: #a5f1e9;
  border: 1px solid rgba(0, 0, 0, 0.2);
  border-radius: 10px;
  font-size: ${(p) => p.theme.button_font_size};
  padding: ${(p) => p.theme.button_padding};
  box-shadow: 1px 1px 1px;
  &:hover {
    cursor: pointer;
  }
`;

export default SButton;
