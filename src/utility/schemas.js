import {date, string,z} from "zod";

const passwordSchema = z
  .string()
  .min(8, "Password must be at least 8 characters long")
  .regex(/[!@#$%^&*()_+{}[\]:;<>,.?~\\-]/, "Password must contain at least one symbol")
  .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
  .regex(/[a-z]/, "Password must contain at least one lowercase letter")
  .regex(/\d/, "Password must contain at least one number");


const nameSchema= (fieldName)=> {
  return z.string().min(1, {message:`${fieldName} is required`})
}


const isPasswordsMatch = (data) => {
    console.log("hello",data)
    return data.password === data.confirmPassword
    // Return true if the passwords match
  };



  const passwordForm = z
  .object({
    password: z.string(),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"], // path of error
  });




export const signInSchema= z.object({
  email:string().email(),
  password:passwordSchema
  
})


export const signUpSchema = z.object({
  firstname:nameSchema("firstname"),
  lastname:nameSchema("lastname"),
  email:string().email(),
  password:passwordSchema,
  //confirmPassword:passwordForm,
  username:nameSchema("username"),
  Dob:string()
  .min(new Date("1900-01-01"), {message:"This date is too old to be yours"})
  .max(new Date("2023-10-07"), {message:"Kindly provide your valid date of birth"})
})