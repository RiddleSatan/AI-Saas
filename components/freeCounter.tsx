'use client';

import { useState, useEffect } from "react";

type freeCounterProps = {
    apiLimit: number
}

export default function FreeCounter({ apiLimit = 0 }: freeCounterProps) {

    const [mounted, setMounted] = useState(false)
    useEffect(() => (
        setMounted(true)
    ), [])

    if (!mounted) {
        return null
    }


    return (
        <div>free counter</div>
    )
}