import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import ProjectDetail from '../components/ProjectDetail';

const ProjectDetailPage: React.FC = () => {
  const { projectId } = useParams<{ projectId: string }>();
  const navigate = useNavigate();

  const handleBackToProjects = () => {
    navigate('/projects');
  };

  const handleEditProject = (project: any) => {
    console.log('Edit project:', project);
  };

  const handleGanttView = (projectId: string) => {
    navigate(`/projects/${projectId}/gantt`);
  };

  if (!projectId) {
    return (
      <div className="text-center py-12">
        <h2 className="text-xl font-semibold text-gray-900 mb-2">Project Not Found</h2>
        <p className="text-gray-600">No project ID specified.</p>
        <button onClick={handleBackToProjects} className="btn-primary mt-4">
          Back to Projects
        </button>
      </div>
    );
  }

  return (
    <>
      <ProjectDetail 
        projectId={projectId}
        onBack={handleBackToProjects}
        onEditProject={handleEditProject}
        onGanttView={handleGanttView}
      />
    </>
  );
};

export default ProjectDetailPage;