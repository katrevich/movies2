const mongoose = require('mongoose');
const config = require('../db');
const Movie = mongoose.model('Movie');
const User = mongoose.model('User');
const App = mongoose.model('App');
const encrypt = require('../helpers/encrypt');
const jwt = require('jsonwebtoken');

const controller = {
  addMovie: (req, res) => {
    let movie = req.body.movie;
    Object.assign(movie, {username: req.body.username, voters: [req.body.username]});
    var movieModel = new Movie(movie);

    movieModel.save((err) => {
      if(err){
        res.status(400).send({success: false, error: "Movie not added"});
        console.log(err);
      } else {
        res.send({success: true, message: 'Movie successfuly added!'});
      }
    });
  },

  voteForMovie: (req, res) => {
    Movie.update({title: req.body.movie.title}, {$addToSet: {"voters": req.body.username}}, (err) => {
      if(err) {
        res.status(400).send({success: false, error: "Movie not added"});
      } else {
        res.send({success: true, message: "Vote counted!"});
      }
    })
  },

  getMovies: (req, res) => {
    Movie.find({}, (err, movies) => {
      res.send(movies);
    })
  },

  removeMovie: (req, res) => {
    Movie.remove({title: req.body.movie.title}, (err) => {
      if(err) {
        res.status(400).send({success: false, error: "Movie not removed"});
      } else {
        res.status(200).send({success: true, message: "Movie succesfuly removed!"})
      }
    })
  },

  veto: (req, res) => {
    User.findOne({username: req.body.username}, (err, user) => {
      if(err) throw err;

      if(user && !user.vetoed) {
        Movie.findOne({title: req.body.movie.title}, (err, movie) => {
          if(movie) {
            movie.veto = true;
            movie.save(err => {
              if(err) {
                res.status(400).send({success: false, error: "Movie not founed"});
              } else {
                user.vetoed = true;
                user.save((err) => {
                  if(err) {
                    res.status(400).send({success: false, error: "User not founed"});
                  } else {
                    res.send({success: true, message: "Veto accepted!", user});
                  }
                })
              }
            })
          }
        })
      } else {
        res.status(403).send({success: false, error: "Only one veto per voting!"});
      }
    })
  },

  register: (req, res) => {
    let u = req.body.user;
    User.findOne({ username: u.username }, (err, user) => {
      if(err) throw err;

      if(!user) {
        encrypt.encrypt(u.password, hash => {
          let user = new User({
            username: u.username,
            password: hash
          });
          user.save(err => {
            if(err){
              res.send(err);
              console.log(err);
            } else {
              res.send({success: true, message: "User succesfuly added"});
            }
          })
        })
      } else {
        res.status(400).send({success: false, error: `User: ${u.username} already exists`});
      }
    })
  },

  login: (req, res) => {
    User.findOne({ username: req.body.username }, (err, user) => {
      if(err) throw err;

      if(user) {
        encrypt.compare(req.body.password, user.password, valid => {
          if(valid) {
            let token = jwt.sign({username: user.username, password: user.password}, config.secret, {
              expiresIn : 60*60*24
            });
            user.token = token;
            user.save((err, savedUser) => {
              if(!err) {
                res.send({
                  success: true,
                  username: savedUser.username,
                  vetoed: savedUser.vetoed,
                  admin: savedUser.admin,
                  token: savedUser.token
                })
              }
            })
            
          } else {
            res.status(200).send({success: false, error: 'Wrong username or password'});
          }
        })
      } else {
        res.status(200).send({success: false, error: 'Wrong username or password'});
      }
    })
  },

  getUsers: (req, res) => {
    User.find({}, (err, users) => {
      res.send(users);
    })
  },

  getUser: (req, res) => {
    User.findOne({token: req.get('Authorization')}, (err, user) => {
      if(!err){
        res.status(200).send(user);
      } else {
        res.status(400).send({success: false, error:"No such user"})
      }
    })
  },

  removeUser: (req, res) => {
    let user = req.body.user;
    if(user.username === 'admin') {
      res.status(401).send({success: false, error: "User could not be removed!"})
    } else {
      User.remove({username: user.username}, (err) => {
        if(!err){
          res.status(200).send({success: true, message: "User succesfuly removed!"})
        } else {
          res.status(401).send({success: false, error: "User could not be removed!"})
        }
      })
    }
  },

  updateUser: (req, res) => {
    let user = req.body.user;
    User.update({username: user.username}, {username: user.username}, (err) => {
      if(err) {
        res.status(401).send({success: false, error: "User could not be updated!"})
      } else {
        res.status(200).send({success: true, message: "User succesfuly updated!"})
      }
    })
  },

  restartVoting: (req, res) => {
    Movie.remove({}, (err) => {
      if(!err) {
        App.remove({}, (err) => {
          if(err) {
            res.status(401).send({success: false, error: "Voting could not be restarted!"})
          } else {
            let app = new App();
            app.save((err) => {
              if(!err) {
                User.update({}, {$set: { vetoed: false}}, {"multi": true}, (err) => {
                  if(!err){
                    res.status(200).send({success: true, message: "Voting succesfuly restarted!"})
                  }
                })
              }
            });
          }
        })
      } else {
        res.status(401).send({success: false, error: "Movies could not been removed!"})
      }
    })
  },

  endVoting: (req, res) => {
    App.update({}, {voting: false}, (err) => {
      if(!err){
        res.status(200).send({success: true, message: "Voting succesfuly ended!"})
      }
    })
  },

  getStatus: (req, res) => {
    App.findOne({}, (err, app) => {
      res.send({app});
    })
  }
}

module.exports = controller;
