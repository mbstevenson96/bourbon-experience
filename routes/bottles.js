import { Router } from 'express'
import * as bottlesCtrl from '../controllers/bottles.js'
import { isLoggedIn } from '../middleware/middleware.js'

const router = Router()


router.get('/', bottlesCtrl.index)
router.get('/new', isLoggedIn, bottlesCtrl.new)
router.get('/:id', isLoggedIn, bottlesCtrl.show)
router.get('/:id/edit', isLoggedIn, bottlesCtrl.edit)
router.get('/:bottleId/reviews/:reviewId/editreview', isLoggedIn, bottlesCtrl.editReview)

router.put('/:bottleId/reviews/:reviewId/', isLoggedIn, bottlesCtrl.updateReview)

router.patch('/:id', isLoggedIn, bottlesCtrl.update)


router.post('/', isLoggedIn, bottlesCtrl.create)
router.post('/bottles/:id/reviews', isLoggedIn, bottlesCtrl.createReview)

router.delete('/:id', isLoggedIn, bottlesCtrl.delete)
router.delete('/:bottleId/reviews/:reviewId', isLoggedIn, bottlesCtrl.deleteReview)



export {
  router
}