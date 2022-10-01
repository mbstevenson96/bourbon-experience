import { Router } from 'express'
import * as bottlesCtrl from '../controllers/bottles.js'
import { isLoggedIn } from '../middleware/middleware.js'

const router = Router()

router.get('/', bottlesCtrl.index)
router.get('/new', isLoggedIn, bottlesCtrl.new)

router.post('/',isLoggedIn, bottlesCtrl.create)





export {
  router
}