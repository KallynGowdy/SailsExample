/**
 * Created by Kal on 7/4/2015.
 */
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


  addTodo: function(req, res){
    var data = req.params.all();

    if(req.isSocket && req.method === 'POST'){
      Todo.new(data, function(err, data){
        if(!err){
          console.log('Todo Successfully Created With: "' + data.text + '"');
          res.ok();
        }else{
          res.serverError();
        }
      });
    }
    else if(req.isSocket){
      Todo.watch(req.socket);
      console.log('User subscribed to ' + req.socket.id);
      res.ok();
    }
  }

};
