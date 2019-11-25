const logger = require('morgan')

const endPointAndDateConsole = (req, res, next) => {
  console.log(`Time: ${req._startTime}`);
  console.log(`Url: ${req.originalUrl}`);
  next();
};

module.exports = {
  endPointAndDateConsole,
};