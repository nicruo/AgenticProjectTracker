import { useState } from 'react';
import { useProjects, useCustomers, useActivities } from './hooks/useData';
import { ProjectCard } from './components/ProjectCard';
import { CustomerCard } from './components/CustomerCard';
import { ActivityList } from './components/ActivityList';
import { ProjectModal } from './components/ProjectModal';
import { CustomerModal } from './components/CustomerModal';
import { ActivityModal } from './components/ActivityModal';

function App() {
  const { projects, addProject, updateProject } = useProjects();
  const { customers, addCustomer, updateCustomer } = useCustomers();
  const { activities, addActivity, updateActivity, deleteActivity } = useActivities();

  const [showProjectModal, setShowProjectModal] = useState(false);
  const [showCustomerModal, setShowCustomerModal] = useState(false);
  const [showActivityModal, setShowActivityModal] = useState(false);
  const [activeTab, setActiveTab] = useState<'all' | 'projects' | 'customers' | 'activities'>('all');

  const activeProjects = projects.filter(p => p.status === 'active');
  const activeCustomers = customers.filter(c => c.engagementStatus === 'active');
  const pendingActivities = activities.filter(a => a.status !== 'done');

  const tabs = [
    { key: 'all', label: 'Overview', icon: '◈' },
    { key: 'projects', label: 'Projects', icon: '▣' },
    { key: 'customers', label: 'Customers', icon: '◉' },
    { key: 'activities', label: 'Activities', icon: '◎' },
  ] as const;

  return (
    <div className="min-h-screen">
      {/* Header */}
      <header className="sticky top-0 z-40 glass border-b border-slate-700/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-violet-500 to-indigo-600 flex items-center justify-center shadow-lg shadow-violet-500/30">
                <span className="text-white font-bold text-lg">P</span>
              </div>
              <div>
                <h1 className="text-xl font-bold text-white tracking-tight">Project Tracker</h1>
                <p className="text-xs text-slate-400">Manage projects, customers & activities</p>
              </div>
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => setShowProjectModal(true)}
                className="btn-primary text-sm flex items-center gap-2"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                </svg>
                Project
              </button>
              <button
                onClick={() => setShowCustomerModal(true)}
                className="btn-secondary text-sm flex items-center gap-2"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                </svg>
                Customer
              </button>
              <button
                onClick={() => setShowActivityModal(true)}
                className="btn-secondary text-sm flex items-center gap-2"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                </svg>
                Activity
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Stats Row */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="card-modern p-5 group cursor-pointer" onClick={() => setActiveTab('projects')}>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-slate-400">Active Projects</p>
                <p className="text-3xl font-bold text-white mt-1">{activeProjects.length}</p>
              </div>
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-emerald-500/20 to-emerald-600/20 flex items-center justify-center group-hover:scale-110 transition-transform">
                <svg className="w-6 h-6 text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
            </div>
            <div className="mt-3 h-1 bg-slate-700 rounded-full overflow-hidden">
              <div className="h-full bg-gradient-to-r from-emerald-500 to-emerald-400 rounded-full" style={{width: `${Math.min(100, activeProjects.length * 20)}%`}}></div>
            </div>
          </div>


          <div className="card-modern p-5 group cursor-pointer" onClick={() => setActiveTab('customers')}>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-slate-400">Active Customers</p>
                <p className="text-3xl font-bold text-white mt-1">{activeCustomers.length}</p>
              </div>
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500/20 to-blue-600/20 flex items-center justify-center group-hover:scale-110 transition-transform">
                <svg className="w-6 h-6 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              </div>
            </div>
            <div className="mt-3 h-1 bg-slate-700 rounded-full overflow-hidden">
              <div className="h-full bg-gradient-to-r from-blue-500 to-blue-400 rounded-full" style={{width: `${Math.min(100, activeCustomers.length * 20)}%`}}></div>
            </div>
          </div>

          <div className="card-modern p-5 group cursor-pointer" onClick={() => setActiveTab('activities')}>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-slate-400">Pending Tasks</p>
                <p className="text-3xl font-bold text-white mt-1">{pendingActivities.length}</p>
              </div>
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-amber-500/20 to-amber-600/20 flex items-center justify-center group-hover:scale-110 transition-transform">
                <svg className="w-6 h-6 text-amber-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
            </div>
            <div className="mt-3 h-1 bg-slate-700 rounded-full overflow-hidden">
              <div className="h-full bg-gradient-to-r from-amber-500 to-amber-400 rounded-full" style={{width: `${Math.min(100, pendingActivities.length * 10)}%`}}></div>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="mt-8 flex gap-1 p-1 bg-slate-800/50 rounded-xl w-fit">
          {tabs.map(tab => (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key)}
              className={`px-4 py-2 text-sm font-medium rounded-lg transition-all duration-200 flex items-center gap-2 ${
                activeTab === tab.key
                  ? 'bg-gradient-to-r from-violet-600 to-indigo-600 text-white shadow-lg'
                  : 'text-slate-400 hover:text-white hover:bg-slate-700/50'
              }`}
            >
              <span className="opacity-70">{tab.icon}</span>
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12">
        {(activeTab === 'all' || activeTab === 'projects') && (
          <section className="mb-10 animate-fade-in">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold text-white flex items-center gap-3">
                <span className="w-8 h-8 rounded-lg bg-emerald-500/20 flex items-center justify-center">
                  <span className="text-emerald-400">▣</span>
                </span>
                Projects
              </h2>
              <span className="text-sm text-slate-400">{projects.length} total</span>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {projects.length === 0 ? (
                <div className="col-span-full card-modern p-12 text-center">
                  <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-slate-700/50 flex items-center justify-center">
                    <svg className="w-8 h-8 text-slate-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                    </svg>
                  </div>
                  <p className="text-slate-400">No projects yet</p>
                  <p className="text-sm text-slate-500 mt-1">Create your first project to get started</p>
                </div>
              ) : (
                projects.map(project => (
                  <ProjectCard
                    key={project.id}
                    project={project}
                    onUpdate={updateProject}
                  />
                ))
              )}
            </div>
          </section>
        )}

        {(activeTab === 'all' || activeTab === 'customers') && (
          <section className="mb-10 animate-fade-in">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold text-white flex items-center gap-3">
                <span className="w-8 h-8 rounded-lg bg-blue-500/20 flex items-center justify-center">
                  <span className="text-blue-400">◉</span>
                </span>
                Customers
              </h2>
              <span className="text-sm text-slate-400">{customers.length} total</span>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {customers.length === 0 ? (
                <div className="col-span-full card-modern p-12 text-center">
                  <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-slate-700/50 flex items-center justify-center">
                    <svg className="w-8 h-8 text-slate-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                  </div>
                  <p className="text-slate-400">No customers yet</p>
                  <p className="text-sm text-slate-500 mt-1">Add your first customer</p>
                </div>
              ) : (
                customers.map(customer => (
                  <CustomerCard
                    key={customer.id}
                    customer={customer}
                    onUpdate={updateCustomer}
                  />
                ))
              )}
            </div>
          </section>
        )}

        {(activeTab === 'all' || activeTab === 'activities') && (
          <section className="animate-fade-in">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold text-white flex items-center gap-3">
                <span className="w-8 h-8 rounded-lg bg-amber-500/20 flex items-center justify-center">
                  <span className="text-amber-400">◎</span>
                </span>
                Activities
              </h2>
              <span className="text-sm text-slate-400">{activities.length} total</span>
            </div>
            <ActivityList
              activities={activities}
              onUpdate={updateActivity}
              onDelete={deleteActivity}
            />
          </section>
        )}
      </main>

      {/* Modals */}
      <ProjectModal
        isOpen={showProjectModal}
        onClose={() => setShowProjectModal(false)}
        onSubmit={addProject}
      />
      <CustomerModal
        isOpen={showCustomerModal}
        onClose={() => setShowCustomerModal(false)}
        onSubmit={addCustomer}
      />
      <ActivityModal
        isOpen={showActivityModal}
        onClose={() => setShowActivityModal(false)}
        onSubmit={addActivity}
      />
    </div>
  );
}

export default App;
