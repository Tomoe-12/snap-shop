"use client";

import React from "react";
import SettingsCard from "./settings-card";
import { Button } from "../ui/button";
import { LogOut } from "lucide-react";
import { signOut } from "next-auth/react";

const SettingLogout = () => {
  return (
    <SettingsCard>
      <h2 className="text-sm font-semibold mb-2 text-red-600 ">Danger Zone</h2>
      <Button variant={"destructive"} onClick={() => signOut()}>
        <LogOut className="mr-2 h-4 w-4" />
        Logout
      </Button>k
    </SettingsCard>
  );
};

export default SettingLogout;
