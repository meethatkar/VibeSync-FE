import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Search, CloudUpload, Activity, Menu, LogOut } from "lucide-react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Avatar, AvatarFallback } from "../ui/avatar";
import { useAuth } from "../../features/auth/hooks/useAuth";

import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetHeader,
  SheetTitle,
} from "../ui/sheet";
import UploadModal from "../modals/UploadModal";

const Navbar = () => {
  const [isUploadOpen, setIsUploadOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const { user, logout } = useAuth();

  const isHome = location.pathname === "/";
  const isTerms = location.pathname === "/terms";

  const handleLogout = async () => {
    await logout();
    navigate("/login");
  };

  const userInitials = (user?.username || "Guest")
    .split(" ")
    .map((n) => n[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

  return (
    <header className="w-full bg-black/90 backdrop-blur-xl border-b border-zinc-800 flex justify-center sticky top-0 z-50 font-sans">
      <div className="w-full max-w-[1900px] px-4 sm:px-6 lg:px-12 h-20 flex items-center justify-between gap-4">
        {/* Left: Logo and Nav */}
        <div className="flex items-center gap-8 xl:gap-12">
          {/* Logo */}
          <div
            onClick={() => navigate("/")}
            className="flex items-center gap-3 cursor-pointer group"
          >
            <div className="w-10 h-10 rounded-xl bg-white text-black flex items-center justify-center font-bold shadow-md shrink-0 transition-transform group-hover:scale-105">
              <Activity className="w-5 h-5 stroke-[2.5]" />
            </div>
            <div className="flex flex-col">
              <span className="text-lg font-extrabold tracking-tight text-white font-heading leading-tight">
                VIBEPULSE
              </span>
              <span className="text-[10px] font-mono text-zinc-500 tracking-widest uppercase">
                Bio-Acoustic Sync
              </span>
            </div>
          </div>

          {/* Navigation Links (Desktop) */}
          <nav className="hidden lg:flex items-center bg-zinc-950 rounded-full p-1 border border-zinc-800">
            <Button
              variant="ghost"
              onClick={() => navigate("/")}
              className={`rounded-full px-5 py-2 text-xs font-mono uppercase tracking-wider transition-all h-8 ${
                isHome
                  ? "bg-white text-black hover:bg-white hover:text-black font-bold"
                  : "text-zinc-400 hover:text-white hover:bg-zinc-900"
              }`}
            >
              Scanner Hub
            </Button>
            <Button
              variant="ghost"
              onClick={() => navigate("/terms")}
              className={`rounded-full px-5 py-2 text-xs font-mono uppercase tracking-wider transition-all h-8 ${
                isTerms
                  ? "bg-white text-black hover:bg-white hover:text-black font-bold"
                  : "text-zinc-400 hover:text-white hover:bg-zinc-900"
              }`}
            >
              Specs & Privacy
            </Button>
          </nav>
        </div>

        {/* Right: Actions (Desktop) */}
        <div className="hidden lg:flex items-center gap-4">
          <div className="w-60 relative flex items-center">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500" />
            <Input
              placeholder="Search frequencies..."
              className="h-9 w-full rounded-full bg-zinc-950 border-zinc-800 pl-9 pr-9 py-2 text-xs text-white placeholder:text-zinc-500 focus-visible:ring-1 focus-visible:ring-white focus-visible:border-transparent transition-all"
            />
            <div className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center justify-center rounded bg-zinc-900 px-1.5 py-0.5 text-[9px] font-mono text-zinc-400 border border-zinc-800">
              ⌘K
            </div>
          </div>

          <Button
            className="gap-2 rounded-full bg-zinc-950 hover:bg-zinc-900 text-white border border-zinc-800 py-2 h-9 text-xs font-mono uppercase tracking-wider"
            onClick={() => setIsUploadOpen(true)}
          >
            <CloudUpload className="w-3.5 h-3.5" />
            Upload Track
          </Button>

          {/* User Profile / Status */}
          <div className="flex items-center gap-2 pl-2 border-l border-zinc-800">
            <button
              onClick={() => navigate("/settings")}
              className="flex items-center gap-2.5 outline-none hover:opacity-80 transition-opacity"
              title="Account & Settings"
            >
              <Avatar className="h-9 w-9 border border-zinc-700 bg-zinc-900">
                <AvatarFallback className="bg-zinc-900 text-white font-mono text-xs font-bold">
                  {userInitials}
                </AvatarFallback>
              </Avatar>
              <div className="flex flex-col text-left">
                <span className="text-xs font-semibold text-white truncate max-w-[100px]">
                  {user?.username || "Guest"}
                </span>
                <span className="text-[10px] font-mono text-zinc-500 uppercase">
                  {user?.isGuest ? "Demo Mode" : "Verified"}
                </span>
              </div>
            </button>

            <button
              onClick={handleLogout}
              className="p-2 text-zinc-500 hover:text-white transition-colors rounded-lg hover:bg-zinc-900"
              title="Sign Out"
            >
              <LogOut className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Mobile View: Hamburger Menu */}
        <div className="flex lg:hidden items-center gap-3">
          <div
            className="relative cursor-pointer"
            onClick={() => navigate("/settings")}
          >
            <Avatar className="h-8 w-8 border border-zinc-700 bg-zinc-900">
              <AvatarFallback className="bg-zinc-900 text-white font-mono text-xs font-bold">
                {userInitials}
              </AvatarFallback>
            </Avatar>
          </div>

          <Sheet>
            <SheetTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="text-white hover:bg-zinc-900 rounded-full h-9 w-9"
              >
                <Menu className="h-5 w-5" />
              </Button>
            </SheetTrigger>
            <SheetContent
              side="right"
              className="bg-black border-l-zinc-800 text-white p-6 flex flex-col gap-6 w-[280px]"
            >
              <SheetHeader>
                <SheetTitle className="text-left text-white text-lg font-bold tracking-tight font-heading">
                  Navigation
                </SheetTitle>
              </SheetHeader>

              <div className="flex flex-col gap-3 mt-2">
                <Button
                  variant="outline"
                  onClick={() => navigate("/")}
                  className={`w-full justify-start text-sm py-5 rounded-xl transition-all ${
                    isHome
                      ? "bg-white text-black font-semibold border-white"
                      : "bg-zinc-950 text-zinc-300 border-zinc-800"
                  }`}
                >
                  Scanner Hub
                </Button>

                <Button
                  variant="outline"
                  onClick={() => navigate("/terms")}
                  className={`w-full justify-start text-sm py-5 rounded-xl transition-all ${
                    isTerms
                      ? "bg-white text-black font-semibold border-white"
                      : "bg-zinc-950 text-zinc-300 border-zinc-800"
                  }`}
                >
                  Specs & Architecture
                </Button>

                <Button
                  variant="outline"
                  onClick={() => navigate("/settings")}
                  className="w-full justify-start text-sm py-5 rounded-xl bg-zinc-950 text-zinc-300 border-zinc-800"
                >
                  Account Settings
                </Button>

                <div className="h-px w-full bg-zinc-800 my-2"></div>

                <Button
                  variant="outline"
                  className="w-full justify-start text-sm py-5 rounded-xl bg-zinc-950 text-white border-zinc-800 gap-2.5"
                  onClick={() => setIsUploadOpen(true)}
                >
                  <CloudUpload className="w-4 h-4" />
                  Upload Audio Track
                </Button>

                <Button
                  variant="ghost"
                  className="w-full justify-start text-sm py-5 rounded-xl text-zinc-400 hover:text-white hover:bg-zinc-900 gap-2.5 mt-2"
                  onClick={handleLogout}
                >
                  <LogOut className="w-4 h-4" />
                  Sign Out
                </Button>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>

      <UploadModal
        isOpen={isUploadOpen}
        onClose={() => setIsUploadOpen(false)}
      />
    </header>
  );
};

export default Navbar;
