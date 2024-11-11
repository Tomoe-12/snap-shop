"use client";

import { Session } from "next-auth";
import React, { useState } from "react";
import SettingsCard from "./settings-card";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { UserRoundPen } from "lucide-react";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import { Button } from "../ui/button";
import useMediaQuery from "@/hooks/useMediaQuery";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import ProfileForm from "./profile-form";
type ProfileCardProps = {
  session: Session;
};

const ProfileCard = ({ session }: ProfileCardProps) => {
  const isDesktop = useMediaQuery("(min-width: 768px)");
  const [open, setOpen] = useState(false);

  return (
    <SettingsCard>
      <div className="flex items-start justify-between">
        <div className="flex items-center gap-3">
          <Avatar className="w-14 h-14 ">
            <AvatarImage src={session.user?.image!} alt="Profile" />
            <AvatarFallback className="bg-primary text-white font-semibold w-32 ">
              {session?.user?.name![0].toUpperCase()}
            </AvatarFallback>
          </Avatar>
          <div>
            <h2 className="font-semibold text-lg">{session?.user?.name}</h2>
            <p className="text-sm font-medium text-muted-foreground">
              {session?.user?.email}
            </p>
          </div>
        </div>

        {isDesktop ? (
          <Dialog>
            <DialogTrigger asChild>
              <UserRoundPen
                size={24}
                className="text-muted-foreground hover:text-black cursor-pointer"
              />
            </DialogTrigger>
            <DialogContent className="mx-4 lg:mx-0">
              <DialogHeader>
                <DialogTitle>Edit Profile </DialogTitle>
                <DialogDescription>
                  This will be your public display name.
                </DialogDescription>
              </DialogHeader>
              <ProfileForm
                name={session?.user?.name!}
                email={session?.user?.email!}
              />
              <DialogClose asChild>
                <Button variant={"outline"} className="w-full">
                  Cancel
                </Button>
              </DialogClose>
            </DialogContent>
          </Dialog>
        ) : (
          <Drawer open={open} onOpenChange={setOpen}>
            <DrawerTrigger asChild>
              <UserRoundPen
                size={24}
                className="text-muted-foreground hover:text-black cursor-pointer"
              />
            </DrawerTrigger>
            <DrawerContent>
              <DrawerHeader className="text-left">
                <DrawerTitle>Edit Profile</DrawerTitle>
                <DrawerDescription>
                  This will be your public display name.
                </DrawerDescription>
              </DrawerHeader>
              <ProfileForm
                name={session?.user?.name!}
                email={session?.user?.email!}
              />
              <DrawerFooter>
                <DrawerClose asChild>
                  <Button variant={"outline"} className="w-full">
                    Cancel
                  </Button>
                </DrawerClose>
              </DrawerFooter>
            </DrawerContent>
          </Drawer>
        )}
      </div>
    </SettingsCard>
  );
};

export default ProfileCard;
