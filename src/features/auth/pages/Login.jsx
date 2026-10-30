import React, { useState } from "react";
import FromGroup from "../components/FromGroup";
import { useAuth } from "../hooks/useAuth";
import { useNavigate, Link } from "react-router-dom";
import { Activity, ArrowRight, Sparkles } from "lucide-react";
import { Button } from "../../../components/ui/button";

const Login = () => {
  const [userInfo, setuserInfo] = useState("");
  const [password, setpassword] = useState("");

  const navigate = useNavigate();
  const { Login, loading, loginAsGuest } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const success = await Login(userInfo, password);
    if (success) {
      navigate("/");
    }
  };

  const handleGuestLogin = () => {
    loginAsGuest();
    navigate("/");
  };

  return (
    <div className="min-h-screen w-full bg-black text-white flex flex-col items-center justify-center p-4 sm:p-6 font-sans relative selection:bg-white selection:text-black">
      {/* Precision Monochrome Technical Grid Background */}
      <div 
        className="absolute inset-0 pointer-events-none opacity-[0.03]"
        style={{
          backgroundImage: `linear-gradient(to right, #ffffff 1px, transparent 1px), linear-gradient(to bottom, #ffffff 1px, transparent 1px)`,
          backgroundSize: '40px 40px'
        }}
      />

      <div className="relative z-10 w-full max-w-md bg-zinc-950 border border-zinc-800 rounded-2xl p-6 sm:p-8 shadow-2xl flex flex-col gap-6">
        
        {/* Brand Header */}
        <div className="flex flex-col items-center text-center gap-2">
          <div className="w-12 h-12 rounded-xl bg-white text-black flex items-center justify-center mb-1 shadow-md">
            <Activity className="w-6 h-6 stroke-[2.5]" />
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white font-heading tracking-tight">
            Sign In to VibePulse
          </h1>
          <p className="text-zinc-400 text-xs sm:text-sm">
            Enter your credentials or test with instant demo access
          </p>
        </div>

        {/* Form */}
        <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
          <FromGroup
            onChange={setuserInfo}
            label={"userInfo"}
            title={"Username or Email"}
            placeholder={"e.g. alex@example.com"}
          />
          <FromGroup
            label={"password"}
            title={"Password"}
            type="password"
            placeholder={"••••••••"}
            onChange={setpassword}
          />

          <Button
            type="submit"
            disabled={loading}
            className="w-full bg-white text-black hover:bg-zinc-200 font-semibold py-3 rounded-xl transition-all text-sm mt-2 flex items-center justify-center gap-2 h-11"
          >
            {loading ? "Authenticating..." : "Sign In"}
            <ArrowRight className="w-4 h-4" />
          </Button>
        </form>

        <div className="flex items-center gap-3 my-1">
          <div className="h-px bg-zinc-800 flex-1"></div>
          <span className="text-[10px] font-mono text-zinc-500 uppercase tracking-widest">
            or instant preview
          </span>
          <div className="h-px bg-zinc-800 flex-1"></div>
        </div>

        {/* 1-Click Guest Pass for Recruiters & Resume Viewers */}
        <Button
          type="button"
          onClick={handleGuestLogin}
          variant="outline"
          className="w-full border-zinc-800 bg-zinc-900/60 hover:bg-zinc-900 hover:border-zinc-700 text-white font-medium py-3 rounded-xl transition-all text-xs font-mono uppercase tracking-wider flex items-center justify-center gap-2 h-11"
        >
          <Sparkles className="w-3.5 h-3.5 text-white" />
          Continue as Guest (Instant Preview)
        </Button>

        {/* Footer Link */}
        <p className="text-center text-xs text-zinc-500 pt-2 border-t border-zinc-900">
          New to VibePulse?{" "}
          <Link to="/register" className="text-white hover:underline font-semibold ml-1">
            Create Account
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;

