import Class from "../models/class.model.js";
import User from "../models/user.model.js";
import { fMsg } from "../utils/libby.js";

export const createClass = async (req, res) => {
    try{
      const {name, classcode} = req.body
      const newClass = new Class({name, classcode})

      let classExists = await Class.findOne({name})
      if(classExists){
        return fMsg(res, "Class already exists", null)
      }
      await newClass.save()
      fMsg(res, "Class created successfully", newClass)
    }catch(error){
        console.log("Error in createClass", error.message);
        fMsg(res, "Internal Server Error", error.message);
    }
}

export const getAllClasses = async (req, res) => {
  try{
    const classes = await Class.find().select("-__v -createdAt -updatedAt").populate({
        path: "studentIds",
        select: "-password -__v -createdAt -updatedAt -class",
        populate: {
            path: "parentIds",
            select: "-password -__v -createdAt -updatedAt"
        }
    });
    fMsg(res, "Classes fetched successfully", classes)
  }catch(error){
    console.log("Error in getAllClasses", error.message);
    fMsg(res, "Internal Server Error", error.message);
  }
}

export const getClass = async(req, res) => {

  try{
    const classExists = await Class.findById(req.params.id)
    if(!classExists){
      return fMsg(res, "Class not found", {message:error.message})
    }
    fMsg(res, "Class fetched successfully", classExists)
  }catch(error){
    console.log("Error in getClass", error.message);
    fMsg(res, "Internal Server Error", error.message);
  }
}

export const updateClass = async (req, res) => {
  try{
    let classExists = await Class.findById(req.params.id)
    if(!classExists){
      return fMsg(res, "Class not found", {message:error.message})
    }
    classExists = await Class.findByIdAndUpdate(req.params.id, req.body, {new:true})
    fMsg(res, "Class updated successfully", classExists)
  }catch(error){
    console.log("Error in updateClass", error.message);
    fMsg(res, "Internal Server Error", error.message);
  }
}

export const deleteClass = async (req, res) => {
    try{
        const classExists = await Class.findById(req.params.id)
        if(!classExists){
            return fMsg(res, "Class not found", {message:error.message})
        }
        await Class.findByIdAndDelete(req.params.id)
        fMsg(res, "Class deleted successfully", null)
    }catch(error){
        console.log("Error in deleteClass", error.message);
        fMsg(res, "Internal Server Error", error.message);
    }
}

export const addTeacherToClass = async(req, res) => {
    try{
        const classExists = await Class.findById(req.params.id)
        const teacher = await User.findById(req.body.teacherId)

        if (!classExists) {
            return fMsg(res, "Class not found", { message: error.message });
        }

        if(!teacher){
            return fMsg(res, "Teacher not found", { message: error.message });
        }
        classExists.teacherId.push(teacher._id)
        await classExists.save()
        fMsg(res, "Teacher added to class successfully", classExists);

    }catch(error){
        console.log("Error in addStudentToClass", error.message);
        fMsg(res, "Internal Server Error", error.message);
    }
}