import { z } from "zod";

//1-create schema
export const schemaLogin = z.object({
  email: z.string().email(),
  password: z.string().min(6),
});


export const schemaIllness = z.object({
  name: z.string().min(5),
 
});

export const schemaIllnessUpdate = z.object({
  name: z.string().min(5).optional(),
});
;


export const schemaAssociation = z.object({
  email: z.string().email(),
  password: z.string().min(6),
  phone: z.string().min(10),
  city: z.string(),
  illness: z.string(),
});

;