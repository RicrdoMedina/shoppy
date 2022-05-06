import React from 'react';
// Components
import { LayoutDashboard } from '@core/components/layout/LayoutDashboard';
import { CartContent } from '@core/cart/presentation/cart-content/CartContent';

export const Cart: React.FC = () => {
  return (
    <LayoutDashboard>
      <CartContent />
    </LayoutDashboard>
  );
};
