import type { Project } from '../types';

interface ProjectCardProps {
  project: Project;
  onUpdate: (id: string, updates: Partial<Project>) => void;
}

export function ProjectCard({ project, onUpdate }: ProjectCardProps) {
  const getStatusStyle = (status: string) => {
    switch (status) {
      case 'active': return 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30';
      case 'completed': return 'bg-blue-500/20 text-blue-400 border-blue-500/30';
      case 'on-hold': return 'bg-amber-500/20 text-amber-400 border-amber-500/30';
      default: return 'bg-slate-500/20 text-slate-400 border-slate-500/30';
    }
  };

  const getPriorityStyle = (priority: string) => {
    switch (priority) {
      case 'high': return 'text-rose-400';
      case 'medium': return 'text-amber-400';
      case 'low': return 'text-emerald-400';
      default: return 'text-slate-400';
    }
  };

  const getPriorityIcon = (priority: string) => {
    if (priority === 'high') return '↑↑';
    if (priority === 'medium') return '→';
    return '↓';
  };

  const handleStatusChange = (newStatus: 'active' | 'completed' | 'on-hold') => {
    const updates: Partial<Project> = { status: newStatus };
    if (newStatus === 'completed' && !project.completedDate) {
      updates.completedDate = new Date().toISOString().split('T')[0];
    }
    onUpdate(project.id, updates);
  };

  return (
    <div className="card-modern p-5 group animate-slide-up">
      <div className="flex justify-between items-start mb-4">
        <div className="flex-1 min-w-0">
          <h3 className="text-lg font-semibold text-white truncate group-hover:text-violet-300 transition-colors">
            {project.name}
          </h3>
          <div className="flex items-center gap-2 mt-1">
            <span className={`text-xs font-medium ${getPriorityStyle(project.priority)}`}>
              {getPriorityIcon(project.priority)} {project.priority}
            </span>
          </div>
        </div>
        <span className={`px-2.5 py-1 rounded-lg text-xs font-medium border ${getStatusStyle(project.status)}`}>
          {project.status}
        </span>
      </div>
      
      <p className="text-sm text-slate-400 mb-4 line-clamp-2">{project.description || 'No description'}</p>
      
      <div className="flex items-center text-xs text-slate-500 mb-5 gap-4">
        <span className="flex items-center gap-1.5">
          <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
          </svg>
          {new Date(project.startDate).toLocaleDateString()}
        </span>
        {project.completedDate && (
          <span className="flex items-center gap-1.5 text-emerald-400">
            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
            {new Date(project.completedDate).toLocaleDateString()}
          </span>
        )}
      </div>

      <div className="flex gap-2">
        {project.status !== 'completed' && (
          <button
            onClick={() => handleStatusChange('completed')}
            className="flex-1 px-3 py-2 text-sm font-medium rounded-xl bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 hover:bg-emerald-500/20 transition-all"
          >
            Complete
          </button>
        )}
        {project.status === 'active' && (
          <button
            onClick={() => handleStatusChange('on-hold')}
            className="flex-1 px-3 py-2 text-sm font-medium rounded-xl bg-amber-500/10 text-amber-400 border border-amber-500/20 hover:bg-amber-500/20 transition-all"
          >
            Hold
          </button>
        )}
        {project.status === 'on-hold' && (
          <button
            onClick={() => handleStatusChange('active')}
            className="flex-1 px-3 py-2 text-sm font-medium rounded-xl bg-violet-500/10 text-violet-400 border border-violet-500/20 hover:bg-violet-500/20 transition-all"
          >
            Resume
          </button>
        )}
        {project.status === 'completed' && (
          <button
            onClick={() => handleStatusChange('active')}
            className="flex-1 px-3 py-2 text-sm font-medium rounded-xl bg-slate-500/10 text-slate-400 border border-slate-500/20 hover:bg-slate-500/20 transition-all"
          >
            Reopen
          </button>
        )}
      </div>
    </div>
  );
}
