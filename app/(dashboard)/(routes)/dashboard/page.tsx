'use client'

import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { ArrowRight, Code2, Image, LayoutDashboard, MessageCircle, Music, Settings2, VideoIcon } from "lucide-react";
import Router, { useRouter } from "next/navigation";

const tools = [{
  label: "Dashboard",
  icon: LayoutDashboard,
  href: "/dashboard",
  color: "text-orange-500",
  bgColor: "bg-orange-500/10"
},
{
  label: "Conversation",
  icon: MessageCircle,
  href: "/conversation",
  color: "text-blue-400",
  bgColor: "bg-blue-500/10"
},
{
  label: "Image Generation",
  icon: Image,
  href: "/image",
  color: "text-pink-500",
  bgColor: "bg-pink-500/10"
},
{
  label: "Video Generation",
  icon: VideoIcon,
  href: "/video",
  color: "text-violet-500",
  bgColor: "bg-violet-500/10"
},
{
  label: "Music Generation",
  icon: Music,
  href: "/music",
  color: "text-cyan-500",
  bgColor: "bg-cyan-500/10"
},
{
  label: "Code Generation",
  icon: Code2,
  href: "/code",
  color: "text-green-400",
  bgColor: "bg-green-500/10"
},
{
  label: "Settings",
  icon: Settings2,
  href: "/settings",
  color: "text-red-500 ",
  bgColor: "bg-white/10 "
},]

const dashboard = () => {
  const router=useRouter()
  return (
    <div>
      <div className="mb-8 space-y-4">
        <h2 className="text-2xl md:text-4xl font-bold text-center ">Explore the power of AI</h2>
        <p className="text-muted-foreground font-light md:text-lg text-center">Chat with the smartest AI - Experience the Power of AI</p>
      </div>

      <div className="px-4 md:px-20 lg:px-32 space-y-4 ">
        {tools.map((tool) => {
          return <Card onClick={()=>router.push(tool.href)} key={tool.href}
            className="p-4 hover:shadow-md transition bg-black hover:bg-black/10 hover:text-black text-white border-black/5 flex items-center justify-between cursor-pointer"
          >
<div className="flex items-center gap-x-4">
<div className={cn('p-2 w-fit rounded-md',tool.bgColor)}>
<tool.icon className={cn('w-8 h-8',tool.color)}/>
</div>
<div className="font-semibold">{tool.label}</div>

</div>
<ArrowRight/>
          </Card>
        })}
      </div>
    </div>
  );
};

export default dashboard;
