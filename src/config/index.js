const environment = process.env.TALENTOMOBILE_ENV;

let config = require('./dev.json');

try {
  config = require(`./${environment}.json`);
} catch (err) {
  console.error('Error while getting config. Falling back to dev.json');
}

module.exports = {
  ...config,
};