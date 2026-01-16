import React, { useState } from 'react';
import { RoleDefinition } from '../types';
import { useRole } from '../contexts';

const RolesPage: React.FC = () => {
  const { roles = [], createRole, updateRole, deleteRole, loading, error } = useRole();
  const [showForm, setShowForm] = useState(false);
  const [editingRole, setEditingRole] = useState<RoleDefinition | null>(null);
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    color: '#3B82F6',
    permissions: [] as string[],
  });

  const availablePermissions = [
    'read',
    'write',
    'delete',
    'manage_users',
    'manage_projects',
    'assign_tasks',
    'update_tasks',
    'upload_assets',
    'report_bugs',
    'create_requirements',
    'view_reports',
    'deploy',
    'manage_infrastructure',
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (editingRole) {
      updateRole({
        ...editingRole,
        ...formData,
        updatedAt: new Date(),
      });
    } else {
      createRole(formData);
    }
    
    resetForm();
  };

  const resetForm = () => {
    setFormData({
      name: '',
      description: '',
      color: '#3B82F6',
      permissions: [],
    });
    setEditingRole(null);
    setShowForm(false);
  };

  const handleEdit = (role: RoleDefinition) => {
    setEditingRole(role);
    setFormData({
      name: role.name,
      description: role.description,
      color: role.color,
      permissions: role.permissions,
    });
    setShowForm(true);
  };

  const handleDelete = (roleId: string) => {
    if (window.confirm('Are you sure you want to delete this role? This action cannot be undone.')) {
      deleteRole(roleId);
    }
  };

  const handlePermissionChange = (permission: string) => {
    setFormData(prev => ({
      ...prev,
      permissions: prev.permissions.includes(permission)
        ? prev.permissions.filter(p => p !== permission)
        : [...prev.permissions, permission]
    }));
  };

  if (error) {
    return (
      <div className="text-center py-12">
        <div className="text-red-600 mb-4">Error loading roles: {error}</div>
        <button onClick={() => window.location.reload()} className="btn-primary">
          Reload
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Role Management</h1>
          <p className="text-gray-600 mt-2">Manage user roles and their permissions</p>
        </div>
        <button
          onClick={() => setShowForm(true)}
          className="btn-primary flex items-center gap-2"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
          </svg>
          Add Role
        </button>
      </div>

      {/* Role Form Modal */}
      {showForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-gray-200">
              <h2 className="text-2xl font-bold text-gray-900">
                {editingRole ? 'Edit Role' : 'Create New Role'}
              </h2>
            </div>

            <form onSubmit={handleSubmit} className="p-6 space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Role Name *
                  </label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                    className="input-field"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Color
                  </label>
                  <input
                    type="color"
                    value={formData.color}
                    onChange={(e) => setFormData(prev => ({ ...prev, color: e.target.value }))}
                    className="w-full h-10 rounded-lg border border-gray-300"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Description *
                </label>
                <textarea
                  value={formData.description}
                  onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                  className="input-field"
                  rows={3}
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Permissions
                </label>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3 max-h-48 overflow-y-auto border border-gray-200 rounded-lg p-4">
                  {availablePermissions.map(permission => (
                    <label key={permission} className="flex items-center space-x-2 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={formData.permissions.includes(permission)}
                        onChange={() => handlePermissionChange(permission)}
                        className="rounded border-gray-300 text-primary-600 focus:ring-primary-500"
                      />
                      <span className="text-sm text-gray-700">
                        {permission.replace('_', ' ').replace(/\b\w/g, l => l.toUpperCase())}
                      </span>
                    </label>
                  ))}
                </div>
              </div>

              <div className="flex gap-3 justify-end pt-6 border-t border-gray-200">
                <button
                  type="button"
                  onClick={resetForm}
                  className="btn-secondary"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="btn-primary"
                >
                  {editingRole ? 'Update Role' : 'Create Role'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Roles List */}
      {loading ? (
        <div className="text-center py-12">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading roles...</p>
        </div>
      ) : roles.length === 0 ? (
        <div className="text-center py-12">
          <svg className="w-16 h-16 text-gray-400 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 8 8 0 00-8 0zM4.771 12.79l.287-1.241 3.077 3.077 1.565 1.565.072-.077 1.488-1.241-.287-1.493-3.077A4 4 0 014.771 12.79l-1.242-.287c.445-.072.795-.201 1.068-.36.232.281-.434.234-.688-.111-.868-.265-1.481-.514-2.062-.104-.394.035-.807.144-1.177.063-.631.068-1.225.294-1.756.298-2.308.32-1.467.307-2.148.221-.792.264-1.448.499-1.996.114-.354.17-.698.331-1.144.53-1.784.231-1.273.508-1.642.709-1.808.455-1.018.633-1.141.343-.642.67-1.352.577-1.007.485-1.271.344-1.397.563-1.651.417-1.738.403-1.376.326-1.006.526-1.311.421-.725.48-1.243.511-1.367.023-.354.687.35-1.067.53-1.487-.439-1.188.06-.604.403-.747.237-.536.173-.672.145-.923.379-1.405.43-1.678.217-.921.511-1.237.088-.584.705-1.063.663-1.532.502-1.244.237-.056.48-.159.163-.305.28-.731.483-1.048.038-.12.295-.48.432-.876.408-.794.663-1.438.202-.784.672-1.566.604-1.728.764-2.166.817-2.74.564-1.235.564-1.235-.531.137-.886-.273-.974.472-.959-.841.632-.833-1.464.264-.577.547-.789.754-1.511.496-1.264.546-1.232.722-1.004.485-1.375.466-.978.384-1.578.672-1.78.482-2.085.019-.273.49-1.195.394-.926.321-1.673.608-2.274.447-1.549.193-1.223.406-1.699.36-1.541.688-1.725.756-1.866.89-1.825.438-1.673.746-1.2.594-1.018.511-1.632.676-2.09.963-1.64.398-1.357.331-1.065.29-.444.433-1.143.497-1.782.622-2.313.498-1.404.032-.483.328-.026.293-.187.184-.056.193-.056.362.063.249.445.231.155.231-.155.034.034.034-.034-.034-.034" />
          </svg>
          <h3 className="text-lg font-medium text-gray-900 mb-1">No roles defined</h3>
          <p className="text-gray-500 mb-4">Create your first role to get started with role management.</p>
          <button
            onClick={() => setShowForm(true)}
            className="btn-primary"
          >
            Create First Role
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {roles.map(role => (
            <div key={role.id} className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-shadow">
              <div
                className="h-2"
                style={{ backgroundColor: role.color }}
              ></div>
              
              <div className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <h3 className="text-lg font-semibold text-gray-900">{role.name}</h3>
                  <div className="flex gap-2">
                    <button
                      onClick={() => handleEdit(role)}
                      className="text-gray-400 hover:text-primary-600 transition-colors"
                      title="Edit role"
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                      </svg>
                    </button>
                    <button
                      onClick={() => handleDelete(role.id)}
                      className="text-gray-400 hover:text-red-600 transition-colors"
                      title="Delete role"
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                      </svg>
                    </button>
                  </div>
                </div>
                
                <p className="text-gray-600 text-sm mb-4">{role.description}</p>
                
                <div className="space-y-2">
                  <div className="text-sm font-medium text-gray-700">Permissions:</div>
                  <div className="flex flex-wrap gap-1">
                    {role.permissions.map(permission => (
                      <span
                        key={permission}
                        className="px-2 py-1 text-xs bg-gray-100 text-gray-700 rounded"
                        style={{ backgroundColor: role.color + '20', color: role.color }}
                      >
                        {permission.replace('_', ' ').replace(/\b\w/g, l => l.toUpperCase())}
                      </span>
                    ))}
                  </div>
                </div>
                
                <div className="mt-4 pt-4 border-t border-gray-100 text-xs text-gray-500">
                  Created {new Date(role.createdAt).toLocaleDateString()}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default RolesPage;