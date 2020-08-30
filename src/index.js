import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { GithubProvider } from './context/context';
import { Auth0Provider } from '@auth0/auth0-react';

//dev-syck20eb.us.auth0.com
//ggqUPnV9FBC6S3lsjOcNLj0m56d034b5

ReactDOM.render(
  <React.StrictMode>
    <Auth0Provider
      domain="dev-syck20eb.us.auth0.com"
      clientId="ggqUPnV9FBC6S3lsjOcNLj0m56d034b5"
      redirectUri={window.location.origin}
    >
      <GithubProvider>
        <App />
      </GithubProvider>
    </Auth0Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

