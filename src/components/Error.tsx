import styled from "styled-components";

const SError = styled.div`
  color: tomato;
  margin-bottom: 20px;
`;

interface IProp {
  message?: string;
}
const Error = ({ message }: IProp) => {
  return <SError>{message}</SError>;
};

export default Error;
