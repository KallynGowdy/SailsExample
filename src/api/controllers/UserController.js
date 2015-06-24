/**
 * UserController
 *
 * @description :: Server-side logic for managing users
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {

  /**
   * `UserController.login()`
   */
  login: function (req, res) {
    return res.login({
      email: req.param('email'),
			password: req.param('password'),
			successRedirect: '/',
			invalidRedirect: '/login'
    });
  },


  /**
   * `UserController.logout()`
   */
  logout: function (req, res) {
		req.session.authenticated = null;

		if(req.wantsJSON){
			return res.ok('Logged out successfully!');
		}

		return res.redirect('/');
  },


  /**
   * `UserController.signup()`
   */
  signup: function (req, res) {
		User.signup({
			name: req.param('name'),
			email: req.param('email'),
			password: req.param('password')
		}, function(err, user){
			if(err) return res.negotiate(err);

			req.session.authenticated = user.id;

			if(req.wantsJSON){
				req.ok('Signup successful!');
			}

			return res.redirect('/welcome');
		});
  }
};
