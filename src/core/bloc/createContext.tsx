import React from 'react';

export function createContext<T>() {
  const context = React.createContext<T | undefined>(undefined);

  return context;
}
