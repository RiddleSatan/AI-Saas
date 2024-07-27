import Link from "next/link";
import { Button } from "@/components/ui/button";

const landingPage = () => {
  return <div>Landing page (unprotected)

    <div>
      <Link href='/sign-in'>
      <Button>
        SignIn
      </Button>
      </Link> 
      <Link href='/sign-up'>
      <Button>
        Register
      </Button>
      </Link>
    </div>
  </div>;
};

export default landingPage;
