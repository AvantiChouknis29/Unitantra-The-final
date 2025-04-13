const z = require("zod");

const agencysignupSchema = z.object({
    companyname: z
        .string({ required_error: "Company name is required" })
        .trim()
        .min(1, { message: "Company name must be at least 1 characters" })
        .max(255, { message: "Company name must not be more than 255 characters" }),
    email: z
        .string({ required_error: "Email is required" })
        .trim()
        .email()
        .min(3, { message: "Email must be at least 3 characters" })
        .max(255, { message: "Email must not be more than 255 characters" }),
    phone: z
        .string({ required_error: "Phone is required" })
        .trim()
        .min(3, { message: "Phone must be at least 3 characters" })
        .max(255, { message: "Phone must not be more than 255 characters" }),
    country:z
    .string({ required_error: "Country name is required" })
    .trim(),
   
    city:z
    .string({ required_error: "City name is required" })
    .trim(),
    
    address:z
    .string({ required_error: "Address is required" })
    .trim(),
    
    designation:z
    .string({ required_error: "Designation is required" })
    .trim(),

    
    
    password: z
        .string({ required_error: "Password is required" })
        .trim()
        .min(6, { message: "Password must be at least 6 characters" })
        .max(255, { message: "Password must not be more than 255 characters" }),


});


const agencyloginSchema = z.object({
    email: z
        .string({ required_error: "Email is required" })
        .trim()
        .email()
        .min(3, { message: "Email must be at least 3 characters" })
        .max(255, { message: "Email must not be more than 255 characters" }),

        password: z
        .string({ required_error: "Password is required" })
        .trim()
        .min(6, { message: "Password must be at least 6 characters" })
        .max(255, { message: "Password must not be more than 255 characters" }),
    

});


module.exports = {agencysignupSchema,agencyloginSchema}
