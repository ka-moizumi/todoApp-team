import { useContext } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { TextContext } from "../../providers/textProvider";

export const Header = () => {
  const { logOut } = useContext(TextContext);

  const userData = JSON.parse(sessionStorage.getItem("userData"));

  return (
    <SHeader>
      <SHeaderIndex>
        <SLink to="/">ホーム</SLink>
      </SHeaderIndex>
      <SHeaderIndex>
        <SLink to={`/create/${userData.id}`}>Todo新規作成</SLink>
      </SHeaderIndex>
      <SHeaderIndex>
        <SLink to={`/list/${userData.id}`}>Todoリスト一覧</SLink>
      </SHeaderIndex>
      <SUserName>ユーザ：{userData.name}</SUserName>
      <SLogOUt onClick={logOut}>ログアウト</SLogOUt>
    </SHeader>
  );
};

const SHeader = styled.div`
  height: 50px;
  background-color: #0075c2;
  display: flex;
  justify-content: center;
  position: relative;
`;

const SHeaderIndex = styled.div`
  textdecoration: none;
  padding: 10px 0;
  margin: 0 10px;
`;

export const SLink = styled(Link)`
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

const SUserName = styled.div`
  color: #ffffff;
  right: 140px;
  margin: 10px 0;
  position: absolute;
`;

export const SLogOUt = styled.button`
  height: 40px;
  right: 50px;
  margin-top: 5px;
  background-color: #ebf4fb;
  position: absolute;
  border-radius: 10px;
  border: none;
  outline: none;
  &: hover {
    cursor: pointer;
    background-color: #dae3ea;
  }
`;
