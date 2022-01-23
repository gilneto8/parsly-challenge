import express from 'express'

import organization from './organization.route'
import auth from './auth.route'

const router = express.Router()

router.use('/organization', organization)
router.use(auth)

export default router
