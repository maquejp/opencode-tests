import React from 'react';
import { useUser } from '../contexts';
import { useNavigate } from 'react-router-dom';
import ProjectManagement from '../components/ProjectManagement';

const ProjectsPage: React.FC = () => {
  const { currentUser } = useUser();
  const navigate = useNavigate();

  const handleProjectDetail = (projectId: string) => {
    navigate(`/projects/${projectId}`);
  };

  const handleGanttView = (projectId: string) => {
    navigate(`/projects/${projectId}/gantt`);
  };

  if (!currentUser) {
    return (
      <div className="flex items-center justify-center h-64 text-gray-500">
        <p>Please log in to continue</p>
      </div>
    );
  }

  return (
    <>
      <ProjectManagement 
        onProjectDetail={handleProjectDetail}
        onGanttView={handleGanttView}
      />
    </>
  );
};

export default ProjectsPage;