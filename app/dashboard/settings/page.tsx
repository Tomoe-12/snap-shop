"use server";

import ChangePassword from "@/components/settings/change-password";
import ProfileCard from "@/components/settings/profile-card";
import TwoFactor from "@/components/settings/Two-factor";
import React from "react";
import SettingsCard from "@/components/settings/settings-card";
import { auth } from "@/server/auth";
import { redirect } from "next/navigation";
import SettingLogout from "@/components/settings/log-out";

const Settings = async () => {
  const session = await auth();
  if (!session?.user) return redirect("/"); //redirect('/auth/login')

  return (
    <SettingsCard title="Settings" description="Manage your account settings">
      <main className="flex flex-col gap-4  ">
        <ProfileCard session={session} />
        {!session.user.isOauth && (
          <>
            <ChangePassword email={session.user.email!} />
            <TwoFactor
              isTowFactorEnable={session.user.isTowFactorEnable}
              email={session.user.email!}
            />
          </>
        )}
        <SettingLogout />
      </main>
    </SettingsCard>
  );
};

export default Settings;
