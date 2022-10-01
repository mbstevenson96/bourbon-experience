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
  .then(profile => {
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



export {
  index, 
  show,
}