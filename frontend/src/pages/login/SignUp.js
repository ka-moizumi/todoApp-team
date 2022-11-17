import { useContext, useState } from "react";
import { useHistory } from "react-router-dom";
import { signUpInfo, getUserInfo, getDuplicatedEmail } from "../../api/api";
import { TextContext } from "../../providers/textProvider";
import { useForm } from "react-hook-form";

import {
  SLoginButton,
  SLoginInput,
  SLoginInputArea,
  SLoginWrapper,
  STransitionAuthPages,
  SVaridateMessage,
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

  const [emailErrorMessage, setEmailErrorMessage] = useState();

  const transitionLoginPage = () => {
    history.push("/");
  };

  // アカウント作成
  const signUpAccount = async (data) => {
    // アドレスの重複確認
    await getDuplicatedEmail(data.email).then(async (res) => {
      if (!res.data[0].isDuplicatedEmail) {
        // ユーザを登録
        await signUpInfo(data);
        // ユーザ情報を取得
        await getUserInfo(data).then(async (res) => {
          const userData = { id: res.data[0].id, user: res.data[0].user_name };
          sessionStorage.setItem("userData", JSON.stringify(userData));
          await login();
          history.push("/");
        });
      } else {
        setEmailErrorMessage("既に登録されたメールアドレスです。");
        setTimeout(() => {
          setEmailErrorMessage();
        }, 3000);
      }
    });
  };

  return (
    <>
      <SLoginWrapper>
        <SLoginInputArea onSubmit={handleSubmit(signUpAccount)}>
          <p>アカウント作成</p>
          <SLoginInput
            id="user"
            {...register("user", {
              required: {
                value: true,
                message: "入力は必須です。",
              },
            })}
            type="text"
            placeholder="ユーザ名"
          />
          {errors.user?.message && (
            <SVaridateMessage>{errors.user.message}</SVaridateMessage>
          )}
          <SLoginInput
            id="email"
            {...register("email", {
              required: "入力は必須です。",
              pattern: {
                value:
                  /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/,
                message: "メールアドレスの形式が不正です。",
              },
            })}
            type="text"
            placeholder="メールアドレス"
          />
          {errors.email?.message && (
            <SVaridateMessage>{errors.email.message}</SVaridateMessage>
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
            <SVaridateMessage>{errors.password.message}</SVaridateMessage>
          )}
          <SLoginButton type="submit">登録</SLoginButton>
          {emailErrorMessage && (
            <SVaridateMessage>{emailErrorMessage}</SVaridateMessage>
          )}
        </SLoginInputArea>
        <STransitionAuthPages onClick={transitionLoginPage}>
          ログイン画面
        </STransitionAuthPages>
      </SLoginWrapper>
    </>
  );
};
