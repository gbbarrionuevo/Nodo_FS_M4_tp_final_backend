import jwt from 'jsonwebtoken';

export function generateToken(user) {
  return jwt.sign(
    {
      id: user._id,
      // roles: user.roles
      roles: user.roles.map(r => r._id)
    },
    process.env.JWT_SECRET,
    { expiresIn: '1h' }
  );
}
