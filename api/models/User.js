/**
* User.js
*
* @description :: TODO: You might write a short summary of how this model works and what it represents here.
* @docs        :: http://sailsjs.org/#!documentation/models
*/

module.exports = {

  attributes: {

    email : { type: 'string', required: true },

    password : { type: 'string', required: true }
  },

/**
 * Create a new user using the provided inputs.
 * @param  {Object}   inputs
 *         						- name     {String}
 *         						- email    {String}
 *         						- password {String}
 * @param  {Function} callback The callback
 */
  signup: function(inputs, callback){
    User.create({
      name: inputs.name,
      email: inputs.email,

      // TODO: Hash password first :P
      password: inputs.password
    }).exec(callback);
  },

/**
 * Check valid-ness of a login using the provided inputs.
 * @param  {[type]}   inputs
 *         						- email    {String}
 *         						- password {String}
 * @param  {Function} callback The callback.
 */
  attemptLogin: function(inputs, callback){
    User.findOne({
      email: inputs.email,

      password: inputs.password
    }).exec(callback);
  }
};
