import { Link } from "react-router-dom";
import styled from "styled-components";

export const Header = () => {
  return (
    <SHeader>
      <SHeaderIndex>
        <SLink to="/">ホーム</SLink>
      </SHeaderIndex>
      <SHeaderIndex>
        <SLink to="/create">Todo新規作成</SLink>
      </SHeaderIndex>
      <SHeaderIndex>
        <SLink to="/list">Todoリスト一覧</SLink>
      </SHeaderIndex>
    </SHeader>
  );
};

const SHeader = styled.div`
  height: 50px;
  background-color: #0075c2;
  display: flex;
  justify-content: center;
`;

const SHeaderIndex = styled.div`
  textdecoration: none;
  padding: 10px 0;
  margin: 0 10px;
`;

const SLink = styled(Link)`
  text-decoration: none;
  &:focus,
  &:hover,
  &:visited,
  &:link,
  &:active {
    text-decoration: none;
    color: #ffffff;
  }
`;
