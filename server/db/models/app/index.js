const mongoose = require('mongoose');

const appSchema = new mongoose.Schema({
  voting: {
    type: Boolean,
    default: true
  }
});

const App = mongoose.model('App', appSchema);
