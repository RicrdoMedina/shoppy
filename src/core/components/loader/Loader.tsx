import React from 'react';
// styles
import '@core/assets/styles/core/common/loader/Loader.scss';

type LoaderProps = {
  message?: string;
};

export const Loader = ({ message }: LoaderProps) => {
  return (
    <div className="w-full">
      <div className="overlay-glass-effect" />
      <div className="loader">
        <div className="blobs">
          <div className="blob-center" />
          <div className="blob" />
          <div className="blob" />
          <div className="blob" />
          <div className="blob" />
          <div className="blob" />
          <div className="blob" />
        </div>
        <svg xmlns="http://www.w3.org/2000/svg" version="1.1">
          <defs>
            <filter id="goo">
              <feGaussianBlur
                in="SourceGraphic"
                stdDeviation="10"
                result="blur"
              />
              <feColorMatrix
                in="blur"
                mode="matrix"
                values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 18 -7"
                result="goo"
              />
              <feBlend in="SourceGraphic" in2="goo" />
            </filter>
          </defs>
        </svg>
        {message && <div className="loader-message text-base">{message}</div>}
      </div>
    </div>
  );
};
