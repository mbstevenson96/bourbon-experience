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

function show(req, res) {
  console.log('this is my show function');
  Bottle.findById(req.params.id)
  .populate('owner')
  .then(bottle => {
    res.render('bottles/show', {
      bottle,
      title: `${bottle.title}`
    })
  })
  .catch(err => {
    console.log(err)
    res.redirect('/')
  })
}

function edit(req, res) {
  Bottle.findById(req.params.id)
  .then(bottle => {
    res.render('bottles/edit', {
      bottle,
      title: `Edit ${bottle.title}`
    })
  })
  .catch(err => {
    console.log(err)
    res.redirect('/')
  })
}

function deleteBottle(req, res) {
  console.log('this is my delete function');
  Bottle.findByIdAndDelete(req.params.id)
  .then(bottle => {
    if (bottle.owner.equals(req.user.profile._id)) {
      bottle.delete()
      .then(deleteBottle => {
        res.redirect('/bottles')
      })
    } else {
      throw new Error('NOT AUTHORIZED')
    }
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
  show,
  edit,
  deleteBottle as delete,
}