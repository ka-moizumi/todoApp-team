import { useContext } from "react";
import { useHistory } from "react-router-dom";
import { signUpInfo, getUserInfo } from "../../api/api";
import { TextContext } from "../../providers/textProvider";
import { useInput } from "../../hooks/useInput";
import {
  SLoginButton,
  SLoginInput,
  SLoginInputArea,
  SLoginWrapper,
} from "./Login";

export const SignUp = () => {
  const history = useHistory();
  const { login } = useContext(TextContext);

  const transitionLoginPage = () => {
    history.push("/");
  };

  // アカウント作成
  const signUpAccount = async () => {
    if (email.text === "" || user.text === "" || password.text === "") return;
    // ユーザを登録
    await signUpInfo(email.text, user.text, password.text);

    // ユーザ情報を取得
    await getUserInfo(email.text, password.text).then(async (res) => {
      const userData = { id: res.data[0].id, name: res.data[0].user_name };
      sessionStorage.setItem("userData", JSON.stringify(userData));
      await login();
      history.push("/");
    });
  };

  const user = useInput();
  const email = useInput();
  const password = useInput();

  return (
    <>
      <SLoginWrapper>
        <p>アカウント作成</p>
        <SLoginInputArea>
          <SLoginInput
            name="name"
            type="text"
            placeholder="ユーザ名"
            onChange={user.textOnChange}
          />
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
        <SLoginButton onClick={signUpAccount}>登録</SLoginButton>
      </SLoginWrapper>
      <p onClick={transitionLoginPage}>ログイン画面</p>
    </>
  );
};
