import { JWT_SECRET } from '@/config/config'
import { Customer } from '@/models/customer.model'
import { Strategy as JwtStrategy, ExtractJwt } from 'passport-jwt'
import { Strategy as AnonymousStrategy } from 'passport-anonymous'

interface JWTPayload {
  id: string
  name: string
  email: string
  iat: number
  exp: number
}
export const jwtStrategy = new JwtStrategy(
  {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: JWT_SECRET,
  },
  async (payload: JWTPayload, done) => {
    try {
      const user = await Customer.findById(payload.id)
      if (!user) return done(null, false)
      done(null, user.toJSON())
    } catch (e) {
      return done(e)
    }
  },
)

export const anonymousStrategy = new AnonymousStrategy()
