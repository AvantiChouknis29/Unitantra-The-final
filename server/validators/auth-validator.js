

const {z} =require("zod")

const signupSchema=z.object({
    username:z
    .string({required_error:"Name is required"})
    .trim()
    .min(3,{message:"Name must be at least of 3 characters"})
    .max(255,{message:"Name must be not more that 255 characters"}),

    email:z
    .string({required_error:"Email is required"})
    .trim()
    .email({message:"Invalid email address"})
    .min(3,{message:"Email must be at least of 3 characters"})
    .max(255,{message:"Email must be not more that 255 characters"}),

    phone:z
    .string({required_error:"Phone is required"})
    .trim()
    .min(3,{message:"Phone must be at least of 3 characters"})
    .max(15,{message:"Phone must be not more that 15 characters"}),

    password:z
    .string({required_error:"Password is required"})
    .trim()
    .min(7,{message:"Password must be at least of 7 characters"})
    .max(100,{message:"Password must be not more that 100 characters"})
})




const loginSchema=z.object({
   
    email:z
    .string({required_error:"Email is required"})
    .trim()
   
    .min(3,{message:"Email must be atleast of 3 characters"})
    .max(100,{message:"Email must be not more that 100 characters"}),

    password:z
    .string({required_error:"Password is required"})
    .trim()
    .min(7,{message:"Password must be atleast of 7 characters"})
    .max(100,{message:"Password must be not more that 100 characters"})
})
module.exports={signupSchema,loginSchema}