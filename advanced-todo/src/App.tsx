import React, { useState } from 'react';
import { UserProvider, useUser } from './contexts/UserContext';
import { TaskProvider, useTask } from './contexts/TaskContext';
import { ProjectProvider } from './contexts/ProjectContext';
import TaskForm from './components/TaskForm';
import TaskCard from './components/TaskCard';
import TaskFilters from './components/TaskFilters';
import ProjectManagement from './components/ProjectManagement';
import ProjectDetail from './components/ProjectDetail';
import UserManagement from './components/UserManagement';
import GanttView from './components/GanttView';
import Header from './components/Header';

const App: React.FC = () => {
  return (
    <UserProvider>
      <ProjectProvider>
        <TaskProvider>
          <AppContent />
        </TaskProvider>
      </ProjectProvider>
    </UserProvider>
  );
};

const AppContent: React.FC = () => {
  const { currentUser } = useUser();
  const { tasks = [] } = useTask();
  const [currentView, setCurrentView] = useState<'tasks' | 'users' | 'projects' | 'gantt' | 'project-detail'>('tasks');
  const [selectedProjectForGantt, setSelectedProjectForGantt] = useState<string | null>(null);
  const [selectedProjectForDetail, setSelectedProjectForDetail] = useState<string | null>(null);
  const [showTaskForm, setShowTaskForm] = useState(false);
  const [editingTask, setEditingTask] = useState<any>(null);

  if (!currentUser) {
    return (
      <div className="flex items-center justify-center h-64 text-gray-500">
        <p>Please log in to continue</p>
      </div>
    );
  }

  const renderContent = () => {
    if (currentView === 'gantt' && !selectedProjectForGantt) {
      return (
        <div className="text-center h-64 text-gray-500 mt-8">
          <p>Select a project to view its Gantt chart</p>
        </div>
      );
    }

    if (currentView === 'gantt' && selectedProjectForGantt) {
      return (
        <>
          <div className="mb-6">
            <button
              onClick={() => setCurrentView('projects')}
              className="btn-secondary mb-4"
            >
              ← Back to Projects
            </button>
          </div>
          <GanttView projectId={selectedProjectForGantt} />
        </>
      );
    }

    if (currentView === 'users') {
      return <UserManagement />;
    }

    if (currentView === 'projects') {
      return (
        <ProjectManagement 
          onProjectDetail={handleViewProjectDetail}
          onGanttView={(projectId) => {
            setSelectedProjectForGantt(projectId);
            setCurrentView('gantt');
          }}
        />
      );
    }

    if (currentView === 'project-detail' && selectedProjectForDetail) {
      return (
        <ProjectDetail 
          projectId={selectedProjectForDetail}
          onBack={handleBackToProjects}
          onEditProject={handleEditProjectInDetail}
          onGanttView={(projectId) => {
            setSelectedProjectForGantt(projectId);
            setCurrentView('gantt');
          }}
        />
      );
    }

    // Default tasks view
    return (
      <>
        <div className="mb-6">
          <button
            onClick={handleCreateTask}
            className="btn-primary"
          >
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
            Create New Task
          </button>
        </div>
        
        <div className="mt-6">
          <TaskFilters />
          <div className="mt-4 space-y-4">
            {tasks.map(task => (
              <TaskCard 
                key={task.id} 
                task={task} 
                onEdit={handleEditTask}
              />
            ))}
          </div>
        </div>
      </>
    );
  };

  const handleEditTask = (task: any) => {
    setEditingTask(task);
    setShowTaskForm(true);
  };

  const handleCreateTask = () => {
    setEditingTask(null);
    setShowTaskForm(true);
  };

  const handleCloseTaskForm = () => {
    setShowTaskForm(false);
    setEditingTask(null);
  };

  const handleViewProjectDetail = (projectId: string) => {
    setSelectedProjectForDetail(projectId);
    setCurrentView('project-detail');
  };

  const handleBackToProjects = () => {
    setSelectedProjectForDetail(null);
    setCurrentView('projects');
  };

  const handleEditProjectInDetail = (project: any) => {
    // This could open an edit modal or navigate to edit form
    console.log('Edit project:', project);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header 
        currentView={currentView}
        setCurrentView={setCurrentView}
      />
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {renderContent()}
      </main>

      {showTaskForm && (
        <TaskForm 
          task={editingTask} 
          onClose={handleCloseTaskForm}
        />
      )}
    </div>
  );
};

export default App;