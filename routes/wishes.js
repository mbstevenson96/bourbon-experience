import { Router } from 'express'
import * as wishesCtrl from '../controllers/wishes.js'
import { isLoggedIn } from '../middleware/middleware.js'

const router = Router()

router.get('/', wishesCtrl.index)
router.get('/new', isLoggedIn, wishesCtrl.new)
router.get('/:id', isLoggedIn, wishesCtrl.show)
router.get('/:id/edit', isLoggedIn, wishesCtrl.edit)

router.patch('/:id', isLoggedIn, wishesCtrl.update)


router.post('/', isLoggedIn, wishesCtrl.create)






export {
  router
}