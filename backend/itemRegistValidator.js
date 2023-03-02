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
      .isEmail()
      .isLength({ min: 5, max: 253 })
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
    check("user").not().isEmpty(),
    check("password").not().isEmpty().isLength({ min: 5 }),
  ],

  getUser: [
    check("email").notEmpty().isEmail().isLength({ min: 5, max: 253 }),
    check("password").notEmpty().isLength({ min: 5 }),
  ],

  addTodo: [
    check("title").not().isEmpty(),
    check("content").notEmpty(),
    check("priority").notEmpty().isIn([1, 2, 3]),
    check("user_id").notEmpty().isInt(),
    check("deadline")
      .notEmpty()
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
    check("completion").notEmpty().isBoolean(),
    check("id").notEmpty().isInt(),
  ],

  editTodo: [
    check("title").notEmpty(),
    check("content").notEmpty(),
    check("priority").notEmpty().isIn([1, 2, 3]),
    check("user_id").notEmpty().isInt(),
    check("deadline")
      .notEmpty()
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
    check("id").notEmpty().isInt(),
  ],

  deleteTodo: [check("todoId").notEmpty().isInt()],

  clearTodos: [check("userId").notEmpty().isInt()],
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
