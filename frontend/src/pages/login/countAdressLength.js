//メールアドレスの長さを確認
export const countAddressLength = (email) => {
  const splitEmail = email.split("@");

  if (splitEmail[0] && splitEmail[1]) {
    const emailLength = email.length;
    const localPart = splitEmail[0].length;
    const domain = splitEmail[1].length;
    console.log([localPart, domain]);

    if (emailLength > 254 || localPart > 64) {
      return false;
    } else {
      return true;
    }
  }
};
