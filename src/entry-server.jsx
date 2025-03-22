import React from 'react';
import App from './App';
import { StaticRouter } from 'react-router-dom/server';

export function render(url, context) {
  return (
    <StaticRouter location={url} context={context}>
      <App />
    </StaticRouter>
  );
}