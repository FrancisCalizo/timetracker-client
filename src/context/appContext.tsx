import React, { createContext, useState, useEffect } from 'react';
import {
    USER_INFO_DEFAULTS_ADMIN,
    USER_INFO_DEFAULTS_CLIENT,
    USER_INFO_DEFAULTS_CANDIDATE
} from './utils'

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

export const USER_DEFAULTS = { admin: USER_INFO_DEFAULTS_ADMIN, client: USER_INFO_DEFAULTS_CLIENT, candidate: USER_INFO_DEFAULTS_CANDIDATE }

export default function AppProvider({ children }: AppContextProps) {
  const [userInfo, setUserInfo] = useState<UserInfo>(USER_INFO_DEFAULTS_ADMIN);
  const [themeColor, setThemeColor] = useState('primary')

  useEffect(() => {
    const type = localStorage.getItem('type')

    if (type) {
      // @ts-ignore
      setUserInfo(USER_DEFAULTS[type])
    }
  }, [])
  
  return (
    <AppContext.Provider value={{ userInfo, setUserInfo, themeColor, setThemeColor }}>
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
