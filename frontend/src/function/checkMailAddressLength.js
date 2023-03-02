//メールアドレスの長さを確認
export const checkMailAddressLength = (email) => {
  const splitEmail = email.split("@");

  if (splitEmail[0] && splitEmail[1]) {
    const emailLength = email.length;
    const localPart = splitEmail[0].length;

    if (emailLength < 255 && localPart < 65) {
      return true;
    }
  }
  return false;
};
