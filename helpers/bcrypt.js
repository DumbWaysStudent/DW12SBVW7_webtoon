const bcrypt = require('bcrypt');
const salt = bcrypt.genSaltSync(8);

exports.hash = password => {
  return bcrypt.hashSync(password, salt);
}