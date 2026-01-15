import React from 'react';
import { Project } from '../types';
import { useProject, useTask, useUser } from '../contexts';
import TaskCard from './TaskCard';

interface ProjectDetailProps {
  projectId: string;
  onBack: () => void;
  onEditProject: (project: Project) => void;
  onGanttView: (projectId: string) => void;
}

const ProjectDetail: React.FC<ProjectDetailProps> = ({ 
  projectId, 
  onBack, 
  onEditProject, 
  onGanttView 
}) => {
  const { projects = [] } = useProject();
  const { tasks = [] } = useTask();
  const { users = [] } = useUser();
  
  const project = projects.find(p => p.id === projectId);
  const projectTasks = tasks.filter(task => task.projectId === projectId);
  
  if (!project) {
    return (
      <div className="text-center py-12">
        <h2 className="text-xl font-semibold text-gray-900 mb-2">Project Not Found</h2>
        <p className="text-gray-600">The project you're looking for doesn't exist.</p>
        <button onClick={onBack} className="btn-primary mt-4">
          Back to Projects
        </button>
      </div>
    );
  }
  
  const assignedUsers = users.filter(user => project.assignedTo.includes(user.id));
  const completedTasks = projectTasks.filter(task => task.status === 'completed').length;
  const totalTasks = projectTasks.length;
  const completionRate = totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0;
  
  const getStatusColor = (status: Project['status']) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-700';
      case 'completed': return 'bg-blue-100 text-blue-700';
      case 'archived': return 'bg-gray-100 text-gray-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };
  
  const handleEditTask = (task: any) => {
    console.log('Edit task in project:', task);
  };
  
  return (
    <div className="max-w-6xl mx-auto">
      {/* Header */}
      <div className="mb-6">
        <button onClick={onBack} className="btn-secondary mb-4">
          ← Back to Projects
        </button>
        
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
          <div 
            className="h-4"
            style={{ backgroundColor: project.color || '#3B82F6' }}
          ></div>
          
          <div className="p-6">
            <div className="flex items-start justify-between mb-6">
              <div className="flex-1">
                <h1 className="text-3xl font-bold text-gray-900 mb-2">{project.name}</h1>
                <p className="text-gray-600 text-lg">{project.description}</p>
                
                <div className="flex items-center gap-4 mt-4">
                  <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(project.status)}`}>
                    {project.status}
                  </span>
                  
                  {project.dueDate && (
                    <span className="text-sm text-gray-500 flex items-center gap-1">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                      Due: {new Date(project.dueDate).toLocaleDateString()}
                    </span>
                  )}
                </div>
              </div>
              
              <div className="flex items-center gap-2">
                <button
                  onClick={() => onEditProject(project)}
                  className="btn-secondary"
                  title="Edit Project"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                  </svg>
                  Edit
                </button>
                
                <button
                  onClick={() => onGanttView(project.id)}
                  className="btn-primary"
                  title="View Gantt Chart"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v14A2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2A2 2 0 002-2M9 5a2 2 0 012-2h2A2 2 0 012 2m-6 9l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  Gantt
                </button>
              </div>
            </div>
            
            {/* Tags */}
            {project.tags.length > 0 && (
              <div className="flex flex-wrap gap-2 mb-6">
                {project.tags.map((tag, index) => (
                  <span
                    key={index}
                    className="px-3 py-1 bg-gray-100 text-gray-600 text-sm rounded-full"
                  >
                    #{tag}
                  </span>
                ))}
              </div>
            )}
            
            {/* Stats */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
              <div className="bg-gray-50 rounded-lg p-4">
                <div className="text-2xl font-bold text-gray-900">{totalTasks}</div>
                <div className="text-sm text-gray-600">Total Tasks</div>
              </div>
              
              <div className="bg-gray-50 rounded-lg p-4">
                <div className="text-2xl font-bold text-green-600">{completedTasks}</div>
                <div className="text-sm text-gray-600">Completed</div>
              </div>
              
              <div className="bg-gray-50 rounded-lg p-4">
                <div className="text-2xl font-bold text-blue-600">{totalTasks - completedTasks}</div>
                <div className="text-sm text-gray-600">In Progress</div>
              </div>
              
              <div className="bg-gray-50 rounded-lg p-4">
                <div className="text-2xl font-bold text-purple-600">{completionRate}%</div>
                <div className="text-sm text-gray-600">Complete Rate</div>
              </div>
            </div>
            
            {/* Team Members */}
            <div className="mb-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-3">Team Members</h3>
              <div className="flex flex-wrap gap-3">
                {assignedUsers.length > 0 ? (
                  assignedUsers.map(user => (
                    <div key={user.id} className="flex items-center gap-2 bg-gray-50 rounded-lg p-2">
                      <img
                        src={user.avatar || `https://api.dicebear.com/7.x/avataaars/svg?seed=${user.name}`}
                        alt={user.name}
                        className="w-8 h-8 rounded-full"
                      />
                      <span className="text-sm text-gray-700">{user.name}</span>
                      <span className="text-xs text-gray-500">({user.role})</span>
                    </div>
                  ))
                ) : (
                  <span className="text-gray-500">No team members assigned</span>
                )}
              </div>
            </div>
            
            {/* Project Info */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-gray-600">
              <div>
                <span className="font-medium">Created:</span> {new Date(project.createdAt).toLocaleDateString()}
              </div>
              <div>
                <span className="font-medium">Updated:</span> {new Date(project.updatedAt).toLocaleDateString()}
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Tasks Section */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">Project Tasks</h2>
        
        {projectTasks.length === 0 ? (
          <div className="text-center py-8">
            <svg className="w-16 h-16 text-gray-400 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
            </svg>
            <h3 className="text-lg font-medium text-gray-900 mb-1">No tasks yet</h3>
            <p className="text-gray-500">Tasks assigned to this project will appear here.</p>
          </div>
        ) : (
          <div className="space-y-4">
            {projectTasks.map(task => (
              <TaskCard 
                key={task.id} 
                task={task} 
                onEdit={handleEditTask}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ProjectDetail;