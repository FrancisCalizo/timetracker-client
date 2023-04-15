import React, { createContext, useState } from 'react';

export const AppContext = createContext<any>(null);

interface AppContextProps {
  children: React.ReactNode;
}

export type UserInfo = {
  id: number,
  firstName: string,
  lastName: string,
  email: string,
  type: string
};

const USER_INFO_DEFAULTS = { id: 1, firstName: 'Albert', lastName: 'Johnson', type: 'Admin', email: 'test@test.com'}

export default function AppProvider({ children }: AppContextProps) {
  const [userInfo, setUserInfo] = useState<UserInfo>(USER_INFO_DEFAULTS);

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
