import { useContext, useState } from "react";
import { useHistory } from "react-router-dom";
import { signUpInfo, getUserInfo } from "../../api/api";
import { TextContext } from "../../providers/textProvider";
import { useForm } from "react-hook-form";
import { isMailLengthAcceptable } from "../../functional/isMaliLengthAcceptable";
import { hasDuplicatedData } from "../../functional/hasDuplicatedData";

import {
  SLoginButton,
  SLoginInput,
  SLoginInputArea,
  SLoginWrapper,
  STransitionAuthPages,
  SErrorMessage,
} from "./Login";

export const SignUp = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    reValidateMode: "onSubmit",
    criteriaMode: "all",
  });

  const history = useHistory();
  const { login } = useContext(TextContext);

  const [errorMessage, setErrorMessage] = useState();

  const transitionLoginPage = () => {
    history.push("/");
  };

  // アカウント作成
  const signUpAccount = async (data) => {
    try {
      // ユーザを登録
      await signUpInfo(data);
      // ユーザ情報を取得
      const resultUser = await getUserInfo(data);

      const userData = {
        id: resultUser.data[0].id,
        name: resultUser.data[0].user_name,
      };
      history.push("/");
      sessionStorage.setItem("userData", JSON.stringify(userData));
      login();
    } catch (err) {
      if (err.response.data.errors !== undefined) {
        setErrorMessage(err.response.data.errors[0].msg);
      } else {
        setErrorMessage("サーバーエラーが発生しました。");
      }
      setTimeout(() => {
        setErrorMessage();
      }, 5000);
    }
  };

  return (
    <>
      <SLoginWrapper>
        <SLoginInputArea onSubmit={handleSubmit(signUpAccount)}>
          <p>アカウント作成</p>
          <SLoginInput
            id="user"
            {...register("user", {
              required: "入力は必須です。",
            })}
            type="text"
            placeholder="ユーザ名"
          />
          {errors.user?.message && (
            <SErrorMessage>{errors.user.message}</SErrorMessage>
          )}
          <SLoginInput
            id="email"
            {...register("email", {
              required: "入力は必須です。",
              pattern: {
                value:
                  /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+\.+(?:[a-zA-Z0-9-]+)*$/,
                message: "メールアドレスの形式が不正です。",
              },
              validate: {
                length: (value) =>
                  isMailLengthAcceptable(value) ||
                  "メールアドレスの形式が不正です。",
                userCount: async (value) =>
                  (await hasDuplicatedData(value)) ||
                  "既に登録されたメールアドレスです。",
              },
            })}
            type="text"
            placeholder="メールアドレス"
          />
          {errors.email?.message && (
            <SErrorMessage>{errors.email.message}</SErrorMessage>
          )}
          <SLoginInput
            id="password"
            {...register("password", {
              required: "入力は必須です。",
              minLength: {
                value: 5,
                message: "5文字以上入力してください。",
              },
            })}
            type="password"
            placeholder="パスワード"
          />
          {errors.password?.message && (
            <SErrorMessage>{errors.password.message}</SErrorMessage>
          )}
          <SLoginButton type="submit">登録</SLoginButton>
          {errorMessage && <SErrorMessage>{errorMessage}</SErrorMessage>}
        </SLoginInputArea>
        <STransitionAuthPages onClick={transitionLoginPage}>
          ログイン画面
        </STransitionAuthPages>
      </SLoginWrapper>
    </>
  );
};
