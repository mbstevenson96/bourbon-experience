import { Bottle } from "../models/bottle.js";

function index(req, res) {
  console.log('this is my index function');
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


export {
  index,
}