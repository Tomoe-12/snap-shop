import { Apple } from "lucide-react";
import Link from "next/link";

const NavLogo = () => {
  return (
    <Link href={"/"} className="text-3xl font-bold text-primary font-mono text-bold flex gap-1 items-center ">
      <Apple size={46} className=" fill-primary "/>
      <span className="text-5xl ">iThi</span>
    </Link>
  );
};

export default NavLogo;
