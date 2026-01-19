// lib/hash.js
import bcrypt from 'bcrypt'

export function hashPassword(password) {
  return bcrypt.hash(password, 10)
}

export function verifyPassword(password, hashed) {
  return bcrypt.compare(password, hashed)
}
