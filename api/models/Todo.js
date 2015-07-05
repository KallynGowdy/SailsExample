/**
 * Created by Kal on 7/4/2015.
 */
module.exports = {

  attributes: {
    text: {type: 'string', required: true},
    checked: {type: 'boolean', required: false}
  },

  new: function (inputs, callback) {
    Todo.create({
      text: inputs.text,
      checked: inputs.checked
    }).exec(function (err, data) {
      if (!err) {
        Todo.publishCreate({id: data.id, text: data.text, checked: data.checked});
      }
      callback(err, data);
    });
  },

  updateAndPublish: function (req, inputs, callback) {
    Todo.update({id: inputs.id}, {
      text: inputs.text,
      checked: inputs.checked,
      id: inputs.id
    }).exec(function (err, data) {
      if (!err) {
        Todo.publishUpdate(data[0].id, { checked: data[0].checked }, req.socket);
      }
      callback(err, data);
    });
  }
};
