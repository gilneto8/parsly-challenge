import { IOrganization } from '@/models/organization.model'
import faker from 'faker'
import request from 'supertest'
import app from '@/app'
import setupTestDB from '../utils/setupTestDB'
import { customer } from '../fixtures/customer.fixture'

setupTestDB()

const registerUser = async () => {
  const res = await request(app).post('/register').send(customer).expect(200)
  token = res.body.token
}

let token: string

describe('Organization Routes', () => {
  let newOrganization: IOrganization

  beforeEach(async () => {
    newOrganization = {
      name: faker.name.findName(),
      description: faker.lorem.word(5),
      image: faker.image.business(200, 100),
    }
    await registerUser()
  })

  describe('POST /organization', () => {
    it('should return organization with 200 status', async () => {
      const res = await request(app).post('/organization').set('Authorization', `bearer ${token}`).send({ organization: newOrganization }).expect(200)
      expect(res.body).toHaveProperty('name')
      expect(res.body).toHaveProperty('description')
      expect(res.body).toHaveProperty('image')
    })

    it('should return 400 status if name is less than 3 characters', async () => {
      newOrganization.name = 'xx'
      await request(app).post('/organization').set('Authorization', `bearer ${token}`).send({ organization: newOrganization }).expect(400)
    })

    it('should return 401 status if unauthorization', async () => {
      await request(app).post('/organization').send({ organization: newOrganization }).expect(401)
    })

  })

  describe('GET /organization', () => {
    it('should return organization array with 200 status ', async () => {
      const res = await request(app).get('/organization').expect(200)
      expect(res.body).toEqual([])
    })
  })

  describe('GET /organization', () => {
    it('should return organization with 200 status ', async () => {
      const resInsert = await request(app).post('/organization').set('Authorization', `bearer ${token}`).send({ organization: newOrganization }).expect(200)
      const res = await request(app).get(`/organization/${resInsert.body._id}`).expect(200)
      expect(res.body).toHaveProperty('name')
      expect(res.body).toHaveProperty('description')
      expect(res.body).toHaveProperty('image')
    })

    it('should return 404 error if not found organization by id ', async () => {
      await request(app).get('/organization/60aa2e8ed87c9ffe67df0000').expect(404)
    })
  })

  describe('PATCH /organization', () => {
    it('should return organization with 200 status ', async () => {
      const resInsert = await request(app).post('/organization').set('Authorization', `bearer ${token}`).send({ organization: newOrganization }).expect(200)

      const updateOrganization: IOrganization = {
        name: faker.name.findName(),
        description: faker.lorem.word(5),
        image: faker.image.business(200, 100),
      }

      const res = await request(app)
        .patch(`/organization/${resInsert.body._id}`)
        .set('Authorization', `bearer ${token}`)
        .send({
          organization: updateOrganization,
        })
        .expect(200)
      expect(res.body.name).toEqual(updateOrganization.name)
      expect(res.body.description).toEqual(updateOrganization.description)
      expect(res.body.image).toEqual(updateOrganization.image)
    })

    it('should return 401 status if unauthorization', async () => {
      await request(app).patch('/organization/60aa2e8ed87c9ffe67df0000').expect(401)
    })

    it('should return 404 error if not found organization by id ', async () => {
      await request(app).patch('/organization/60aa2e8ed87c9ffe67df0000').set('Authorization', `bearer ${token}`).expect(404)
    })
  })

  describe('DELETE /organization', () => {
    it('should delete organization with 204 status ', async () => {
      const resInsert = await request(app).post('/organization').set('Authorization', `bearer ${token}`).send({ organization: newOrganization }).expect(200)
      await request(app).delete(`/organization/${resInsert.body._id}`).set('Authorization', `bearer ${token}`).expect(204)
    })

    it('should return 401 status if unauthorization', async () => {
      await request(app).delete('/organization/60aa2e8ed87c9ffe67df0000').expect(401)
    })

    it('should return 404 error if not found organization by id ', async () => {
      await request(app).delete('/organization/60aa2e8ed87c9ffe67df0000').set('Authorization', `bearer ${token}`).expect(404)
    })
  })
})
