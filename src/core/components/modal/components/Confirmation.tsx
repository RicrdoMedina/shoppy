import React from 'react';

type ConfirmationProps = {
  img: string;
  text: string;
};

export const Confirmation = ({ img, text }: ConfirmationProps) => {
  return (
    <div className="w-full h-full flex flex-col justify-center items-center mt-8">
      {img && <img src={img} className="w-40" />}
      <p className="text-base md:text-xl lg:text-xl xl:text-2xl text-center mt-4 mb-4 px-8">
        {text}
      </p>
    </div>
  );
};
