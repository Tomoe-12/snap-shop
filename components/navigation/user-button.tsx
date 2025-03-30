"use client";
import { Session } from "next-auth";
import { Button } from "../ui/button";
import { signOut } from "next-auth/react";
import Link from "next/link";
import { LogIn, LogOut, Settings, Truck } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { useRouter } from "next/navigation";

const Userbutton = ({ user, expires }: Session) => {
  const router = useRouter();
  console.log(user);

  return (
    <div>
      {user?.email ? (
        // <Button >
        //   Logout
        // </Button>
        <DropdownMenu modal={false}>
          <DropdownMenuTrigger className="ring-0 border-2 border-primary rounded-full" >
            <Avatar>
              <AvatarImage src={user?.image!} />
              <AvatarFallback className="bg-primary text-white font-semibold">
                {user?.name![0].toUpperCase()}
              </AvatarFallback>
            </Avatar>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="p-2">
            <div className="flex items-center gap-2 px-4 py-2 border-2 border-black/10 rounded-lg mb-3 cursor-pointer hover:scale-95 transition-all duration-300 ease-in-out">
              <Avatar>
                <AvatarImage src={user?.image!} />
                <AvatarFallback className="bg-white text-primary font-semibold ">
                  {user?.name![0].toUpperCase()}
                </AvatarFallback>
              </Avatar>
              <div>
                <h3 className="font-bold text-sm ">{user?.name}</h3>
                <p className="text-sm font-medium">{user?.email}</p>
              </div>
            </div>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="cursor-pointer group hover:bg-primary/10">
              <Truck
                size={16}
                className="group-hover:translate-x-1 group-hover:text-primary transition-all duration-300 ease-in-out"
              />
              <span className="text-sm font-medium ">My Orders</span>
            </DropdownMenuItem>
            <DropdownMenuItem
              className="cursor-pointer group hover:bg-primary/10"
              onClick={() => router.push('/dashboard/settings')}
            >
              <Settings
                size={16}
                className="group-hover:rotate-90 group-hover:text-primary transition-all duration-300 ease-in-out "
              />
              <span className="text-sm font-medium ">Settings</span>
            </DropdownMenuItem>
            <DropdownMenuItem
              className="cursor-pointer group hover:bg-red-200"
              onClick={() => signOut()}
            >
              <LogOut
                size={16}
                className="group-hover:translate-x-1 group-hover:scale-90 transition-all duration-300 ease-in-out group-hover:text-red-600"
              />
              <span className="text-sm font-medium group-hover:text-red-600 duration-300">
                Logout
              </span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      ) : (
        <Button asChild>
          <Link href={"/auth/login"} className="space-x-4">
            <LogIn size={16} /> Login
          </Link>
        </Button>
      )}
    </div>
  );
};

export default Userbutton;
