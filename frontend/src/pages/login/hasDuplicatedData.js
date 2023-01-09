import { getUserCountToEmail } from "../../api/api";

//　アドレスの重複チェック
export const hasDuplicatedData = async (email) => {
  try {
    const userCount = await getUserCountToEmail(email);

    if (userCount.data[0].userCount !== 0) {
      return false;
    } else {
      return true;
    }
  } catch (err) {
    // 実装方法調査中
    console.log("サーバエラーが発生しました。");
  }
};
