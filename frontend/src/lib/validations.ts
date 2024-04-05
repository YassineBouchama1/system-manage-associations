import { z } from "zod";

//1-create schema
export const schemaLogin = z.object({
  email: z.string().email(),
  password: z.string().min(6),
});


export const schemaIllness = z.object({
  name: z.string().min(5),
 
});
