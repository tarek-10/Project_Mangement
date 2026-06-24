const { StatusCodes } = require("http-status-codes");

module.exports = (schema) => {
  return (req, res, next) => {
    let checkMethod = ["body", "params", "query", "file"];
    let validationErr = [];

    checkMethod.forEach((key) => {
      if (req[key]) {
        if (schema[key]) {
          let validationResult = schema[key].validate(req[key]);
          if (validationResult.error) {
            validationErr.push(validationResult.error.details[0].message);
          }
        }
      }
    });

    if (validationErr.length) {
      res
        .status(StatusCodes.BAD_REQUEST)
        .json({ message: validationErr.join() });
      return;
    }

    next();
  };
};
