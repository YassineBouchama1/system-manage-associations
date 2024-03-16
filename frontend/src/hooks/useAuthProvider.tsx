'use client'
import { getSession } from "@/lib/getSessions";
import { SessionData } from "@/lib/optionsSessions";
import React, { createContext, useState, useContext, useEffect } from "react";

type Session = SessionData | any;
type GlobalContext = {
  session: Session;
  setSession: React.Dispatch<React.SetStateAction<Session>>;
};

export const GlobalContext = createContext<GlobalContext | null>(null);

type GlobalContextProviderProps = {
  children: React.ReactNode;
};

export const AuthProvider: React.FC<GlobalContextProviderProps> = ({
  children,
}) => {
  const [session, setSession] = useState<Session>(null);


useEffect(() => {
  const fetchSessions = async () => {
    const session = await getSession();
    console.log(session);
    setSession(session?.name);
  };
  fetchSessions();
}, []);

  return (
    <GlobalContext.Provider value={{ session, setSession }}>
      {children}
    </GlobalContext.Provider>
  );
};

export function useAuthContext() {
  const context = useContext(GlobalContext);
  if (!context) {
    throw new Error(
      "useGlobalContext must be used within a GlobalContextProvider"
    );
  }
  return context;
}

// //usage
// const { theme, setSession } = useGlobalContext();
