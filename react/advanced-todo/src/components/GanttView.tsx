import React, { useState } from 'react';
import { Task } from '../types';
import { useTask } from '../contexts/TaskContext';
import { useProject } from '../contexts/ProjectContext';
import { addDays, differenceInDays, formatGanttDate } from '../utils/gantt';

interface GanttViewProps {
  projectId: string;
}

const GanttView: React.FC<GanttViewProps> = ({ projectId }) => {
  const { getFilteredTasks } = useTask();
  const { getAccessibleProjects } = useProject();
  const [selectedTask, setSelectedTask] = useState<string | null>(null);

  const projectTasks = getFilteredTasks().filter(task => 
    task.projectId === projectId && task.status !== 'cancelled'
  );

  const project = getAccessibleProjects().find(p => p.id === projectId);

  if (!project) {
    return (
      <div className="flex items-center justify-center h-64 text-gray-500">
        <p>Project not found</p>
      </div>
    );
  }

  // Calculate timeline boundaries
  const tasksWithDates = projectTasks.map(task => ({
    ...task,
    startDate: task.startDate || new Date(),
    endDate: task.endDate || addDays(task.startDate || new Date(), 7)
  }));

  const allDates = tasksWithDates.flatMap(task => [task.startDate, task.endDate]);
  const minDate = allDates.length > 0 ? new Date(Math.min(...allDates.map(d => d.getTime()))) : new Date();
  const maxDate = allDates.length > 0 ? new Date(Math.max(...allDates.map(d => d.getTime()))) : addDays(new Date(), 30);
  
  const totalDays = differenceInDays(minDate, maxDate) + 1;
  const dayWidth = Math.max(40, 800 / totalDays); // Minimum 40px per day
  const chartWidth = totalDays * dayWidth;

  const getStatusColor = (status: Task['status']) => {
    switch (status) {
      case 'completed': return 'bg-green-500';
      case 'in-progress': return 'bg-blue-500';
      case 'todo': return 'bg-gray-400';
      case 'cancelled': return 'bg-red-500';
      default: return 'bg-gray-400';
    }
  };

  const getPriorityColor = (priority: Task['priority']) => {
    switch (priority) {
      case 'high': return 'text-red-600';
      case 'medium': return 'text-yellow-600';
      case 'low': return 'text-green-600';
      default: return 'text-gray-600';
    }
  };

  const calculateTaskPosition = (task: any) => {
    const startOffset = differenceInDays(minDate, task.startDate);
    const duration = differenceInDays(task.startDate, task.endDate) + 1;
    
    return {
      left: startOffset * dayWidth,
      width: Math.max(duration * dayWidth, dayWidth / 2), // Minimum half day width
      startOffset,
      duration
    };
  };

  const generateDateHeaders = () => {
    const headers = [];
    const current = new Date(minDate);
    
    while (current <= maxDate) {
      headers.push(new Date(current));
      current.setDate(current.getDate() + 1);
    }
    
    return headers;
  };

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
      <div className="mb-6">
        <div className="flex items-center gap-3">
          <div className="flex-1">
            <h2 className="text-xl font-bold text-gray-900">{project.name} - Gantt Chart</h2>
            <p className="text-sm text-gray-600 mt-1">
              {projectTasks.length} tasks • {totalDays} days timeline
            </p>
          </div>
        </div>
      </div>

      {/* Legend */}
      <div className="mb-4 p-3 bg-gray-50 rounded-lg">
        <div className="flex items-center gap-6 text-sm">
          <span className="flex items-center gap-2">
            <div className="w-4 h-4 bg-green-500 rounded"></div>
            <span className="text-gray-700">Completed</span>
          </span>
          <span className="flex items-center gap-2">
            <div className="w-4 h-4 bg-blue-500 rounded"></div>
            <span className="text-gray-700">In Progress</span>
          </span>
          <span className="flex items-center gap-2">
            <div className="w-4 h-4 bg-gray-400 rounded"></div>
            <span className="text-gray-700">To Do</span>
          </span>
        </div>
      </div>

      <div className="overflow-x-auto border border-gray-300 rounded-lg">
        <div style={{ minWidth: `${chartWidth + 320}px` }}>
          {/* Date Headers */}
          <div className="flex border-b border-gray-300 bg-gray-50">
            <div className="w-80 px-3 py-2 font-semibold text-sm text-gray-700 border-r border-gray-300">
              Task Name
            </div>
            <div className="flex" style={{ width: `${chartWidth}px` }}>
              {generateDateHeaders().map((date, index) => (
                <div
                  key={index}
                  className="flex-1 px-1 py-2 text-center text-xs text-gray-600 border-r border-gray-200 min-w-[40px]"
                  title={date.toLocaleDateString()}
                >
                  <div>{formatGanttDate(date)}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Task Rows */}
          {tasksWithDates.map((task, index) => {
            const position = calculateTaskPosition(task);
            const isSelected = selectedTask === task.id;
            
            return (
              <div key={task.id} className="flex border-b border-gray-200 hover:bg-gray-50">
                {/* Task Info */}
                <div className="w-80 p-3 border-r border-gray-200">
                  <div className="flex items-start gap-2">
                    <div className="flex-1 min-w-0">
                      <div className="font-medium text-sm text-gray-900 truncate" title={task.title}>
                        {task.title}
                      </div>
                      <div className="flex items-center gap-2 mt-1 text-xs">
                        <span className={`font-medium ${getPriorityColor(task.priority)}`}>
                          {task.priority.toUpperCase()}
                        </span>
                        <span className="text-gray-500">
                          {task.status.replace('-', ' ')}
                        </span>
                        <span className="text-gray-500">
                          {position.duration}d
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Timeline */}
                <div 
                  className="relative py-2" 
                  style={{ width: `${chartWidth}px` }}
                >
                  <div
                    className={`absolute top-2 h-6 rounded ${getStatusColor(task.status)} cursor-pointer hover:opacity-80 transition-opacity ${
                      isSelected ? 'ring-2 ring-blue-400 ring-offset-1' : ''
                    }`}
                    style={{
                      left: `${position.left}px`,
                      width: `${position.width}px`,
                      minWidth: '20px'
                    }}
                    onClick={() => setSelectedTask(isSelected ? null : task.id)}
                    title={`${task.title}\n${formatGanttDate(task.startDate)} - ${formatGanttDate(task.endDate)}\n${position.duration} days`}
                  >
                    <div className="px-2 py-1 text-white text-xs font-medium truncate">
                      {task.title}
                    </div>
                  </div>

                  {/* Today marker */}
                  {minDate <= new Date() && new Date() <= maxDate && (
                    <div
                      className="absolute top-0 bottom-0 w-0.5 bg-red-400 z-10"
                      style={{ left: `${differenceInDays(minDate, new Date()) * dayWidth}px` }}
                      title="Today"
                    >
                      <div className="absolute -top-1 left-0 w-2 h-2 bg-red-400 rounded-full"></div>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Task Details */}
      {selectedTask && (
        <div className="mt-4 p-4 bg-blue-50 border border-blue-200 rounded-lg">
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <h3 className="font-semibold text-gray-900 mb-2">
                {tasksWithDates.find(t => t.id === selectedTask)?.title}
              </h3>
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <span className="font-medium text-gray-700">Start:</span>{' '}
                  {formatGanttDate(tasksWithDates.find(t => t.id === selectedTask)?.startDate || new Date())}
                </div>
                <div>
                  <span className="font-medium text-gray-700">End:</span>{' '}
                  {formatGanttDate(tasksWithDates.find(t => t.id === selectedTask)?.endDate || new Date())}
                </div>
                <div>
                  <span className="font-medium text-gray-700">Duration:</span>{' '}
                  {calculateTaskPosition(tasksWithDates.find(t => t.id === selectedTask)!).duration} days
                </div>
                <div>
                  <span className="font-medium text-gray-700">Status:</span>{' '}
                  {tasksWithDates.find(t => t.id === selectedTask)?.status}
                </div>
              </div>
            </div>
            <button
              onClick={() => setSelectedTask(null)}
              className="text-gray-400 hover:text-gray-600"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default GanttView;