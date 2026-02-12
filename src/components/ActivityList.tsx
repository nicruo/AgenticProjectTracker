import type { Activity } from '../types';

interface ActivityListProps {
  activities: Activity[];
  onUpdate: (id: string, updates: Partial<Activity>) => void;
  onDelete: (id: string) => void;
}

export function ActivityList({ activities, onUpdate, onDelete }: ActivityListProps) {
  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'text-red-600';
      case 'medium': return 'text-orange-600';
      case 'low': return 'text-green-600';
      default: return 'text-gray-600';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'done':
        return (
          <svg className="w-5 h-5 text-green-600" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
          </svg>
        );
      case 'in-progress':
        return (
          <svg className="w-5 h-5 text-yellow-600" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
          </svg>
        );
      default:
        return (
          <svg className="w-5 h-5 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-11a1 1 0 10-2 0v2H7a1 1 0 100 2h2v2a1 1 0 102 0v-2h2a1 1 0 100-2h-2V7z" clipRule="evenodd" />
          </svg>
        );
    }
  };

  const handleStatusChange = (id: string, currentStatus: string) => {
    let newStatus: 'todo' | 'in-progress' | 'done';
    if (currentStatus === 'todo') {
      newStatus = 'in-progress';
    } else if (currentStatus === 'in-progress') {
      newStatus = 'done';
    } else {
      newStatus = 'todo';
    }
    onUpdate(id, { status: newStatus });
  };

  const sortedActivities = [...activities].sort((a, b) => {
    if (a.status === 'done' && b.status !== 'done') return 1;
    if (a.status !== 'done' && b.status === 'done') return -1;
    return new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime();
  });

  return (
    <div className="space-y-3">
      {sortedActivities.map(activity => (
        <div
          key={activity.id}
          className={`bg-white rounded-lg shadow p-4 hover:shadow-md transition-shadow ${
            activity.status === 'done' ? 'opacity-60' : ''
          }`}
        >
          <div className="flex items-start gap-3">
            <button
              onClick={() => handleStatusChange(activity.id, activity.status)}
              className="flex-shrink-0 mt-1 hover:scale-110 transition-transform"
            >
              {getStatusIcon(activity.status)}
            </button>

            <div className="flex-1 min-w-0">
              <div className="flex items-start justify-between gap-2">
                <h4 className={`font-medium text-gray-900 ${activity.status === 'done' ? 'line-through' : ''}`}>
                  {activity.title}
                </h4>
                <span className={`text-xs font-semibold ${getPriorityColor(activity.priority)} whitespace-nowrap`}>
                  {activity.priority.toUpperCase()}
                </span>
              </div>
              
              {activity.description && (
                <p className="text-sm text-gray-600 mt-1">{activity.description}</p>
              )}
              
              <div className="flex items-center gap-4 mt-2 text-xs text-gray-500">
                <span className="flex items-center">
                  <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                  Due: {new Date(activity.dueDate).toLocaleDateString()}
                </span>
                {activity.status !== 'done' && (
                  <button
                    onClick={() => onDelete(activity.id)}
                    className="text-red-600 hover:text-red-800 ml-auto"
                  >
                    Delete
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      ))}
      
      {activities.length === 0 && (
        <div className="text-center py-8 text-gray-500">
          No activities yet. Add your first activity to get started!
        </div>
      )}
    </div>
  );
}
