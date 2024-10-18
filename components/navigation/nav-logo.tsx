import { ShoppingBasket } from "lucide-react";
import Link from "next/link";

const NavLogo = () => {
  return (
    <Link href={"/"} className="text-3xl font-bold text-primary">
      <ShoppingBasket size={46}/>
    </Link>
  );
};

export default NavLogo;
