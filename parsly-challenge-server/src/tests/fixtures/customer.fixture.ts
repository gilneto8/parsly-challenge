import faker from 'faker'

const password = 'superpassword'

export const customer = {
  first_name: faker.name.firstName(),
  last_name: faker.name.lastName(),
  email: faker.internet.email(),
  password
}
