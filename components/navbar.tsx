


import { UserButton } from "@clerk/nextjs";

import MobileSidebar from "./mobileSidebar";
import { getApiLimitCount } from "@/lib/api-limit";




const Navbar = async () => {

const apiLimit=await getApiLimitCount()

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
