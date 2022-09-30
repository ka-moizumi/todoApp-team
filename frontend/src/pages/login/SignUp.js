import { useContext } from "react";
import { useHistory } from "react-router-dom";
import { signUpInfo, getUserInfo } from "../../api/api";
import { TextContext } from "../../providers/textProvider";
import { useForm } from "react-hook-form";

import {
  SLoginButton,
  SLoginInput,
  SLoginInputArea,
  SLoginWrapper,
  SVaridateMessage,
} from "./Login";

export const SignUp = () => {
  const {
    register,
    watch,
    handleSubmit,
    formState: { errors },
  } = useForm({
    reValidateMode: "onSubmit",
    criteriaMode: "all",
  });

  const history = useHistory();
  const { login } = useContext(TextContext);

  const transitionLoginPage = () => {
    history.push("/");
  };

  // アカウント作成
  const signUpAccount = async () => {
    // ユーザを登録
    await signUpInfo(watch("email"), watch("name"), watch("password"));

    // ユーザ情報を取得
    await getUserInfo(watch("email"), watch("password")).then(async (res) => {
      const userData = { id: res.data[0].id, name: res.data[0].user_name };
      sessionStorage.setItem("userData", JSON.stringify(userData));
      await login();
      history.push("/");
    });
  };

  return (
    <>
      <SLoginWrapper>
        <SLoginInputArea onSubmit={handleSubmit(signUpAccount)}>
          <p>アカウント作成</p>
          <SLoginInput
            id="name"
            {...register("name", {
              required: {
                value: true,
                message: "入力は必須です。",
              },
            })}
            type="text"
            placeholder="ユーザ名"
          />
          {errors.name?.message && (
            <SVaridateMessage>{errors.name.message}</SVaridateMessage>
          )}
          <SLoginInput
            id="email"
            {...register("email", {
              required: {
                value: true,
                message: "入力は必須です。",
              },
            })}
            type="email"
            placeholder="メールアドレス"
          />
          {errors.email?.message && (
            <SVaridateMessage>{errors.email.message}</SVaridateMessage>
          )}
          <SLoginInput
            id="password"
            {...register("password", {
              required: {
                value: true,
                message: "入力は必須です。",
              },
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
        </SLoginInputArea>
        <p onClick={transitionLoginPage}>ログイン画面</p>
      </SLoginWrapper>
    </>
  );
};
