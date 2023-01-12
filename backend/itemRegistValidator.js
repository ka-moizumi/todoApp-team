const { check } = require("express-validator");

module.exports = {
  signUp: [
    check("email")
      .not()
      .isEmpty()
      .withMessage("全ての項目の入力が必須です。")
      .isEmail()
      .withMessage("メールアドレスの形式が不正です。")
      .isLength({ min: 5, max: 253 })
      .withMessage("メールアドレスの形式が不正です。"),
    check("user").not().isEmpty().withMessage("全ての項目の入力が必須です。"),
    check("password")
      .not()
      .isEmpty()
      .withMessage("全ての項目の入力が必須です。")
      .isLength({ min: 5 })
      .withMessage("パスワードは5文字以上入力してください。"),
  ],

  getUser: [
    check("email")
      .not()
      .isEmpty()
      .withMessage("全ての項目の入力が必須です。")
      .isEmail()
      .withMessage("メールアドレスの形式が不正です。")
      .isLength({ min: 5, max: 253 })
      .withMessage("メールアドレスの形式が不正です。"),
    check("password")
      .not()
      .isEmpty()
      .withMessage("全ての項目の入力が必須です。")
      .isLength({ min: 5 })
      .withMessage("パスワードは5文字以上入力してください。"),
  ],

  addTodo: [
    check("title").not().isEmpty().withMessage("全ての項目の入力が必須です。"),
    check("content")
      .not()
      .isEmpty()
      .withMessage("全ての項目の入力が必須です。"),
    check("priority")
      .not()
      .isEmpty()
      .withMessage("全ての項目の入力が必須です。")
      .isIn([1, 2, 3]),
    check("user_id")
      .not()
      .isEmpty()
      .withMessage("全ての項目の入力が必須です。")
      .isInt(),
    check("deadline")
      .not()
      .isEmpty()
      .withMessage("全ての項目の入力が必須です。")
      .custom((value) => {
        const matches = value.match(/^(\d{4})\/(\d{1,2})\/(\d{1,2})$/);
        const today = new Date();
        const date = new Date(value);

        date.setDate(date.getDate() + 1);

        if (!matches || isNaN(date)) {
          throw new Error("「YYYY/MM/DD」の正しい日付ではありません。");
        }

        if (date < today) {
          throw new Error("本日以降の日付にしてください。");
        }
        return true;
      }),
  ],

  completisionChange: [
    check("completion")
      .not()
      .isEmpty()
      .withMessage("全ての項目の入力が必須です。")
      .isBoolean(),
    check("id")
      .not()
      .isEmpty()
      .withMessage("全ての項目の入力が必須です。")
      .isInt(),
  ],

  editTodo: [
    check("title").not().isEmpty().withMessage("全ての項目の入力が必須です。"),
    check("content")
      .not()
      .isEmpty()
      .withMessage("全ての項目の入力が必須です。"),
    check("priority")
      .not()
      .isEmpty()
      .withMessage("全ての項目の入力が必須です。")
      .isIn([1, 2, 3]),
    check("user_id")
      .not()
      .isEmpty()
      .withMessage("全ての項目の入力が必須です。")
      .isInt(),
    check("deadline")
      .not()
      .isEmpty()
      .withMessage("全ての項目の入力が必須です。")
      .custom((value) => {
        const matches = value.match(/^(\d{4})\/(\d{1,2})\/(\d{1,2})$/);
        const today = new Date();
        const date = new Date(value);

        date.setDate(date.getDate() + 1);

        if (!matches || isNaN(date)) {
          throw new Error("「YYYY/MM/DD」の正しい日付ではありません。");
        }

        if (date < today) {
          throw new Error("本日以降の日付にしてください。");
        }
        return true;
      }),
  ],
};
