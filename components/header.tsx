import { cn } from "@/lib/utils";
import { LucideIcon } from "lucide-react";

type headerProps = {
    title: string;
    description: string;
    icon: LucideIcon;
    iconColor?: string;
    bgColor?: string;
}

export const Header = ({ title, description, icon: Icon, iconColor, bgColor }: headerProps) => {
    return <>
        <div className="p-4 lg:p-8 flex items-center gap-x-3 mb-8">
            <div className={cn('w-fit p-2 rounded-md', bgColor)}>
                <Icon className={cn('w-10 h-10',iconColor)} />
            </div>
           <div >
            <h1 className="text-3xl font-bold">{title}</h1>
            <p className="text-sm text-muted-foreground">{description}</p>
           </div>
        </div>
    </>
}