import React, { useState } from 'react';
import { ProjectRole, User } from '../types';
import { useUser } from '../contexts';

interface ProjectRoleManagementProps {
  roleAssignments: ProjectRole[];
  onRoleAssignmentsChange: (roleAssignments: ProjectRole[]) => void;
  disabled?: boolean;
}

const ProjectRoleManagement: React.FC<ProjectRoleManagementProps> = ({
  roleAssignments,
  onRoleAssignmentsChange,
  disabled = false
}) => {
  const { users = [] } = useUser();
  const [showAddRole, setShowAddRole] = useState(false);
  const [newRole, setNewRole] = useState({
    userId: '',
    role: 'developer' as ProjectRole['role']
  });

  const availableRoles: ProjectRole['role'][] = [
    'developer', 'pm', 'analyst', 'devops', 'designer', 'qa', 'admin'
  ];

  const handleAddRole = () => {
    if (newRole.userId && users.find(u => u.id === newRole.userId)) {
      const updatedAssignments = [
        ...roleAssignments,
        {
          userId: newRole.userId,
          role: newRole.role,
          assignedAt: new Date(),
          assignedBy: users.find(u => u.id === newRole.userId)?.id || ''
        }
      ];
      onRoleAssignmentsChange(updatedAssignments);
      setNewRole({ userId: '', role: 'developer' });
      setShowAddRole(false);
    }
  };

  const handleRemoveRole = (userIdToRemove: string) => {
    const updatedAssignments = roleAssignments.filter(ra => ra.userId !== userIdToRemove);
    onRoleAssignmentsChange(updatedAssignments);
  };

  const getRoleColor = (role: ProjectRole['role']) => {
    switch (role) {
      case 'admin': return 'bg-red-100 text-red-700';
      case 'pm': return 'bg-blue-100 text-blue-700';
      case 'developer': return 'bg-green-100 text-green-700';
      case 'analyst': return 'bg-purple-100 text-purple-700';
      case 'devops': return 'bg-orange-100 text-orange-700';
      case 'designer': return 'bg-pink-100 text-pink-700';
      case 'qa': return 'bg-gray-100 text-gray-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  const getUserRoleInProject = (userId: string) => {
    const assignment = roleAssignments.find(ra => ra.userId === userId);
    return assignment ? assignment.role : null;
  };

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-gray-900">Project Team & Roles</h3>
        {!disabled && (
          <button
            onClick={() => setShowAddRole(!showAddRole)}
            className="btn-primary text-sm"
          >
            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
            Assign Role
          </button>
        )}
      </div>

      {/* Add Role Form */}
      {showAddRole && !disabled && (
        <div className="mb-4 p-4 bg-gray-50 rounded-lg">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Select User</label>
              <select
                value={newRole.userId}
                onChange={(e) => setNewRole({ ...newRole, userId: e.target.value })}
                className="input-field"
              >
                <option value="">Choose a user...</option>
                {users.map(user => (
                  <option key={user.id} value={user.id}>
                    {user.name} ({user.role})
                  </option>
                ))}
              </select>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Assign Role</label>
              <select
                value={newRole.role}
                onChange={(e) => setNewRole({ ...newRole, role: e.target.value as ProjectRole['role'] })}
                className="input-field"
              >
                {availableRoles.map(role => (
                  <option key={role} value={role}>
                    {role.charAt(0).toUpperCase() + role.slice(1)}
                  </option>
                ))}
              </select>
            </div>
          </div>
          
          <div className="flex gap-2 mt-4">
            <button
              onClick={() => setShowAddRole(false)}
              className="btn-secondary flex-1"
            >
              Cancel
            </button>
            <button
              onClick={handleAddRole}
              disabled={!newRole.userId}
              className="btn-primary flex-1 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Assign Role
            </button>
          </div>
        </div>
      )}

      {/* Current Role Assignments */}
      <div className="space-y-3">
        {roleAssignments.map(assignment => {
          const user = users.find(u => u.id === assignment.userId);
          if (!user) return null;

          return (
            <div key={assignment.userId} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
              <div className="flex items-center gap-3">
                <img
                  src={user.avatar || `https://api.dicebear.com/7.x/avataaars/svg?seed=${user.name}`}
                  alt={user.name}
                  className="w-10 h-10 rounded-full"
                />
                <div>
                  <div className="font-medium text-gray-900">{user.name}</div>
                  <div className="text-sm text-gray-600">{user.email}</div>
                </div>
              </div>
              
              <div className="flex items-center gap-2">
                <span className={`px-3 py-1 rounded-full text-xs font-medium ${getRoleColor(assignment.role)}`}>
                  {assignment.role.charAt(0).toUpperCase() + assignment.role.slice(1)}
                </span>
                
                <div className="text-xs text-gray-500">
                  <div>Assigned by {users.find(u => u.id === assignment.assignedBy)?.name}</div>
                  <div>{new Date(assignment.assignedAt).toLocaleDateString()}</div>
                </div>
                
                {!disabled && (
                  <button
                    onClick={() => handleRemoveRole(assignment.userId)}
                    className="text-red-500 hover:text-red-700 transition-colors"
                    title="Remove from project"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                    </svg>
                  </button>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {roleAssignments.length === 0 && (
        <div className="text-center py-8 text-gray-500">
          <svg className="w-12 h-12 text-gray-400 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 8 8 0 00-8 0zM4.771 12.79l.287-1.241 3.077 3.077 1.565 1.565.072-.077 1.488-1.241-.287-1.493-3.077A4 4 0 014.771 12.79l-1.242-.287c.445-.072.795-.201 1.068-.36.232.281-.434.234-.688-.111-.868-.265-1.481-.514-2.062-.104-.394.035-.807.144-1.177.063-.631.068-1.225.294-1.756.298-2.308.32-1.467.307-2.148.221-.792.264-1.448.499-1.996.114-.354.17-.698.331-1.144.53-1.784.231-1.273.508-1.642.709-1.808.455-1.018.633-1.141.343-.642.67-1.352.577-1.007.485-1.271.344-1.397.563-1.651.417-1.738.403-1.376.326-1.006.526-1.311.421-.725.48-1.243.511-1.367.023-.354.687.35-1.067.53-1.487-.439-1.188.06-.604.403-.747.237-.536.173-.672.145-.923.379-1.405.43-1.678.217-.921.511-1.237.088-.584.705-1.063.663-1.532.502-1.244.237-.056.48-.159.163-.305.28-.731.483-1.048.038-.12.295-.48.432-.876.408-.794.663-1.438.202-.784.672-1.566.604-1.728.764-2.166.817-2.74.564-1.235.564-1.235-.531.137-.886-.273-.974.472-.959-.841.632-.833-1.464.264-.577.547-.789.754-1.511.496-1.264.546-1.232.722-1.004.485-1.375.466-.978.384-1.578.672-1.78.482-2.085.019-.273.49-1.195.394-.926.321-1.673.608-2.274.447-1.549.193-1.223.406-1.699.36-1.541.688-1.725.756-1.866.89-1.825.438-1.673.746-1.2.594-1.018.511-1.632.676-2.09.963-1.64.398-1.357.331-1.065.29-.444.433-1.143.497-1.782.622-2.313.498-1.404.032-.483.328-.026.293-.187.184-.056.193-.056.362.063.249.445.231.155.231-.155.034.034.034-.034-.034-.034" />
          </svg>
          <h3 className="text-lg font-medium text-gray-900 mb-1">No team members assigned</h3>
          <p>Assign team members to this project with specific roles to get started.</p>
        </div>
      )}
    </div>
  );
};

export default ProjectRoleManagement;