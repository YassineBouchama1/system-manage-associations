
import { SessionOptions, getIronSession } from "iron-session";
import { cookies } from "next/headers";

//types of thata saveing in  sessions
export interface SessionData {
  userId?: string;
  name?: string;
  email?: string;
  img?: string;
  role?: string;
  isBlocked?: boolean;
  permissions: string[];
  isLoggedIn: boolean;
}

export const defaultSession: SessionData = {
  isLoggedIn: false,
  permissions: [],
};

export const sessionOptions: SessionOptions = {
  password: process.env.SECRET_KEY!,
  cookieName: "yassine",
  cookieOptions: {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
  },
};


export const getSession = async () => {
    "use server";
    let role = "admin";
    let isBlocked = false;

  const session = await getIronSession<SessionData>(cookies(), sessionOptions);

  if (!session.isLoggedIn) {
    session.isLoggedIn = defaultSession.isLoggedIn;
  }

  // CHECK THE USER IN THE DB
  session.isBlocked = isBlocked;
  session.role = role;

  return session;
};
