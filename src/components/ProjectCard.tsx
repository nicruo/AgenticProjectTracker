import type { Project } from '../types';

interface ProjectCardProps {
  project: Project;
  onUpdate: (id: string, updates: Partial<Project>) => void;
}

export function ProjectCard({ project, onUpdate }: ProjectCardProps) {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-800';
      case 'completed': return 'bg-blue-100 text-blue-800';
      case 'on-hold': return 'bg-yellow-100 text-yellow-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'bg-red-100 text-red-800';
      case 'medium': return 'bg-orange-100 text-orange-800';
      case 'low': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const handleStatusChange = (newStatus: 'active' | 'completed' | 'on-hold') => {
    const updates: Partial<Project> = { status: newStatus };
    if (newStatus === 'completed' && !project.completedDate) {
      updates.completedDate = new Date().toISOString().split('T')[0];
    }
    onUpdate(project.id, updates);
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
      <div className="flex justify-between items-start mb-4">
        <h3 className="text-xl font-semibold text-gray-900">{project.name}</h3>
        <div className="flex gap-2">
          <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(project.status)}`}>
            {project.status}
          </span>
          <span className={`px-3 py-1 rounded-full text-xs font-medium ${getPriorityColor(project.priority)}`}>
            {project.priority}
          </span>
        </div>
      </div>
      
      <p className="text-gray-600 mb-4">{project.description}</p>
      
      <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
        <span>Started: {new Date(project.startDate).toLocaleDateString()}</span>
        {project.completedDate && (
          <span>Completed: {new Date(project.completedDate).toLocaleDateString()}</span>
        )}
      </div>

      <div className="flex gap-2">
        {project.status !== 'completed' && (
          <button
            onClick={() => handleStatusChange('completed')}
            className="flex-1 bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors"
          >
            Mark Complete
          </button>
        )}
        {project.status === 'active' && (
          <button
            onClick={() => handleStatusChange('on-hold')}
            className="flex-1 bg-yellow-600 text-white px-4 py-2 rounded-md hover:bg-yellow-700 transition-colors"
          >
            Put On Hold
          </button>
        )}
        {project.status === 'on-hold' && (
          <button
            onClick={() => handleStatusChange('active')}
            className="flex-1 bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700 transition-colors"
          >
            Resume
          </button>
        )}
      </div>
    </div>
  );
}
