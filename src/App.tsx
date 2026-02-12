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

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Header */}
      <header className="bg-white shadow-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Project Tracker</h1>
              <p className="mt-1 text-sm text-gray-600">Manage your projects, customers, and activities</p>
            </div>
            <div className="flex gap-3">
              <button
                onClick={() => setShowProjectModal(true)}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors shadow-md"
              >
                + New Project
              </button>
              <button
                onClick={() => setShowCustomerModal(true)}
                className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors shadow-md"
              >
                + New Customer
              </button>
              <button
                onClick={() => setShowActivityModal(true)}
                className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors shadow-md"
              >
                + New Activity
              </button>
            </div>
          </div>

          {/* Stats */}
          <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-blue-50 rounded-lg p-4">
              <div className="text-sm text-blue-600 font-medium">Active Projects</div>
              <div className="text-2xl font-bold text-blue-900 mt-1">{activeProjects.length}</div>
            </div>
            <div className="bg-indigo-50 rounded-lg p-4">
              <div className="text-sm text-indigo-600 font-medium">Active Customers</div>
              <div className="text-2xl font-bold text-indigo-900 mt-1">{activeCustomers.length}</div>
            </div>
            <div className="bg-purple-50 rounded-lg p-4">
              <div className="text-sm text-purple-600 font-medium">Pending Activities</div>
              <div className="text-2xl font-bold text-purple-900 mt-1">{pendingActivities.length}</div>
            </div>
          </div>

          {/* Tabs */}
          <div className="mt-6 flex gap-2 border-b border-gray-200">
            <button
              onClick={() => setActiveTab('all')}
              className={`px-4 py-2 font-medium transition-colors ${
                activeTab === 'all'
                  ? 'text-blue-600 border-b-2 border-blue-600'
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              All
            </button>
            <button
              onClick={() => setActiveTab('projects')}
              className={`px-4 py-2 font-medium transition-colors ${
                activeTab === 'projects'
                  ? 'text-blue-600 border-b-2 border-blue-600'
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              Projects
            </button>
            <button
              onClick={() => setActiveTab('customers')}
              className={`px-4 py-2 font-medium transition-colors ${
                activeTab === 'customers'
                  ? 'text-blue-600 border-b-2 border-blue-600'
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              Customers
            </button>
            <button
              onClick={() => setActiveTab('activities')}
              className={`px-4 py-2 font-medium transition-colors ${
                activeTab === 'activities'
                  ? 'text-blue-600 border-b-2 border-blue-600'
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              Activities
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {(activeTab === 'all' || activeTab === 'projects') && (
          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Projects</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {projects.length === 0 ? (
                <div className="col-span-full text-center py-12 text-gray-500">
                  No projects yet. Click "New Project" to get started!
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
          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Customers</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {customers.length === 0 ? (
                <div className="col-span-full text-center py-12 text-gray-500">
                  No customers yet. Click "New Customer" to add one!
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
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Next Activities</h2>
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
