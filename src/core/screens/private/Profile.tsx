import React from 'react';
// Components
import { LayoutDashboard } from '@core/components/layout/LayoutDashboard';
import { ProfileForm } from '@core/user/presentation/profile-form/ProfileForm';

export const Profile: React.FC = () => {
  return (
    <LayoutDashboard>
      <ProfileForm />
    </LayoutDashboard>
  );
};
