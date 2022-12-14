import { Link } from "react-router-dom";
import { useRecoilValue } from "recoil";
import styled from "styled-components";
import { userIdVar, windowWidthVar } from "../atoms";
import { JOIN_PATH } from "../routes/Join";
import { LOGIN_PATH } from "../routes/Login";
import { LOGOUT_PATH } from "../routes/Logout";
import { WORDS_PATH } from "../routes/Words";
import { Helmet } from "react-helmet-async";
import { BASE_URL } from "../api";
const Sidebar = styled.div<{ width: number }>`
  position: fixed;
  padding: 0px 10px;
  height: 100vh;
  width: ${(p) => (p.width <= 610 ? "0" : "20vw")};
  background-color: #a5f1e9;
  display: flex;
  flex-direction: column;
  align-items: center;
  box-shadow: 2.5px 2.5px 2.5px 2.5px rgba(0, 0, 0, 0.5);
`;

const Title = styled.span<{ width: number }>`
  margin-top: 40px;
  font-size: ${(p) => (p.width > 1000 ? "50px" : "20px")};
  font-weight: ${(p) => (p.width > 1000 ? "700" : "600")};
  color: white;
`;

const Seperator = styled.div`
  margin: 40px 0;
  width: 100%;
  box-shadow: 1px 1px 3px;
  height: 1px;
  background-color: rgba(0, 0, 0, 0.2);
`;

const NavButton = styled.span<{ width: number }>`
  margin-bottom: ${(p) => (p.width > 1000 ? "80px" : "50px")};
  font-weight: ${(p) => (p.width > 1000 ? "600" : "700")};
  font-size: ${(p) => (p.width > 1000 ? "28px" : "17px")};

  &:hover {
    cursor: pointer;
  }
`;

const Content = styled.div<{ width: number }>`
  margin-left: ${(p) => (p.width <= 610 ? "5vw" : "20vw")};
  display: flex;
  height: 100vh;

  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

interface IChildren {
  children: React.ReactNode;
  title: string;
}
const Container = ({ children, title }: IChildren) => {
  const width = useRecoilValue(windowWidthVar);
  const userId = useRecoilValue(userIdVar);

  const onDownloadClick = () => {
    window.location.href = `${BASE_URL}/api/vocas/download/${userId}`;
  };

  return (
    <>
      <Helmet>
        <title>{title}</title>
      </Helmet>
      <Sidebar width={width}>
        <Title width={width}>
          <Link to={"/"}>이지단어</Link>
        </Title>

        <Seperator />
        <NavButton width={width}>
          <Link to={"/"}>단어 검색</Link>
        </NavButton>
        {userId !== null ? (
          <>
            <NavButton width={width}>
              <Link to={`${WORDS_PATH}/1/asc/all`}>단어장</Link>
            </NavButton>
            <NavButton onClick={onDownloadClick} width={width}>
              다운로드
            </NavButton>
            <NavButton width={width}>
              <Link to={LOGOUT_PATH}>로그아웃</Link>
            </NavButton>
          </>
        ) : (
          <>
            <NavButton width={width}>
              <Link to={JOIN_PATH}>회원가입</Link>
            </NavButton>
            <NavButton width={width}>
              <Link to={LOGIN_PATH}>로그인</Link>
            </NavButton>
          </>
        )}
      </Sidebar>
      <Content width={width}>
        <>{children}</>
      </Content>
    </>
  );
};

export default Container;
