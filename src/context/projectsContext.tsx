import * as React from 'react';

import { FAKE_DATA } from 'src/components/layout/dashboard/Links/Projects/utils/data';

const ProjectsContext = React.createContext(null as any);

function ProjectsProvider({ children }: any) {
  const [projectsList, setProjectsList] = React.useState(FAKE_DATA);
  const [selectedTimesheet, setSelectedProject] = React.useState(null);
  const [isEditMode, setIsEditMode] = React.useState(false);

  return (
    <ProjectsContext.Provider
      value={{
        projectsList,
        setProjectsList,
        selectedTimesheet,
        setSelectedProject,
        isEditMode,
        setIsEditMode,
      }}
    >
      {children}
    </ProjectsContext.Provider>
  );
}

function useProjects() {
  const context = React.useContext(ProjectsContext);

  if (context === undefined) {
    throw new Error('useProjects must be used within a ProjectsProvider');
  }

  return context;
}

export { ProjectsProvider, useProjects };
