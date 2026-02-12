import type { Activity } from '../types';

interface ActivityListProps {
  activities: Activity[];
  onUpdate: (id: string, updates: Partial<Activity>) => void;
  onDelete: (id: string) => void;
}

export function ActivityList({ activities, onUpdate, onDelete }: ActivityListProps) {
  const getPriorityStyle = (priority: string) => {
    switch (priority) {
      case 'high': return 'text-rose-400 bg-rose-500/10 border-rose-500/20';
      case 'medium': return 'text-amber-400 bg-amber-500/10 border-amber-500/20';
      case 'low': return 'text-emerald-400 bg-emerald-500/10 border-emerald-500/20';
      default: return 'text-slate-400 bg-slate-500/10 border-slate-500/20';
    }
  };

  const getStatusStyle = (status: string) => {
    switch (status) {
      case 'done':
        return { ring: 'ring-emerald-500', bg: 'bg-emerald-500', check: true };
      case 'in-progress':
        return { ring: 'ring-amber-500', bg: 'bg-amber-500/30', check: false };
      default:
        return { ring: 'ring-slate-600', bg: 'bg-transparent', check: false };
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
      {sortedActivities.map((activity, index) => {
        const statusStyle = getStatusStyle(activity.status);
        return (
          <div
            key={activity.id}
            className={`card-modern p-4 group animate-slide-up ${
              activity.status === 'done' ? 'opacity-50' : ''
            }`}
            style={{ animationDelay: `${index * 50}ms` }}
          >
            <div className="flex items-start gap-4">
              <button
                onClick={() => handleStatusChange(activity.id, activity.status)}
                className={`flex-shrink-0 mt-0.5 w-5 h-5 rounded-full ring-2 ${statusStyle.ring} ${statusStyle.bg} flex items-center justify-center hover:scale-110 transition-all`}
              >
                {statusStyle.check && (
                  <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                  </svg>
                )}
              </button>

              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between gap-3">
                  <h4 className={`font-medium text-white group-hover:text-violet-300 transition-colors ${activity.status === 'done' ? 'line-through text-slate-500' : ''}`}>
                    {activity.title}
                  </h4>
                  <span className={`px-2 py-0.5 rounded-md text-xs font-medium border flex-shrink-0 ${getPriorityStyle(activity.priority)}`}>
                    {activity.priority}
                  </span>
                </div>
                
                {activity.description && (
                  <p className="text-sm text-slate-400 mt-1 line-clamp-2">{activity.description}</p>
                )}
                
                <div className="flex items-center justify-between mt-3">
                  <span className="flex items-center text-xs text-slate-500 gap-1.5">
                    <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                    {new Date(activity.dueDate).toLocaleDateString()}
                  </span>
                  {activity.status !== 'done' && (
                    <button
                      onClick={() => onDelete(activity.id)}
                      className="text-xs text-slate-500 hover:text-rose-400 transition-colors opacity-0 group-hover:opacity-100"
                    >
                      Delete
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>
        );
      })}
      
      {activities.length === 0 && (
        <div className="card-modern p-12 text-center">
          <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-slate-700/50 flex items-center justify-center">
            <svg className="w-8 h-8 text-slate-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
            </svg>
          </div>
          <p className="text-slate-400">No activities yet</p>
          <p className="text-sm text-slate-500 mt-1">Add tasks to track your progress</p>
        </div>
      )}
    </div>
  );
}
