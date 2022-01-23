import logger from '@/config/logger'
import { Organization } from '@/models/organization.model'
import ApiError from '@/utils/ApiError'
import express from 'express'
import httpStatus from 'http-status'
import passport from 'passport'

const router = express.Router()

router.get('/', passport.authenticate(['jwt', 'anonymous'], { session: false }), async (req, res, next) => {
  // logger.debug('%o', req.user)
  const organization = await Organization.find()
  res.json(organization)
})

router.get('/:id', async (req, res, next) => {
  try {
    const organization = await Organization.findOne({ _id: req.params.id })
    if (!organization) throw new ApiError(httpStatus.NOT_FOUND, 'Organization not found')
    res.json(organization)
  } catch (e) {
    next(e)
  }
})

router.post('/', passport.authenticate(['jwt'], { session: false }), async (req, res, next) => {
  try {
    console.log('req', req.user['_id' as keyof Express.User])
    const organization = new Organization({ ...req.body.organization, customerId: req.user['_id' as keyof Express.User] })
    await organization.save()
    res.json(organization)
  } catch (e) {
    next(e)
  }
})

router.patch('/:id', passport.authenticate(['jwt'], { session: false }), async (req, res, next) => {
  try {
    const organization = await Organization.findOne({ _id: req.params.id })
    if (!organization) throw new ApiError(httpStatus.NOT_FOUND, 'Organization not found')
    const { name, description, structure } = req.body.organization
    if (name) {
      organization.name = name
    }
    if (description) {
      organization.description = description
    }
    if (structure) {
      organization.structure = structure
    }
    await organization.save()
    res.json(organization)
  } catch (e) {
    next(e)
  }
})

router.delete('/:id', passport.authenticate(['jwt'], { session: false }), async (req, res, next) => {
  try {
    const organization = await Organization.findOne({ _id: req.params.id })
    if (!organization) throw new ApiError(httpStatus.NOT_FOUND, 'Organization not found')
    await organization.delete()
    res.status(httpStatus.NO_CONTENT).send()
  } catch (e) {
    next(e)
  }
})

export default router
