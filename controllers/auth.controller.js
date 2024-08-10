import bcryptjs from 'bcryptjs';
import User from '../models/user.model.js';
import Class from '../models/class.model.js';
import Student from '../models/student.model.js';
import { genToken, fMsg } from '../utils/libby.js';



export const signup = async (req, res) => {
    try {

        const {username,email, password,confirmPassword,role,classcode} = req.body;
        const {studentname,age,address} = req.body;
        console.log(req.body);  
        const foundClass = await Class.findOne({ classcode });
        if(!foundClass){
            return fMsg(res, "ClassCode Error", null);
        }
        if(!username || !email || !password || !confirmPassword || !role || !classcode){

            return fMsg(res, "All fields are required", null);
        }
        if (password !== confirmPassword) {
            return fMsg(res, "Passwords do not match", null);
        }
        let user = await User.findOne({email});
        if (user) {
            return fMsg(res, "Email already exists", null);
        }
        
        //hash password//
        const salt = await bcryptjs.genSalt(10);
        const hashedPassword = await bcryptjs.hash(password, salt);
        
        const newUser = new User(
            {
                username,
                email,
                password: hashedPassword,
                role: role
            }
        );
        console.log(newUser);

        const newStudent = new Student({
            studentname,
            age,    
            address,
            class:foundClass._id,
        })

        console.log(newStudent);

        if (newStudent) {
            await newStudent.save();
            await Class.findByIdAndUpdate(foundClass._id,{$push:{studentIds:newStudent._id}});
            await Student.findByIdAndUpdate(newStudent._id,{$push:{parentIds:newUser._id}});
        }

        if (newUser) {
            await newUser.save();
            res.status(201).json({
                _id :newUser._id,
                username:newUser.username,
                email:newUser.email,
                role:newUser.role,

            });
       
       
        
        await Class.findByIdAndUpdate(foundClass._id,{$push:{parentIds:newUser._id}});
        
       



          

        }else{
            return res.status(400).json({ message: 'User not created' });
        }


    } catch (error) {
        res.status(500).json({ errorMessage: "Internal Server Error" });

    }
};

export const login = async (req, res) => {
    try{
       const {email,password} = req.body;
       const user = await User.findOne({email});
       if(!user){
        return res.status(400).json({message:"Invalid email or password"});
       }

       let unhashedPassword = await bcryptjs.compare(password, user.password);
       if(!unhashedPassword){
        return res.status(400).json({message:"Invalid email or password"});
       }

       let userObject = user.toObject();
       delete userObject.password;
       let JwtToken = genToken(userObject);
       userObject.token = JwtToken;
       fMsg(res, "Login successful", userObject);
       
    }catch(error){
      console.log("Error in login", error.message);
        res.status(500).json({ errorMessage: "Internal Server Error" });
    }
};

// export const logout = (req, res) => {
//     try{
//         res.cookie('jwt', '', { maxAge: 0 });
//         res.status(200).json({ message: 'Logged out successfully' });
//     }catch(error){
//         console.log("Error in logout", error.message);
//         res.status(500).json({ errorMessage: "Internal Server Error" });
//     }
// };

export const logout = (req, res) => {
    
}