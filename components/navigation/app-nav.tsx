import { auth } from "@/server/auth";
import NavLogo from "./nav-logo";
import Userbutton from "./user-button";
import { ShoppingCart } from "lucide-react";
import CartDrawer from "../cart/cart-drawer";

const AppNav = async () => {
  const session = await auth();

  return (
    <nav className="flex items-center justify-between py-4">
      <NavLogo />
      <div className="flex items-center gap-8 cursor-pointer">
        <CartDrawer >
          <div className="relative">
            <ShoppingCart size={30} strokeWidth="2" />
            <span className="absolute -top-2 -right-3 bg-primary text-white w-5 h-5 rounded-full flex items-center justify-center">
              1
            </span>
          </div>
        </CartDrawer>
        <Userbutton user={session?.user!} expires={session?.expires!} />
      </div>
    </nav>
  );
};

export default AppNav;
