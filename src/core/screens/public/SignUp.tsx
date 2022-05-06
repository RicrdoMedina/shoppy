import React from 'react';
// Components
import { LayoutPublic } from '@core/components/layout/LayoutPublic';
import { SignUpForm } from '@core/user/presentation/sign-form/SignUpForm';

export const SignUp = () => {
  return (
    <LayoutPublic>
      <SignUpForm />
    </LayoutPublic>
  );
};
