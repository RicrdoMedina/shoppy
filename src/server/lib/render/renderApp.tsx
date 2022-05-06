import * as React from 'react';
import { renderToString } from 'react-dom/server';
import { StaticRouter } from 'react-router';
import { App } from '@core/App';

export const renderApp = (context?: object, location?: string | object) => {
  const appRoot = (
    <StaticRouter context={context} location={location}>
      <App />
    </StaticRouter>
  );

  return renderToString(appRoot);
};
