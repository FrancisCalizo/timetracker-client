import React from 'react';

import Sidebar from 'src/components/layout/dashboard/Sidebar';
import Topbar from 'src/components/layout/dashboard/Topbar';
import Content from 'src/components/layout/dashboard/Content';

export default function DashboardLayout({ children }: any) {
  return (
    <>
      <Topbar />
      <Sidebar />
      <Content>{children}</Content>
    </>
  );
}
