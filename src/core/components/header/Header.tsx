import React from 'react';
// Images
import Logo from '../../assets/images/Logo.png';

export const Header = () => {
  return (
    <div className="logo-app w-full flex items-center justify-center mt-8">
      <img src={Logo} className="w-72" alt="PokeApi" />
    </div>
  );
};
