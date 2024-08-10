import Student from '../models/student.model.js';
import Class from '../models/class.model.js';
import User from '../models/user.model.js';
import { fMsg } from '../utils/libby.js';

export const getAllStudent = async(req, res) => {
    try{
        let students = await Student.find();
        let studentData = await Promise.all(students.map(async student => {
            let studentClass = await Class.findById(student.class);
            let parentName = await User.findById(student.parentIds[0]);
            console.log(parentName.username)
            return {
                studentname: student.studentname,
                age: student.age,
                address: student.address,
                class: studentClass ? studentClass.name : null,
                parentName: [parentName ? parentName.username : null]
            }
        }));

        fMsg(res, "Students fetched successfully", studentData);
    }catch(error){
        console.log("Error in getAllStudent", error.message);
        fMsg(res, "Internal Server Error", error.message);
    }
}

export const getStudent = async(req, res) => {
    try{
        let student = await Student.findById(req.params.id);
        if(!student){
            return fMsg(res, "Student not found", null);
        }
        let className = await Class.findById(student.class);
      
        let studentData = {
            studentname: student.studentname,
            age: student.age,
            address: student.address,
            class: className ? className.name : null,
            
        }
        fMsg(res, "Student fetched successfully", studentData);
    }catch(error){
        console.log("Error in getStudent", error.message);
        fMsg(res, "Internal Server Error", error.message);
    }
}

export const editStudent = async(req, res) => {
    try{
        let student = await Student.findById(req.params.id);
        if(!student){
            return fMsg(res, "Student not found", null);
        }
        let updatedStudent = await Student.findByIdAndUpdate(req.params.id, req.body, {new: true});
        fMsg(res, "Student updated successfully", updatedStudent);
    }catch(error){
        console.log("Error in editStudent", error.message);
        fMsg(res, "Internal Server Error", error.message);
    }
}

export const deleteStudent = async(req, res) => {
    try{
        let student = await Student.findByIdAndDelete(req.params.id);
        fMsg(res, "Student deleted successfully", null);
    }catch(error){
        console.log("Error in deleteStudent", error.message);
        fMsg(res, "Internal Server Error", error.message);
    }
}