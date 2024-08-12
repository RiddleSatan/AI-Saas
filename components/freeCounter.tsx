

import { useState, useEffect } from "react";
import { Card, CardContent } from "./ui/card";
import { MAX_FREE_COUNT } from "@/const";
import { Progress } from "@/components/ui/progress"
import { Button } from "./ui/button";
import { Zap } from "lucide-react";
import { useAppDispatch } from "@/lib/hooks";
import { onOpen } from "@/lib/features/upgrade/upgradeSlice";



type freeCounterProps = {
    apiLimit: number
}



export default function FreeCounter({ apiLimit = 0 }: freeCounterProps) {
    const dispatch = useAppDispatch()

    const handleOpen = () => {
        dispatch(onOpen())
    }

    const [mounted, setMounted] = useState(false)
    useEffect(() => (
        setMounted(true)
    ), [])

    if (!mounted) {
        return null
    }


    return (
        <div className="px-3">
            <Card className="border-0 bg-white ">
                <CardContent className="py-4">
                    <div className="text-center text-sm">
                        <p>{apiLimit}/{MAX_FREE_COUNT}  Free Generations</p>

                        <Progress className="h-3 mt-1 border-black bg-white  border-[1px]" value={(apiLimit / MAX_FREE_COUNT) * 100} />
                        <Button onClick={handleOpen} className="mt-3 w-full h-8 bg-black text-white hover:bg-orange-500 ">
                            Upgrade
                            <Zap className="w-4 h-4 ml-2" />
                        </Button>
                    </div>

                </CardContent >
            </Card>

        </div>
    )
}