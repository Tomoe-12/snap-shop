"use server";

import ChangePassword from "@/components/settings/change-password";
import ProfileCard from "@/components/settings/profile-card";
import TwoFactor from "@/components/settings/Two-factor";
import React from "react";
import SettingsCard from "@/components/settings/settings-card";
import { auth } from "@/server/auth";
import { redirect } from "next/navigation";

const Settings = async () => {
  const session = await auth();
  if (!session?.user) return redirect("/"); //redirect('/auth/login')

  return (
    <SettingsCard title="Settings" description="Manage your account settings">
      <main className="grid  md:grid-cols-2 gap-4 pt-6 ">
          <ProfileCard session={session} />
        <div className="space-y-4">
          <ChangePassword />
          <TwoFactor />
        </div>
      </main>
    </SettingsCard>
  );
};

export default Settings;
