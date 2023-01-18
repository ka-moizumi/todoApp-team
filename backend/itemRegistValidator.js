const { check, validationResult } = require("express-validator");

const checkVaridationResult = (req, res) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    // バリデーション失敗
    return res.status(422).json({ errors: errors.array() });
  }
};

module.exports = {
  signUp: [
    check("email")
      .notEmpty()
      .withMessage("全ての項目の入力が必須です。")
      .isEmail()
      .withMessage("メールアドレスの形式が不正です。")
      .isLength({ min: 5, max: 253 })
      .withMessage("メールアドレスの形式が不正です。")
      .custom(async (value) => {
        try {
          const userCount = await getUserCountToEmail(value);
          if (userCount > 0) {
            return Promise.reject("既に登録されたメールアドレスです。");
          }
        } catch (err) {
          return Promise.reject(err);
        }
      }),
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
      .notEmpty()
      .withMessage("全ての項目の入力が必須です。")
      .isEmail()
      .withMessage("メールアドレスの形式が不正です。")
      .isLength({ min: 5, max: 253 })
      .withMessage("メールアドレスの形式が不正です。"),
    check("password")
      .notEmpty()
      .withMessage("全ての項目の入力が必須です。")
      .isLength({ min: 5 })
      .withMessage("パスワードは5文字以上入力してください。"),
  ],

  addTodo: [
    check("title").not().isEmpty().withMessage("全ての項目の入力が必須です。"),
    check("content").notEmpty().withMessage("全ての項目の入力が必須です。"),
    check("priority")
      .notEmpty()
      .withMessage("全ての項目の入力が必須です。")
      .isIn([1, 2, 3]),
    check("user_id")
      .notEmpty()
      .withMessage("全ての項目の入力が必須です。")
      .isInt(),
    check("deadline")
      .notEmpty()
      .withMessage("全ての項目の入力が必須です。")
      .custom((value) => {
        const matches = value.match(/^(\d{4})\/(\d{1,2})\/(\d{1,2})$/);
        const today = new Date();
        const date = new Date(value);

        date.setDate(date.getDate() + 1);

        if (!matches || isNaN(date)) {
          return Promise.reject("「YYYY/MM/DD」の正しい日付ではありません。");
        }

        if (date < today) {
          return Promise.reject("本日以降の日付にしてください。");
        }
        return true;
      }),
  ],

  completionChange: [
    check("completion")
      .notEmpty()
      .withMessage("全ての項目の入力が必須です。")
      .isBoolean(),
    check("id").notEmpty().withMessage("全ての項目の入力が必須です。").isInt(),
  ],

  editTodo: [
    check("title").notEmpty().withMessage("全ての項目の入力が必須です。"),
    check("content").notEmpty().withMessage("全ての項目の入力が必須です。"),
    check("priority")
      .notEmpty()
      .withMessage("全ての項目の入力が必須です。")
      .isIn([1, 2, 3]),
    check("user_id")
      .notEmpty()
      .withMessage("全ての項目の入力が必須です。")
      .isInt(),
    check("deadline")
      .notEmpty()
      .withMessage("全ての項目の入力が必須です。")
      .custom((value) => {
        const matches = value.match(/^(\d{4})\/(\d{1,2})\/(\d{1,2})$/);
        const today = new Date();
        const date = new Date(value);

        date.setDate(date.getDate() + 1);

        if (!matches || isNaN(date)) {
          return Promise.reject("「YYYY/MM/DD」の正しい日付ではありません。");
        }

        if (date < today) {
          return Promise.reject("本日以降の日付にしてください。");
        }
        return true;
      }),
    check("id")
      .notEmpty()
      .withMessage("全ての項目の入力が必須です。")
      .isInt()
      .withMessage("整数で入力してください。"),
  ],

  deleteTodo: [
    check("todoId")
      .notEmpty()
      .withMessage("入力が必須の項目です。")
      .isInt()
      .withMessage("整数で入力してください。"),
  ],

  clearTodos: [
    check("userId")
      .notEmpty()
      .withMessage("入力が必須の項目です。")
      .isInt()
      .withMessage("整数で入力してください。"),
  ],
};

module.exports.checkVaridationResult = checkVaridationResult;

const index = require("./index");

const getUserCountToEmail = async (email) => {
  try {
    const sql =
      "SELECT count(id) AS userCount FROM USER WHERE mail_address = ?";
    const results = await index.executeQuery(sql, email);
    return results[0].userCount;
  } catch (err) {
    return err;
  }
};
