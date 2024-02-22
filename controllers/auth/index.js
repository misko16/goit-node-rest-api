const {register} = require('./registerController');
const {login} = require('./loginController');
const {logout} = require('./logOutController');
const {current} = require('./currentController');

module.exports = {register, login, logout, current};
