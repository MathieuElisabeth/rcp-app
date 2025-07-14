import express from 'express'
import { deleteUser, findAll, findOne, update } from '../controllers/user.controller.js'
import verify from './verifyToken.js'

const router = express.Router()

router.get('/', verify, findAll)
router.get('/:id', verify, findOne)
router.put('/', verify, update)
router.delete('/', verify, deleteUser)

export default router