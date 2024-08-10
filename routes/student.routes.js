import express from 'express';
import { getAllStudent ,getStudent, editStudent, deleteStudent } from '../controllers/student.controller.js';
import { validateToken , isAdmin,isTeacher } from '../utils/libby.js';

const router = express.Router();

router.get('/', validateToken(), isTeacher, getAllStudent);
router.get('/:id', validateToken(), isTeacher, getStudent);
router.put('/:id', validateToken(), isTeacher, editStudent);
router.delete('/:id', validateToken(), isAdmin, deleteStudent);

export default router;