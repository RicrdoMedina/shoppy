import React from 'react';
// Components
import { LayoutDashboard } from '@core/components/layout/LayoutDashboard';
import { CheckoutContentCancel } from '@core/cart/presentation/checkout-content/CheckoutContentCancel';

export const CheckoutCancel = () => {
  return (
    <LayoutDashboard>
      <CheckoutContentCancel />
    </LayoutDashboard>
  );
};
