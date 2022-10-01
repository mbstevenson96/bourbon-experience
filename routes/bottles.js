import { Router } from 'express'
import * as bottlesCtrl from '../controllers/bottles.js'
import { isLoggedIn } from '../middleware/middleware.js'

const router = Router()

router.get('/', bottlesCtrl.index)
router.get('/new', isLoggedIn, bottlesCtrl.new)
router.get('/:id', bottlesCtrl.show)

router.post('/',isLoggedIn, bottlesCtrl.create)





export {
  router
}