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
    // アドレスの重複確認;
    try {
      const resultEmail = await getDuplicatedEmail(data.email);
      if (!resultEmail.data[0].isDuplicatedEmail) {
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
      } else {
        setErrorMessage("既に登録されたメールアドレスです。");
        setTimeout(() => {
          setErrorMessage();
        }, 3000);
      }
    } catch (err) {
      setErrorMessage(`エラーが発生しました。コード:${err.response.status}`);
      setTimeout(() => {
        setErrorMessage();
      }, 5000);
    }
  };

  //メールアドレスの長さを確認
  const countAddressLength = (email) => {
    const splitEmail = email.split("@");

    if (splitEmail[0] && splitEmail[1]) {
      const emailLength = email.length;
      const localPart = splitEmail[0].length;
      const domain = splitEmail[1].length;
      console.log([localPart, domain]);

      if (emailLength < 255 && (localPart > 64 || domain > 253)) {
        return false;
      } else {
        return true;
      }
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
                  /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/,
                message: "メールアドレスの形式が不正です。",
              },
              maxLength: {
                value: 254,
                message: "254文字以内。",
              },
              validate: {
                length: (value) =>
                  countAddressLength(value) ||
                  "”64文字以内”@”253文字以内”の形式。",
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
