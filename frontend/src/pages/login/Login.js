import { useContext, useState } from "react";
import { useHistory } from "react-router-dom";
import styled from "styled-components";
import { getUserInfo } from "../../api/api";
import { TextContext } from "../../providers/textProvider";
import { useForm } from "react-hook-form";

export const Login = () => {
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

  const [loginErrorMessage, setLoginErrorMessage] = useState();

  //新規登録ページへ画面遷移
  const transitionSignUpPage = async () => {
    history.push("/signUp");
  };

  //ログイン
  const userLogin = async () => {
    await getUserInfo(watch("email"), watch("password")).then(async (res) => {
      if (res.data.length !== 0) {
        const userData = { id: res.data[0].id, name: res.data[0].user_name };
        sessionStorage.setItem("userData", JSON.stringify(userData));
        await login();
      } else {
        setLoginErrorMessage("入力内容に誤りがあります。");
        setTimeout(() => {
          setLoginErrorMessage("");
        }, 3000);
      }
    });
  };

  return (
    <>
      <SLoginWrapper>
        <SLoginInputArea onSubmit={handleSubmit(userLogin)}>
          <p>ログイン</p>
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
          <SLoginButton type="submit">ログイン</SLoginButton>
          {loginErrorMessage && (
            <SVaridateMessage>{loginErrorMessage}</SVaridateMessage>
          )}
        </SLoginInputArea>
        <STransitionAuthPages onClick={transitionSignUpPage}>
          新規登録画面
        </STransitionAuthPages>
      </SLoginWrapper>
    </>
  );
};

export const SLoginWrapper = styled.div`
  margin: 50px;
  padding-bottom: 20px;
  width: 300px;
  height: 400px;
  background-color: #ccedee;
  display: inline-block;
`;

export const SLoginInputArea = styled.form`
  height: 100%;
  margin-top: 10px;
  display: flex;
  flex-direction: column;
`;

export const SLoginInput = styled.input`
  width: 200px;
  height: 20px;
  padding: 10px 10px;
  margin: 10px auto;
  border-radius: 8px;
  border: 1px solid;
`;

export const SLoginButton = styled.button`
  width: 220px;
  height: 40px;
  margin: auto auto 0 auto;
  border-radius: 8px;
  border: none;
  outline: none;
  &:hover {
    cursor: pointer;
  }
`;

export const STransitionAuthPages = styled.p`
  &:hover {
    cursor: pointer;
  }
`;

export const SVaridateMessage = styled.div`
  color: #e72035;
`;
