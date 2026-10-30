import React from "react";
import { useAuth } from "../features/auth/hooks/useAuth";
import { Navigate } from "react-router-dom";
import Navbar from "./navbar/Navbar";

const Protected = ({ children }) => {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="flex h-screen w-full items-center justify-center bg-black text-white">
        <div className="flex flex-col items-center gap-3">
          <div className="w-8 h-8 border-2 border-white/20 border-t-white rounded-full animate-spin"></div>
          <span className="text-xs uppercase tracking-widest text-zinc-400 font-mono">
            Initializing Session...
          </span>
        </div>
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return (
    <div className="min-h-screen bg-black text-white selection:bg-white selection:text-black flex flex-col">
      <Navbar />
      <div className="flex-1 w-full">{children}</div>
    </div>
  );
};

export default Protected;

