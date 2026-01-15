import React from "react";

const TaskSkeleton: React.FC = () => {
  return (
    <div className="bg-white rounded-lg shadow-md p-4 border border-secondary-200 animate-pulse">
      <div className="flex items-start justify-between mb-3">
        <div className="flex-1">
          <div className="h-6 bg-secondary-200 rounded w-3/4 mb-2"></div>
          <div className="h-4 bg-secondary-200 rounded w-1/2"></div>
        </div>
        <div className="h-8 w-20 bg-secondary-200 rounded"></div>
      </div>
      <div className="flex items-center gap-4 text-sm">
        <div className="h-4 w-16 bg-secondary-200 rounded"></div>
        <div className="h-4 w-20 bg-secondary-200 rounded"></div>
        <div className="h-4 w-24 bg-secondary-200 rounded"></div>
      </div>
    </div>
  );
};

const TaskListSkeleton: React.FC<{ count?: number }> = ({ count = 3 }) => {
  return (
    <div className="space-y-4">
      {Array.from({ length: count }, (_, index) => (
        <TaskSkeleton key={index} />
      ))}
    </div>
  );
};

export { TaskSkeleton, TaskListSkeleton };