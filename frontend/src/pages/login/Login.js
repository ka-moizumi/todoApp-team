import { useContext } from "react";
import { useHistory } from "react-router-dom";
import styled from "styled-components";
import { getUserInfo } from "../../api/api";
import { TextContext } from "../../providers/textProvider";
import { useInput } from "../../hooks/useInput";

export const Login = () => {
  const history = useHistory();
  const { login } = useContext(TextContext);

  const email = useInput();
  const password = useInput();

  //新規登録ページへ画面遷移
  const transitionSignUpPage = async () => {
    history.push("/signUp");
  };

  //ログイン
  const userLogin = async () => {
    if (email.text === "" || password.text === "") return;
    await getUserInfo(email.text, password.text).then(async (res) => {
      const userData = { id: res.data[0].id, name: res.data[0].user_name };
      console.log(userData);
      sessionStorage.setItem("userData", JSON.stringify(userData));
      await login();
    });
  };

  return (
    <>
      <SLoginWrapper>
        <p>ログイン</p>
        <SLoginInputArea>
          <SLoginInput
            name="email"
            type="email"
            placeholder="メールアドレス"
            onChange={email.textOnChange}
          />
          <SLoginInput
            name="password"
            type="password"
            placeholder="パスワード"
            onChange={password.textOnChange}
          />
        </SLoginInputArea>
        <SLoginButton onClick={userLogin}>ログイン</SLoginButton>
      </SLoginWrapper>
      <p onClick={transitionSignUpPage}>新規登録画面</p>
    </>
  );
};

export const SLoginWrapper = styled.div`
  margin-top: 50px;
  width: 300px;
  height: 400px;
  background-color: #ccedee;
  display: inline-block;
`;

export const SLoginInputArea = styled.form`
  margin-top: 50px;
`;

export const SLoginInput = styled.input`
  width: 200px;
  height: 30px;
  padding: 0 10px;
  margin: 10px 0;
  border-radius: 8px;
  border: 1px solid;
`;

export const SLoginButton = styled.button`
  width: 220px;
  height: 40px;
  border-radius: 8px;
  border: none;
  outline: none;
`;
