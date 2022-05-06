import React from 'react';
// Components
import { LayoutDashboard } from '@core/components/layout/LayoutDashboard';
import { ProductList } from '@core/product/presentation/product-list/ProductList';

export const Home: React.FC = () => {
  return (
    <LayoutDashboard>
      <ProductList />
    </LayoutDashboard>
  );
};
