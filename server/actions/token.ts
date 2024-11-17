"use server";

import { eq } from "drizzle-orm";
import { db } from "..";
import {
  emailVerificationToken,
  resetPasswordVerificationToken,
  twoFactorToken,
  users,
} from "../schema";
import crypto from "crypto";

//  ------------ email  --------------
const checkEmailVerificationToken = async (
  email: string | null,
  token?: string
) => {
  try {
    let verificationToken;
    if (email) {
      verificationToken = await db.query.emailVerificationToken.findFirst({
        where: eq(emailVerificationToken.email, email!),
      });
    }

    if (token) {
      verificationToken = await db.query.emailVerificationToken.findFirst({
        where: eq(emailVerificationToken.token, token!),
      });
    }

    return verificationToken;
  } catch (error) {
    return null;
  }
};

export const generateEmailVerificationToken = async (email: string) => {
  const token = crypto.randomUUID();
  const expires = new Date(new Date().getTime() + 30 * 60 * 1000);

  const existingToken = await checkEmailVerificationToken(email);

  if (existingToken) {
    await db
      .delete(emailVerificationToken)
      .where(eq(emailVerificationToken.id, existingToken.id));
  }

  const verificationToken = await db
    .insert(emailVerificationToken)
    .values({
      email,
      token,
      expires,
    })
    .returning();

  return verificationToken;
};

export const confirmEmailWithToken = async (token: string) => {
  const existingToken = await checkEmailVerificationToken(null, token);

  if (!existingToken) return { error: "invalid token" };

  const isExpired = new Date() > new Date(existingToken.expires);

  if (isExpired) return { error: "token expired" };

  const existingUser = await db.query.users.findFirst({
    where: eq(users.email, existingToken.email),
  });

  if (!existingUser) return { error: "user not found" };

  await db
    .update(users)
    .set({
      emailVerified: new Date(),
      email: existingToken.email,
    })
    .where(eq(users.id, existingUser.id));

  await db
    .delete(emailVerificationToken)
    .where(eq(emailVerificationToken.id, existingToken.id));

  return { success: "Email confirmed" };
};

// ---------- reset password -----------------

const checkPasswordResetToken = async (email: string) => {
  try {
    const passwordResetToken =
      await db.query.resetPasswordVerificationToken.findFirst({
        where: eq(resetPasswordVerificationToken.email, email),
      });

    return passwordResetToken;
  } catch (error) {
    return null;
  }
};

export const generatePasswordResetToken = async (email: string) => {
  const token = crypto.randomUUID();
  const expires = new Date(new Date().getTime() + 30 * 60 * 1000);

  const existingToken = await checkPasswordResetToken(email);

  if (existingToken) {
    await db
      .delete(resetPasswordVerificationToken)
      .where(eq(resetPasswordVerificationToken.id, existingToken.id));
  }

  const verificationToken = await db
    .insert(resetPasswordVerificationToken)
    .values({
      email,
      token,
      expires,
    })
    .returning();

  return verificationToken;
};

export const checkPasswordResetTokenByToken = async (token: string) => {
  try {
    const passwordResetToken =
      await db.query.resetPasswordVerificationToken.findFirst({
        where: eq(resetPasswordVerificationToken.token, token),
      });

    return passwordResetToken;
  } catch (error) {
    return null;
  }
};

export const getTwoFactorCodeByEmail = async (email: string) => {
  try {
    const existingCode = await db.query.twoFactorToken.findFirst({
      where: eq(twoFactorToken.email, email),
    });

    return existingCode;
  } catch (error) {
    return null;
  }
};

export const generateTwoFactorCode = async (email: string) => {
  try {
    const code = crypto.randomInt(100000, 1000000).toString();

    const expires = new Date(new Date().getTime() + 30 * 60 * 1000);

    const existingCode = await getTwoFactorCodeByEmail(email);

    if (existingCode) {
      await db
        .delete(twoFactorToken)
        .where(eq(twoFactorToken.id, existingCode.id));
    }

    const user = await db.query.users.findFirst({
      where: eq(users.email, email),
    });

    if (!user) return null;

    const twoFactorCode = await db
      .insert(twoFactorToken)
      .values({
        email,
        token: code,
        expires,
        userId: user?.id!,
      })
      .returning();

    return twoFactorCode;
  } catch (error) {
    return null;
  }
};
