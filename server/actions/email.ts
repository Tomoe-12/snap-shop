"use server";

import { getBaseUrl } from "@/lib/get-baseURL";
import { Resend } from "resend";
import { emailConfirmationTemplateProps } from "@/components/email-template";
import { ResetPasswordEmail } from "@/components/password-reset-email";
import MagicCodeEmail from "@/components/two-factor-mail";

const currentBaseUrl = getBaseUrl();

const resend = new Resend(process.env.RESEND_API_KEY);

export const sendEmail = async (
  email: string,
  token: string,
  userFirstname: string
) => {
  const confirmLink = `${currentBaseUrl}/confirm-email?token=${token}`;
  console.log("confirm link", confirmLink);

  const { data, error } = await resend.emails.send({
    from: "SnapShop <onboarding@resend.dev>",
    to: email,
    subject: "Account Confirmation Email - SnapShop",
    react: emailConfirmationTemplateProps({
      userFirstname,
      confirmEmailLink: confirmLink,
    }),
  });

  if (error) {
    console.log(error);
  }
};

export const sendPasswordResetEmail = async (
  username: string,
  email: string,
  token: string
) => {
  const resetLink = `${currentBaseUrl}/change-password?token=${token}`;
  console.log("confirm link", resetLink);

  const { data, error } = await resend.emails.send({
    from: "SnapShop <onboarding@resend.dev>",
    to: email,
    subject: "Reset Password - Alert from  SnapShop",
    react: ResetPasswordEmail({
      username,
      updatedDate: new Date(),
      resetPasswordLink: resetLink,
    }),
  });

  if (error) {
    console.log(error);
  }
};

export const sendTwoFactorEmail = async (
  username: string,
  email: string,
  code: string
) => {

  const { data, error } = await resend.emails.send({
    from: "SnapShop <onboarding@resend.dev>",
    to: email,
    subject: "Two Factor Authenticatio Code  - SnapShop",
    react: MagicCodeEmail({
       code ,
    }),
  });

  if (error) {
    console.log(error);
  }
};