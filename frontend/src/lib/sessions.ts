import { SessionOptions } from "iron-session";


//types of thata saveing in  sessions 
export interface SessionData {
  userId?:string;
  name?:string;
  email?:string;
  img?:string;
  role?:string
  isBlocked?:boolean
  permissions:string[],
  isLoggedIn:boolean,
}

export const defaultSession:SessionData = {
  isLoggedIn: false,
  permissions: []
}

export const sessionOptions: SessionOptions ={
  password: process.env.SECRET_KEY!,
  cookieName: "yassine",
  cookieOptions:{
    httpOnly:true,
    secure: process.env.NODE_ENV === "production"
  }
}


