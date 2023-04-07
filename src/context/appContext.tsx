import React, { createContext, useState } from 'react';

export const AppContext = createContext<any>(null);

interface AppContextProps {
  children: React.ReactNode;
}

export type UserInfo = {
  userid: number;
  first_name: string;
  last_name: string;
  email: string;
};

export default function AppProvider({ children }: AppContextProps) {
  const [userInfo, setUserInfo] = useState<UserInfo | null>(null);

  return (
    <AppContext.Provider value={{ userInfo, setUserInfo }}>
      {children}
    </AppContext.Provider>
  );
}

function useAppContext() {
  const context = React.useContext(AppContext);

  if (context === undefined) {
    throw new Error('useAppContext must be used within a TimesheetsProvider');
  }

  return context;
}

export { AppProvider, useAppContext };
