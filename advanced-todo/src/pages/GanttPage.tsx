import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import GanttView from '../components/GanttView';

const GanttPage: React.FC = () => {
  const { projectId } = useParams<{ projectId: string }>();
  const navigate = useNavigate();

  const handleBackToProjects = () => {
    navigate('/projects');
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
      <div className="space-y-4">
        <button onClick={handleBackToProjects} className="btn-secondary">
          ← Back to Projects
        </button>
        <GanttView projectId={projectId} />
      </div>
    </>
  );
};

export default GanttPage;