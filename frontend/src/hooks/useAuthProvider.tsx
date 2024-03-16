'use client'
import React, {
  createContext,
  useState,
  useContext,
  useEffect,
  useCallback,
} from "react";
import { getSession } from "@/lib/getSessions";
import { SessionData } from "@/lib/optionsSessions";

type Session = SessionData | null;
type GlobalContext = {
  session: Session;
  setSession: React.Dispatch<React.SetStateAction<Session>>;
  loading: boolean;
};

export const GlobalContext = createContext<GlobalContext | null>(null);

type AuthProviderProps = {
  children: React.ReactNode;
};

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [session, setSession] = useState<Session>(null);
  const [loading, setLoading] = useState<boolean>(true);

  const fetchSessions = useCallback(async () => {
    setLoading(true);
    const sessionData = await getSession();
    setSession(sessionData);
    setLoading(false);
  }, []);

  useEffect(() => {
    fetchSessions();
  }, [fetchSessions]);

  return (
    <GlobalContext.Provider value={{ session, setSession, loading }}>
      {children}
    </GlobalContext.Provider>
  );
};

export function useAuthContext() {
  const context = useContext(GlobalContext);
  if (!context) {
    throw new Error("useAuthContext must be used within an AuthProvider");
  }
  return context;
}

// //usage
// const { session, setSession, loading } = useAuthContext();
