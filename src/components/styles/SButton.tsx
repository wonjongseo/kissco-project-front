import styled from "styled-components";

const Button = styled.button`
  margin-left: 10px;
  background-color: #a5f1e9;
  border: 1px solid rgba(0, 0, 0, 0.2);
  border-radius: 10px;
  padding: 15px 36px;
  font-size: 15px;
  &:hover {
    cursor: pointer;
  }
`;

const SButton = ({ value, onClick }: any) => {
  return <Button onClick={onClick}>{value} </Button>;
};

export default SButton;
