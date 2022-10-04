import { Wish } from "../models/wish.js";
import { Profile } from "../models/profile.js";


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
    title: 'Add Bottle to Wish List'
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
  Profile.findById(req.body.owner)
  .then(profile => {
    Wish.create(req.body)
    .then(wish => {
      profile.wishes.push(wish._id)
      profile.save()
      .then(() => {
        res.redirect(`/wishes`)
      })
    })
    .catch(err => {
      console.log(err)
      res.redirect('/')
    })
  })
  .catch(err => {
    console.log(err)
    res.redirect('/')
  })
}

function edit(req, res) {
  Wish.findById(req.params.id)
  .then(wish => {
    res.render('wishes/edit', {
      wish,
      title: `Edit ${wish.title}`
    })
  })
  .catch(err => {
    console.log(err)
    res.redirect('/')
  })
}

function update(req, res) {
  Wish.findById(req.params.id)
  .then(wish => {
    if (wish.owner.equals(req.user.profile._id)){
      wish.updateOne(req.body)
      .then(updatedWish => {
        res.redirect(`/wishes/${wish._id}`)
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
  newWishList as new,
  show,
  create,
  edit,
  update,
}
