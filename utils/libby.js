import jwt from 'jsonwebtoken';

export let fMsg = (res,msg,result={})=>{
    res.status(200).json({con:true, msg, result})
}

export let genToken = (payload)=>jwt.sign({
    exp:Math.floor(Date.now()/1000)+(60*60*24),
    data:payload
},process.env.SECRET_KEY)


export let validateToken = () => {
    return (req, res, next) => {
        if (!req.headers.authorization) {
            return res.status(401).json({ con: false, msg: "Unauthorized" });
        }

        let token = req.headers.authorization.split(" ")[1];

        try {
            let tokenUser = jwt.verify(token, process.env.SECRET_KEY);
            req.body.user = tokenUser.data; // Attach user info to request body
            
            next();
        } catch (error) {
            console.error("Token verification error:", error.message);
            return res.status(401).json({ con: false, msg: "Invalid token" });
        }
    }
}


export let isAdmin = (req,res,next)=>{
   
    console.log("above role")
    if(req.body.user.role === "admin"){    
        next()
    }else{
        fMsg(res,"Unauthorized","You are not authorized to access this resource")
    }
}

export let isTeacher = (req,res,next)=>{
    if(req.body.user.role === "teacher" || req.body.user.role === "admin" ){
        next()
    }else{
        fMsg(res,"Unauthorized","You are not authorized to access this resource")
    }
}