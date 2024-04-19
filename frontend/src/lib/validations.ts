import { z } from "zod";

//1-create schema
export const schemaLogin = z.object({
  email: z.string().email(),
  password: z.string().min(6),
});
export const schemaEmail = z.object({
  email: z.string().email(),
});

export const schemaIllness = z.object({
  name: z.string().min(5),
});

export const schemaIllnessUpdate = z.object({
  name: z.string().min(5).optional(),
});
;

// change password
export const schemaChangePassword = z.object({
  password: z.string().min(6),
  password_confirmation: z.string().min(6),
});

// reset password
export const schemaResetPassword = z.object({
  email: z.string().email(),
  token: z.string(),
  password: z.string().min(6),
  password_confirmation: z.string().min(6),
});
// for verify email
export const schemaverifyEmail = z.object({
  url: z.string(),
  signature: z.string(),
});

export const schemaAssociation = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  password: z.string().min(6),
  phone: z.string().min(10),
  city: z.string(),
  address: z.string(),
  illness: z.string(),
});

;
export const schemaAssociationUpdate = z.object({
  city: z.string(),
  illness: z.string(),
  name: z.string(),
});

export const schemaPatient = z.object({
  first_name: z.string().min(2),
  last_name: z.string().min(2),
  phone: z.string().min(10),
  city: z.string(),
  current_address: z.string(),
  date_of_birth: z.string(),

});


export const schemaPatientUpdate = z.object({
  first_name: z.string().min(2),
  last_name: z.string().min(2),
  phone: z.string().min(10),
  city: z.string(),
  current_address: z.string(),
  date_of_birth: z.string(),
});