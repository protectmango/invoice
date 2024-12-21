import {z} from "zod"
 
export const onboardingSchema = z.object({
    firstName :  z.string().min(2,"Firstname is required"),
    lastName : z.string().min(2,"Lastname is required"),
    address : z.string().min(2,"Address is required"),
});