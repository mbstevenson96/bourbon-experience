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


export {
  index,
  newWishList as new,
}
