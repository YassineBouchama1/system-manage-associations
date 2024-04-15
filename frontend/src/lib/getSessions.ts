"use server";
import { getIronSession } from "iron-session";
import { SessionData, defaultSession, sessionOptions } from "./optionsSessions";
import { cookies } from "next/headers";

export const getSession = async () => {
  // let role = 1;
  // let isBlocked = false;

  const session = await getIronSession<SessionData>(cookies(), sessionOptions);

  if (!session.isLoggedIn) {
    session.isLoggedIn = defaultSession.isLoggedIn;
  }

  // CHECK THE USER IN THE DB
  // session.isBlocked = isBlocked;
  // session.role = role;

  return session;
};
