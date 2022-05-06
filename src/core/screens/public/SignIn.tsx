import React from 'react';
// Components
import { LayoutPublic } from '@core/components/layout/LayoutPublic';
import { SignInForm } from '@core/user/presentation/sign-form/SignInForm';

export const SignIn = () => {
  return (
    <LayoutPublic>
      <SignInForm />
    </LayoutPublic>
  );
};
