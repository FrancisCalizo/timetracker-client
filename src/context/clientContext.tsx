import * as React from 'react';

import { FAKE_DATA } from 'src/components/layout/dashboard/Links/Clients/data';

const ClientContext = React.createContext(null as any);

function ClientProvider({ children }: any) {
  const [clientList, setClientList] = React.useState(FAKE_DATA);
  const [selectedClient, setSelectedClient] = React.useState(null);
  const [isEditMode, setIsEditMode] = React.useState(false);

  return (
    <ClientContext.Provider
      value={{
        clientList,
        setClientList,
        selectedClient,
        setSelectedClient,
        isEditMode,
        setIsEditMode,
      }}
    >
      {children}
    </ClientContext.Provider>
  );
}

function useClient() {
  const context = React.useContext(ClientContext);

  if (context === undefined) {
    throw new Error('useClient must be used within a ClientProvider');
  }

  return context;
}

export { ClientProvider, useClient };
