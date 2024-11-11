import React from "react";
import SettingsCard from "./settings-card";
import { Button } from "../ui/button";
import { Check, X } from "lucide-react";

const TwoFactor = () => {
  return (
    <SettingsCard>
      <div className="flex justify-between items-center">
        <p>Two Factor Authentication</p>
        {true ? (
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
