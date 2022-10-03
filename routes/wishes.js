import { Router } from 'express'
import * as wishesCtrl from '../controllers/wishes.js'
import { isLoggedIn } from '../middleware/middleware.js'

const router = Router()

router.get('/', wishesCtrl.index)



export {
  router
}