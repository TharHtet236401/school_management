import express from "express";
import { createClass, getAllClasses, getClass, updateClass , deleteClass, addTeacherToClass ,removeTeacherFromClass} from "../controllers/class.controller.js";
import { validateToken, isAdmin } from "../utils/libby.js";

const router = express.Router();

router.post("/create", validateToken(),isAdmin, createClass);
router.get("/", validateToken(),isAdmin, getAllClasses);
router.get("/:id", validateToken(),isAdmin, getClass);
router.put("/:id", validateToken(),isAdmin, updateClass);
router.delete("/:id", validateToken(),isAdmin, deleteClass);
router.post("/addTeacher/:id", validateToken(),isAdmin, addTeacherToClass);
router.delete("/removeTeacher/:id", validateToken(),isAdmin, removeTeacherFromClass);
export default router;