import { Bottle } from "../models/bottle.js";


function index(req, res) {
  Bottle.find({})
  .then(bottles => {
    res.render('bottles/index', {
      bottles,
      title: 'My Inventory'
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

function create(req, res) {
  req.body.owner = req.user.profile._id
  req.body.strength = !!req.body.strength
  Bottle.create(req.body)
  .then(bottle => {
    res.redirect(`/bottles`)
  })
  .catch(err => {
    console.log(err)
    res.redirect('/')
  })
}


export {
  index,
  newBottle as new,
  create,
}