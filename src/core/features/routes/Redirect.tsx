// tslint:disable: no-any
import React from 'react';
import { Redirect } from 'react-router-dom';

type RedirectToProps = {
  url: string;
  payload?: any;
};

export const RedirectTo = ({ url, payload }: RedirectToProps) => {
  return (
    <Redirect
      to={{
        pathname: url,
        state: payload
      }}
    />
  );
};
