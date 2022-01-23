import faker from 'faker'
import { IOrganization, Organization } from './organization.model'

describe('Organization model', () => {
  let newOrganization: IOrganization
  beforeEach(() => {
    newOrganization = {
      name: faker.name.findName(),
      description: faker.lorem.paragraph(),
      image: faker.image.animals(100, 100),
    }
  })

  it('should correctly validate', async () => {
    await expect(new Organization(newOrganization).validate()).resolves.toBeUndefined()
  })

  it('should throw a validation error if name is empty', async () => {
    delete newOrganization.name
    await expect(new Organization(newOrganization).validate()).rejects.toThrow()
    newOrganization.name = ''
    await expect(new Organization(newOrganization).validate()).rejects.toThrow()
  })

  it('should throw a validation error if name is less than 3 characters', async () => {
    newOrganization.name = 'xx'
    await expect(new Organization(newOrganization).validate()).rejects.toThrow()
  })

  it('should throw a validation error if description is empty', async () => {
    delete newOrganization.description
    await expect(new Organization(newOrganization).validate()).rejects.toThrow()
    newOrganization.description = ''
    await expect(new Organization(newOrganization).validate()).rejects.toThrow()
  })

  it('should throw a validation error if description is more than 500 characters', async () => {
    newOrganization.description = faker.lorem.word(501)
    await expect(new Organization(newOrganization).validate()).rejects.toThrow()
  })

  it('should throw a validation error if image is empty', async () => {
    delete newOrganization.image
    await expect(new Organization(newOrganization).validate()).rejects.toThrow()
    newOrganization.image = ''
    await expect(new Organization(newOrganization).validate()).rejects.toThrow()
  })
})
