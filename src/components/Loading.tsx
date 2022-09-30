import styled from "styled-components";

const Container = styled.div`
  margin: 10px 0;
  font-size: 20px;
  color: rgba(0, 0, 0, 0.5);
`;

interface IProps {
  text: string;
}
const Loading = ({ text }: IProps) => {
  return <Container>{text}</Container>;
};

export default Loading;
