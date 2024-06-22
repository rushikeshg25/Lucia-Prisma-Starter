import React from "react";
import signIn from "../actions/sign-in";

const SignInForm = () => {
  return (
    <div className='flex flex-col gap-y-2'>
      <div>
        <a href='/login/github'>Sign in with GitHub</a>
      </div>
      <form action={signIn} className='p-4 flex flex-col gap-y-2'>
        <input name='email' type='email' placeholder='Email' />
        <input name='password' type='password' placeholder='Password' />
        <button type='submit'>Sign In</button>
      </form>
    </div>
  );
};

export { SignInForm };
