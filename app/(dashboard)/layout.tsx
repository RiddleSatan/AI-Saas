import Navbar from "@/components/navbar";
import Sidebar from "@/components/sidebar";
import { getApiLimitCount } from "@/lib/api-limit";

const dashboardLayout =async ({ children }: { children: React.ReactNode }) => {
  const apiLimit= await getApiLimitCount()
  return (
    <div className="h-full relative">
      <div className="hidden h-full md:flex md:w-72 md:flex-col md:fixed md:inset-y-0 z-[80] bg-black">
        <Sidebar apiLimit={apiLimit} />
      </div>

      <main className=" md:pl-72">
        <Navbar/>

        {children}
      </main>
    </div>
  );
};

export default dashboardLayout;
