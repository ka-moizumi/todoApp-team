import { getUserCountToEmail } from "../api/api";

//　アドレスの重複チェック
export const checkDuplicateEmail = async (email) => {
  try {
    const userCount = await getUserCountToEmail(email);
    if (userCount.data[0].userCount === 0) return true;
    return false;
  } catch (err) {
    return "サーバエラーが発生しました。";
  }
};
