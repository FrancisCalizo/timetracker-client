import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { BrowserRouter } from 'react-router-dom';
import { ClientProvider } from './context/clientContext';
import { TimesheetsProvider } from './context/timesheetsContext';
import { ConsultantProvider } from './context/consultantContext';
import { AppProvider} from './context/appContext';
import 'react-tooltip/dist/react-tooltip.css';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <AppProvider>
        <ClientProvider>
          <ConsultantProvider>
            <TimesheetsProvider>
              <App />
            </TimesheetsProvider>
          </ConsultantProvider>
        </ClientProvider>
      </AppProvider>
    </BrowserRouter>
  </React.StrictMode>
);

