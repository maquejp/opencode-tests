import React, { useState, useEffect } from "react";
import { useTask, useUser } from "../contexts";
import TaskFilters from "../components/TaskFilters";
import TaskCard from "../components/TaskCard";
import TaskForm from "../components/TaskForm";
import { TaskListSkeleton } from "../components/TaskSkeleton";

const TasksPage: React.FC = () => {
  const { tasks = [], loading } = useTask();
  const { currentUser } = useUser();
  const [showTaskForm, setShowTaskForm] = useState(false);
  const [editingTask, setEditingTask] = useState<any>(null);
  const [isInitialLoad, setIsInitialLoad] = useState(true);

  useEffect(() => {
    if (!loading) {
      const timer = setTimeout(() => setIsInitialLoad(false), 300);
      return () => clearTimeout(timer);
    }
  }, [loading]);

  if (!currentUser) {
    return (
      <div className="flex items-center justify-center h-64 text-gray-500">
        <p>Please log in to continue</p>
      </div>
    );
  }

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

  return (
    <>
      <div className="mb-6">
        <button onClick={handleCreateTask} className="btn-primary">
          <svg
            className="w-5 h-5 mr-2"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 4v16m8-8H4"
            />
          </svg>
          Create New Task
        </button>
      </div>

      <div className="mt-6">
        <TaskFilters />
        <div className="mt-4 space-y-4">
          {isInitialLoad || loading ? (
            <TaskListSkeleton count={3} />
          ) : tasks.length === 0 ? (
            <div className="text-center py-12 bg-white rounded-lg border border-secondary-200">
              <svg
                className="w-16 h-16 mx-auto text-secondary-400 mb-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
                />
              </svg>
              <h3 className="text-lg font-medium text-secondary-900 mb-2">No tasks yet</h3>
              <p className="text-secondary-600 mb-4">Create your first task to get started</p>
              <button onClick={handleCreateTask} className="btn-primary">
                Create Your First Task
              </button>
            </div>
          ) : (
            tasks.map((task) => (
              <TaskCard key={task.id} task={task} onEdit={handleEditTask} />
            ))
          )}
        </div>
      </div>

      {showTaskForm && (
        <TaskForm task={editingTask} onClose={handleCloseTaskForm} />
      )}
    </>
  );
};

export default TasksPage;
