const { body } = require("express-validator");

const validationSchema = () => {
  return [
    body("title")
      .notEmpty()
      .withMessage("title is required")
      .isLength({ min: 2 })
      .withMessage("title is at least 2 chars"),

    body("price").notEmpty().withMessage("price is required"),
  ];
};

module.exports = { validationSchema };
