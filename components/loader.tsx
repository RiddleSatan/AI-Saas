import Image from "next/image"


const Loader = () => {
    return (
        <div className="h-full flex flex-col items-center justify-center gap-y-4">
            <div className="w-24 h-24 relative  animate-spin">
                <Image className="size-40" src="/Loading.png" fill alt="logo" />
            </div>
            <p className="text-muted-foreground">working on it...</p>

        </div>
    )
}

export default Loader