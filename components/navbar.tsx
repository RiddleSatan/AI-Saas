


import { UserButton } from "@clerk/nextjs";

import MobileSidebar from "./mobileSidebar";
import { getApiLimitCount } from "@/lib/api-limit";

type navbar={
  apiLimit:number
}

const Navbar = async ({apiLimit}:navbar) => {



  return (
    <div className="flex items-center p-4">
      <MobileSidebar apiLimit={apiLimit} />
      <div className=" w-full flex justify-end "> 
        <UserButton />
      </div>

    </div>
  );
};

export default Navbar;
