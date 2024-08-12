'use client'

const  LandingLayout = ({ children }: {
    children: React.ReactNode
}) => { 
    return (

        <main className="w-full p-0 bg-black ">
         <div className="max-w-screen-xl h-full w-full mx-auto">
            {children}
         </div>
        </main>
    )
}

export default LandingLayout