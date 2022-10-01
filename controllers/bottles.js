import { Bottle } from "../models/bottle.js";


function  newBottle(req, res) {
  res.render('bottles/new', {
    title: 'Add Bottle'
  })
}


export {
  newBottle as new,
}