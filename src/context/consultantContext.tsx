import * as React from 'react';

import { FAKE_DATA } from 'src/components/layout/dashboard/Links/Consultants/data';

const ConsultantContext = React.createContext(null as any);

function ConsultantProvider({ children }: any) {
  const [consultantList, setConsultantList] = React.useState(FAKE_DATA);
  const [selectedConsultant, setSelectedConsultant] = React.useState(null);
  const [isEditMode, setIsEditMode] = React.useState(false);

  return (
    <ConsultantContext.Provider
      value={{
        consultantList,
        setConsultantList,
        selectedConsultant,
        setSelectedConsultant,
        isEditMode,
        setIsEditMode,
      }}
    >
      {children}
    </ConsultantContext.Provider>
  );
}

function useConsultant() {
  const context = React.useContext(ConsultantContext);

  if (context === undefined) {
    throw new Error('useConsultant must be used within a ConsultantProvider');
  }

  return context;
}

export { ConsultantProvider, useConsultant };
