import styled from "styled-components";

const SSelect = styled.select`
  background-color: #a5f1e9;
  border: 1px solid rgba(0, 0, 0, 0.2);
  font-size: ${(p) => p.theme.select_font_size};
  text-align: center;
  padding: ${(p) => p.theme.select_padding};
  border-radius: 10px;
  box-shadow: 1px 1px 1px;
  &:hover {
    cursor: pointer;
  }
`;

export default SSelect;
