import { Wish } from "../models/wish.js";

function index(req, res) {
  Wish.find({})
  .then(wishes => {
    res.render('wishes/index', {
      wishes,
      title: 'My Wish List'
    })
  })
  .catch(err => {
    console.log(err)
    res.redirect('/')
  })
}

function  newWishList(req, res) {
  res.render('wishes/new', {
    title: 'Add Bottle'
  })
}

function show(req, res) {
  Wish.findById(req.params.id)
  .then(wish => {
    res.render('wishes/show', {
      wish,
      title: `${wish.title}`
    })
  })
  .catch(err => {
    console.log(err)
    res.redirect('/')
  })
}

function create(req, res) {
  req.body.owner = req.user.profile._id
  req.body.strength = !!req.body.strength
  Wish.create(req.body)
  .then(wish => {
    res.redirect(`/wishes`)
  })
  .catch(err => {
    console.log(err)
    res.redirect('/')
  })
}


export {
  index,
  newWishList as new,
  show,
  create,
}
