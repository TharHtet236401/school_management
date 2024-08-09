import express from 'express'

const router = express.Router();
import { getAllUsers,createUser,updateUser,getUser,deleteUser } from '../controllers/user.controller.js'
import { validateToken, isAdmin } from '../utils/libby.js'

router.get('/',validateToken(),isAdmin, getAllUsers);
router.get('/:id',validateToken(), isAdmin, getUser);
router.post('/',validateToken(), isAdmin, createUser);
router.put('/:id',validateToken(), isAdmin, updateUser);
router.delete('/:id',validateToken(), isAdmin, deleteUser);




export default router;