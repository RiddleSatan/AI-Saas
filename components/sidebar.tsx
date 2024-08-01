"use client";

import React from "react";
import Link from "next/link";
import { Code2, Code2Icon, Image, LayoutDashboard, MessageCircle, MessageSquareIcon, Music, Settings, Settings2, VideoIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { usePathname } from "next/navigation";
import path from "path";

const routes = [
  {
    label: "Dashboard",
    icon: LayoutDashboard,
    href: "/dashboard",
    color: "text-orange-500",
  },
  {
    label: "Conversation",
    icon: MessageCircle,
    href: "/conversation",
    color: "text-blue-400",
  },
  {
    label: "Image Generation",
    icon: Image,
    href: "/image",
    color: "text-pink-500",
  },
  {
    label: "Video Generation",
    icon: VideoIcon,
    href: "/video",
    color: "text-violet-500",
  },
  {
    label: "Music Generation",
    icon: Music,
    href: "/music",
    color: "text-cyan-500",
  },
  {
    label: "Code Generation",
    icon: Code2,
    href: "/code",
    color: "text-green-400",
  },
  {
    label: "Settings",
    icon: Settings2,
    href: "/settings",
    color: "text-white",
  },
];

const Sidebar = () => {
  const pathname=usePathname()
  return (
    <>
      <div className="flex flex-col space-y-10 py-4 bg-black text-white h-full px-4">
        <Link
          className=" flex  gap-2 items-center  justify-start h-fit"
          href="/dashboard"
        >
          <div className="w-16 h-16 overflow-hidden">
            <img className="invert" src="./logo.png" alt="Logo" />
          </div>
          <h1 className="font-bold text-3xl">Riddle's</h1>
        </Link>
        
        <div className="space-y-1">
          {routes.map((route) => (
            <Link
              href={route.href} key={route.href}
              className={cn("text-sm group flex justify-start hover:bg-white/10 transition rounded w-full  py-3",pathname===route.href?"text-black bg-white hover:bg-white":"text-white")}
            >
              <div className="flex items-center justify-start flex-1 px-2 font-semibold ">
                <route.icon  className={`mr-3 w-5 h-5 ${route.color}`}/>
                {route.label}
              </div>
            </Link>
          ))}
        </div>
        </div>
    </>
  );
};

export default Sidebar;
