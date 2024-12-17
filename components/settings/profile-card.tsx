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
import AvatarUploadForm from "./avatar-upload-form";
type ProfileCardProps = {
  session: Session;
};

const ProfileCard = ({ session }: ProfileCardProps) => {
  const isDesktop = useMediaQuery("(min-width: 768px)");
  const [open, setOpen] = useState(false);

  const handleSetOpen = () => {
    setOpen(false);
  };

  return (
    <SettingsCard>
      <div className="flex items-start justify-between">
        <div className="flex items-start gap-3">
          <AvatarUploadForm
            name={session?.user?.name!}
            image={session?.user?.image}
            email={session?.user?.email!}
          />
          <div>
            <p className="text-sm font-medium text-muted-foreground ">
              Display Name
            </p>
            <h2 className="font-medium text-lg">{session?.user?.name}</h2>
            <p className="text-sm font-medium text-muted-foreground ">Email</p>
            <p className="text-base font-medium">
              {session?.user?.email}
            </p>
          </div>
        </div>

        {isDesktop ? (
          <Dialog open={open} onOpenChange={setOpen}>
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
                handleSetOpen={handleSetOpen}
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
                handleSetOpen={handleSetOpen}
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
