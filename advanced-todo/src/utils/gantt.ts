// Date utilities for Gantt chart calculations
export const addDays = (date: Date, days: number): Date => {
  const result = new Date(date);
  result.setDate(result.getDate() + days);
  return result;
};

export const differenceInDays = (date1: Date, date2: Date): number => {
  const diffTime = Math.abs(date2.getTime() - date1.getTime());
  return Math.ceil(diffTime / (1000 * 3600 * 24));
};

export const getWeekDaysBetween = (startDate: Date, endDate: Date): Date[] => {
  const dates: Date[] = [];
  const currentDate = new Date(startDate);
  
  while (currentDate <= endDate) {
    // Only include weekdays (Monday-Friday)
    const dayOfWeek = currentDate.getDay();
    if (dayOfWeek !== 0 && dayOfWeek !== 6) { // 0 = Sunday, 6 = Saturday
      dates.push(new Date(currentDate));
    }
    currentDate.setDate(currentDate.getDate() + 1);
  }
  
  return dates;
};

export const formatGanttDate = (date: Date): string => {
  return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
};

export const getTaskDuration = (task: any): number => {
  if (!task.startDate && !task.endDate) return 0;
  if (!task.startDate) return differenceInDays(new Date(), new Date(task.endDate));
  if (!task.endDate) return differenceInDays(new Date(task.startDate), new Date());
  return differenceInDays(new Date(task.startDate), new Date(task.endDate));
};

export const getTaskPosition = (task: any, projectStartDate: Date): { start: number; width: number } => {
  const taskStart = task.startDate ? new Date(task.startDate) : projectStartDate;
  const startOffset = differenceInDays(projectStartDate, taskStart);
  const duration = getTaskDuration(task);
  
  return {
    start: startOffset,
    width: Math.max(duration, 1), // Minimum width of 1 day
  };
};