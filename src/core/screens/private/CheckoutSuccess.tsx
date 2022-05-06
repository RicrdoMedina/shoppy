import React from 'react';
// Components
import { LayoutDashboard } from '@core/components/layout/LayoutDashboard';
import { CheckoutContentSuccess } from '@core/cart/presentation/checkout-content/CheckoutContentSuccess';

export const CheckoutSuccess = () => {
  return (
    <LayoutDashboard>
      <CheckoutContentSuccess />
    </LayoutDashboard>
  );
};
