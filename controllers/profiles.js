import { Bottle } from "../models/bottle.js";
import { Profile } from "../models/profile.js";


function index(req, res) {
  Profile.find({})
  .then(profiles => {
    res.render("profiles/index", {
      profiles,
      title: 'All Profiles'
    })
  })
  .catch(err => {
    console.log(err)
    res.redirect('/')
  })
}

function show(req, res) {
  Profile.findById(req.params.id)
  .populate('bottles')
  .populate('wishes')
  .then(profile => {
    console.log("this is the show profile", profile);
    const isSelf = profile._id.equals(req.user.profile._id)
    res.render('profiles/show', {
      profile,
      isSelf,
      title: 'Profile Page'
    })
  })
  .catch(err => {
    console.log(err)
    res.redirect('/')
  })
}

function addToWish(req, res) {
  console.log('add to wish list function');
  Profile.findById(req.user.profile._id)
  // .populate('wishes')
  .then(profile => {
    console.log('this is my req.body.id', req.body.id);
    console.log('this is my profile', profile);

    profile.wishes.push(req.body.id)
    profile.save()
    .then(() => {
    console.log('this is my second profile', profile);
      res.redirect(`/profiles/${req.params.id}`)
    })
  })
  .catch(err => {
    console.log(err)
    res.redirect(`/profiles/${req.params.id}`)
  })
}


export {
  index, 
  show,
  addToWish,
}