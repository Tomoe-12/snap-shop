"use server";

import { getBaseUrl } from "@/lib/get-baseURL";
import { Resend } from "resend";
import { emailConfirmationTemplateProps } from "@/components/email-template";

const currentBaseUrl = getBaseUrl();
console.log("current", currentBaseUrl);

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
