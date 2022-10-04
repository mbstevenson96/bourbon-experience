import { Bottle } from "../models/bottle.js";
import { Profile } from "../models/profile.js";



function index(req, res) {
  let modelQuery = req.query.name
    ? { name: new RegExp(req.query.name, 'i') }
    : {}
    Profile.find(modelQuery)
  .sort("name")
  .then(profiles => {
    Bottle.find({})
    .populate('owner')
    .then(bottles => {
      const filterBottles = bottles.filter(bottle => {
        return bottle.owner._id.toString() === profiles[0]._id.toString()
      })
      const finalBottles = req.query.name ? filterBottles : bottles
      res.render('bottles/index', {
        bottles: finalBottles,
        profiles,
        name: req.query.name,
        title: 'My Inventory'
      })
    })
  })
  .catch(err => {
    console.log(err)
    res.redirect('/')
  })
}

function  newBottle(req, res) {
  res.render('bottles/new', {
    title: 'Add Bottle to Inventory'
  })
}

function create(req, res) {
  req.body.owner = req.user.profile._id
  req.body.strength = !!req.body.strength
  req.body.inventory = !!req.body.inventory
  req.body.wishes = !!req.body.wishes
  Profile.findById(req.body.owner)
  .then(profile => {
    Bottle.create(req.body)
    .then(bottle => {
      if (req.body.inventory) {
        profile.bottles.push(bottle._id)
      }
      if (req.body.wishes) {
        profile.wishes.push(bottle._id)
      }
      profile.save()
      .then(() => {
        res.redirect(`/bottles`)
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

function show(req, res) {
  Bottle.findById(req.params.id)
  .populate({ 
    path: 'reviews', 
    select: 'author',
    populate: {
      path: 'author',
      select: 'name'
    }
  })
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

function update(req, res) {
  Bottle.findById(req.params.id)
  .then(bottle => {
    if (bottle.owner.equals(req.user.profile._id)){
      bottle.updateOne(req.body)
      .then(updatedBottle => {
        res.redirect(`/bottles/${bottle._id}`)
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

function createReview(req, res) {
  req.body.author = req.user.profile._id
  Bottle.findById(req.params.id)
  .then(bottle => {
    bottle.reviews.push(req.body)
    bottle.save()
    .then(() => {
      res.redirect(`/bottles/${bottle._id}`)
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

function deleteBottle(req, res) {
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

function editReview(req, res) {
  console.log('Thi is my edit review function!');
  Bottle.findById(req.params.bottleId)
  .then(bottle => {
    const review = bottle.reviews.id(req.params.reviewId)
    res.render('bottles/editreview', {
      review,
      bottle,
      title: "Edit Review"
    })
  })
  .catch(err => {
    console.log(err)
    res.redirect('/')
  })
}

function updateReview(req, res) {
  console.log('this is my update review function!');
  Bottle.findById(req.params.bottleId)
  .then(bottle => {
    const review = bottle.reviews.id(req.params.reviewId)
    review.rating = req.body.rating
    review.smoothness = req.body.smoothness
    review.comment = req.body.comment
    bottle.save()
    .then(() => {
      res.redirect(`/bottles/${bottle._id}`)
    })
  })
  .catch(err => {
    console.log(err)
    res.redirect('/')
  })
}

function deleteReview(req, res) {
  Bottle.findById(req.params.bottleId)
  .then(bottle => {
    bottle.reviews.id(req.params.reviewId).remove()
    bottle.save()
    .then(() => {
      res.redirect(`/bottles/${bottle._id}`)
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




export {
  index,
  newBottle as new,
  create,
  show,
  edit,
  update,
  createReview,
  deleteBottle as delete,
  deleteReview,
  updateReview,
  editReview,
}