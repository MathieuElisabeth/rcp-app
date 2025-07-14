import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import User from '../model/User.js'
import { registerValidation, loginValidation } from '../validation.js'

export const register = async (req, res) => {
  const { error } = registerValidation(req.body)
  if (error) return res.status(400).send({ message: error.details[0].message, field: error.details[0].context.label})

  //Checking if the user is already in db
  const isUserExist = await User.findOne({ username: req.body.username })
  if (isUserExist) return res.status(400).send({ message: 'Ce pseudo est déjà utilisé', field: username})

  //Checking if the user is already in db
  const isEmailExist = await User.findOne({ email: req.body.email })
  if (isEmailExist) return res.status(400).send({ message: 'Cette email déjà utilisé', field: email})

  // Hash passwords
  const salt = await bcrypt.genSalt(10)
  const hashPassword = await bcrypt.hash(req.body.password, salt)

  const user = new User({ 
    // name: req.body.name,
    username: req.body.username,
    email: req.body.email,
    password: hashPassword
  })
  try {
    const savedUser = await user.save()
    res.send(savedUser)
  } catch(err) {
    res.status(400).send({ message: err})
  }
}

export const login = async (req, res) => {
  // Validate data before add user in db
  const { error } = loginValidation(req.body)
  if (error) return res.status(400).send({ message: error.details[0].message, field: error.details[0].context.label})

  //Checking if email exists
  const user = await User.findOne({ email: req.body.email })
  if (!user) return res.status(400).send({ message: 'Email ou mot de passe incorrect'})

  // Checking is password is correct
  const validPass = await bcrypt.compare(req.body.password, user.password)
  if (!validPass) return res.status(400).send({ message: 'Email ou mot de passe incorrect'})

  // Create and assign a token { expiresIn: '3d' }
  const token = jwt.sign({ _id: user.id }, process.env.TOKEN_SECRET)
  res.header('auth-token', token).send({ user, accessToken: token })

}
