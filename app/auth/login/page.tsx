import AuthForm from "@/components/auth/auth-form";
import React from "react";

const Login = () => {
  return (
    <div>
      <AuthForm
        formTitle="Login"
        footerLabel="Don't have an Account ?"
        footerHerf="/auth/register"
        showProvider
      >
        <h2>Login Form</h2>
      </AuthForm>
    </div>
  );
};

export default Login;
