"use client";

import { confirmEmailWithToken } from "@/server/actions/token";
import { useRouter, useSearchParams } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
import AuthForm from "./auth/auth-form";
import { cn } from "@/lib/utils";

const ConfirmEmail = () => {
  // const token = useSearchParams().get("token");
  const [token,setToken] = useState<string | null>(null);
  const router = useRouter();
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

   // Only get the token on the client side after the component has mounted
   useEffect(() => {
    const tokenFromUrl = new URLSearchParams(window.location.search).get("token");
    setToken(tokenFromUrl);
  }, []);

  const handleConfirmEmail = useCallback(() => {
    if (!token) {
      setError("Invalid token");
      return;
    }
    confirmEmailWithToken(token).then((res) => {
      if (res.success) {
        setSuccess(res.success);
        router.push("/auth/login");
      }
      if (res.error) {
        setError(res.error);
      }
    });
  }, []);

  useEffect(() => {
   if(token){
    handleConfirmEmail();
   }
  }, [token,handleConfirmEmail ]);

  return (
    <AuthForm
      formTitle="Confirm Email"
      footerLabel="Logoin to Your Account"
      footerHerf="/auth/login"
      showProvider={false}
    >
      <p
        className={cn(
          "text-center font-bold text-xl text-primary",
          error && "text-red-600"
        )}
      >
        {!success && !error
          ? "Confirming Email .... "
          : success
          ? success
          : error}
      </p>
    </AuthForm>
  );
};

export default ConfirmEmail;
