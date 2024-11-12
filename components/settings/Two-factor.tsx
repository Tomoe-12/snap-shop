import React from "react";
import SettingsCard from "./settings-card";
import { Button } from "../ui/button";
import { Check, X } from "lucide-react";
import { auth } from "@/server/auth";

const TwoFactor = async() => {
  const session = await auth()
  return (
    <SettingsCard>
      <div className="flex justify-between items-center">
        <p className="text-sm font-medium">Two Factor Authentication</p>
        {session?.user.isTowFactorEnable ? (
          <Button variant={"outline"} className="bg-primary text-white hover:bg-green-700 hover:text-white">
            <Check className="w-5 h-5 me-1" /> On
          </Button>
        ) : (
          <Button variant={"destructive"} >
            <X className="w-5 h-5 me-1" />
            Off
          </Button>
        )}
      </div>
    </SettingsCard>
  );
};

export default TwoFactor;
