import AuthForm from "@/components/auth/auth-form";
import React from "react";

const Register = () => {
  return (
    <div>
      <AuthForm
        footerLabel="Already have an account ?"
        showProvider
        footerHerf="/auth/login"
        formTitle="Register Account "
      >
        <h2>Register Form </h2>
      </AuthForm>
    </div>
  );
};

export default Register;
