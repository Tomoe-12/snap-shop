import { auth } from "@/server/auth";
import NavLogo from "./nav-logo";
import Userbutton from "./user-button";
import CartBtn from "../cart/cart-btn";

const AppNav = async () => {
  const session = await auth();
 
  return (
    <nav className="flex items-center justify-between py-4">
      <NavLogo />
      <div className="flex items-center gap-8 cursor-pointer">
        <CartBtn/>
        <Userbutton user={session?.user!} expires={session?.expires!} />
      </div>
    </nav>
  );
};

export default AppNav;
