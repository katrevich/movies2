const mongoose = require('mongoose');
const App = mongoose.model('App');

module.exports = (req, res, next) => {
  App.findOne({}, (err, app) => {
    if(!err && app.voting){
      next();
    } else {
      res.status(400).send({success: false, error: "Voting ended!"});
    }
  })
}
