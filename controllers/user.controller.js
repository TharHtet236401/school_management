import User from '../models/user.model.js';
import { fMsg} from '../utils/libby.js';
import bcrypt from 'bcryptjs';

export const getAllUsers = async (req, res) => {
    try{
        let users = await User.find().select("-password -createdAt -updatedAt -__v");
        fMsg(res, 'user fetched successfully', users);
     
    }catch(error){
        console.log("Error in getAllUsers", error.message);
        fMsg(res, "Internal Server Error", error.message);
    }
}

export const createUser = async (req, res) => {
    try{
       console.log("let's create user")
       const {username,email,password,confirmPassword,role} = req.body;
       if(!username || !email || !password || !confirmPassword || !role){
        return fMsg(res, "All fields are required", null);
       }

       if(password !== confirmPassword){
        return fMsg(res, "Passwords do not match", null);
       }

       let hashedPassword = await bcrypt.hash(password, 10);
       let newUser = new User(
        {
            username,
            email,
            password:hashedPassword,
            role
        }
       )
       await newUser.save();
       fMsg(res, "User created successfully", newUser);

    }catch(error){
        console.log("Error in createUser", error.message);
        fMsg(res, "Internal Server Error", error.message);
    }
}

export const getUser = async (req, res) => {
    try{
        const search = await User.findById(req.params.id);
        if(!search){
            return fMsg(res, "User not found", null);
        }
        const user = await User.findById(req.params.id);
        fMsg(res, "User fetched successfully", user);
    }catch(error){
        console.log("Error in getUser", error.message);
        fMsg(res, "Internal Server Error", error.message);
    }
}

export const updateUser = async (req, res) => {
    try{
        const search = await User.findById(req.params.id);
        console.log(search)
        if(!search){
           return fMsg(res, "User not found", null);
        }
        const user = await User.findByIdAndUpdate(req.params.id, req.body, {new:true});
        fMsg(res, "User updated successfully", user);
    }catch(error){
        console.log("Error in updateUser", error.message);
        fMsg(res, "Internal Server Error", error.message);
    }
}

export const deleteUser = async (req, res) => {
    try{
        await User.findByIdAndDelete(req.params.id);
        fMsg(res, "User deleted successfully", null);
    }catch(error){
        console.log("Error in deleteUser", error.message);
        fMsg(res, "Internal Server Error", error.message);
    }
}

