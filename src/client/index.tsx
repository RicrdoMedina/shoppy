import * as React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { hydrate, render } from 'react-dom';
import { Router } from 'react-router';
import { createBrowserHistory } from 'history';
import { App } from '@core/App';
import { config } from '@core/features/config';

import { registerServiceWorker } from './serviceWorker';

const history = createBrowserHistory();
const renderMethod = config.isDev && config.useRender ? render : hydrate;

registerServiceWorker();

renderMethod(
  <Router history={history}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Router>,
  document.getElementById('root')
);
