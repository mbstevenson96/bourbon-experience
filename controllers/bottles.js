import { Bottle } from "../models/bottle.js";

function index(req, res) {
  Bottle.find({})
  .then(bottles => {
    res.render('bottles/index', {
      bottles,
      title: 'Profile Page'
    })
  })
  .catch(err => {
    console.log(err)
    res.redirect('/')
  })
}

function  newBottle(req, res) {
  res.render('bottles/new', {
    title: 'Add Bottle'
  })
}


export {
  index,
  newBottle as new,
}