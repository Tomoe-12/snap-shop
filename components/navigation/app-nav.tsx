import { auth } from "@/server/auth";
import NavLogo from "./nav-logo";
import Userbutton from "./user-button";

const AppNav = async () => {
  const session = await auth();

  return (
    <nav className="flex items-center justify-between py-4">
      <NavLogo />
      <Userbutton user={session?.user} expires={session?.expires!} />
    </nav>
  );
};

export default AppNav;
