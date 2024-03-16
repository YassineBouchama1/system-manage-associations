"use client";
import React, { useState, useEffect } from "react";
import { redirect } from "next/navigation";
import { getSession } from "./getSessions";

export default function isAuth(Component: any, requiredRole: any) {
  return function AuthChecker(props: any) {
    // State for loader
    const [isLoading, setLoading] = useState(true);

    // Bring data user from local storage
    const auth = true; // Change this to your authentication logic



const isAuthed = async () => {
  const session = await getSession();
  if (!session.token) {
    setLoading(false);
    redirect("/"); // Redirect to home if not authenticated
  } else {
    setLoading(false);
  }
};

    useEffect(() => {

isAuthed()
    
    }, [auth]); 

    if (isLoading) {
      return (
        <div
          aria-label="Loading..."
          role="status"
          className="flex items-center space-x-2 w-full h-screen justify-center"
        >
          <svg
            className="h-20 w-20 animate-spin stroke-green-500"
            viewBox="0 0 256 256"
          >
            <line
              x1="128"
              y1="32"
              x2="128"
              y2="64"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="24"
            ></line>
        
          </svg>
          <span className="text-4xl font-medium text-gray-500">Loading...</span>
        </div>
      );
    }

    if (!auth) {
      return null;
    }
    // Return component
    return <Component {...props} />;
  };
}
