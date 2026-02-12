import { useState, useEffect } from 'react';
import type { Project, Customer, Activity } from '../types';
import { dataverseService } from '../services/dataverse';

export function useProjects() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const loadProjects = async () => {
    try {
      setLoading(true);
      const data = await dataverseService.getProjects();
      setProjects(data);
      setError(null);
    } catch (err) {
      setError('Failed to load projects');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadProjects();
  }, []);

  const addProject = async (project: Omit<Project, 'id'>) => {
    try {
      const newProject = await dataverseService.createProject(project);
      setProjects([...projects, newProject]);
      return newProject;
    } catch (err) {
      setError('Failed to create project');
      throw err;
    }
  };

  const updateProject = async (id: string, updates: Partial<Project>) => {
    try {
      const updated = await dataverseService.updateProject(id, updates);
      setProjects(projects.map(p => p.id === id ? updated : p));
      return updated;
    } catch (err) {
      setError('Failed to update project');
      throw err;
    }
  };

  const deleteProject = async (id: string) => {
    try {
      await dataverseService.deleteProject(id);
      setProjects(projects.filter(p => p.id !== id));
    } catch (err) {
      setError('Failed to delete project');
      throw err;
    }
  };

  return {
    projects,
    loading,
    error,
    addProject,
    updateProject,
    deleteProject,
    refresh: loadProjects,
  };
}

export function useCustomers() {
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const loadCustomers = async () => {
    try {
      setLoading(true);
      const data = await dataverseService.getCustomers();
      setCustomers(data);
      setError(null);
    } catch (err) {
      setError('Failed to load customers');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadCustomers();
  }, []);

  const addCustomer = async (customer: Omit<Customer, 'id'>) => {
    try {
      const newCustomer = await dataverseService.createCustomer(customer);
      setCustomers([...customers, newCustomer]);
      return newCustomer;
    } catch (err) {
      setError('Failed to create customer');
      throw err;
    }
  };

  const updateCustomer = async (id: string, updates: Partial<Customer>) => {
    try {
      const updated = await dataverseService.updateCustomer(id, updates);
      setCustomers(customers.map(c => c.id === id ? updated : c));
      return updated;
    } catch (err) {
      setError('Failed to update customer');
      throw err;
    }
  };

  return {
    customers,
    loading,
    error,
    addCustomer,
    updateCustomer,
    refresh: loadCustomers,
  };
}

export function useActivities() {
  const [activities, setActivities] = useState<Activity[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const loadActivities = async () => {
    try {
      setLoading(true);
      const data = await dataverseService.getActivities();
      setActivities(data);
      setError(null);
    } catch (err) {
      setError('Failed to load activities');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadActivities();
  }, []);

  const addActivity = async (activity: Omit<Activity, 'id'>) => {
    try {
      const newActivity = await dataverseService.createActivity(activity);
      setActivities([...activities, newActivity]);
      return newActivity;
    } catch (err) {
      setError('Failed to create activity');
      throw err;
    }
  };

  const updateActivity = async (id: string, updates: Partial<Activity>) => {
    try {
      const updated = await dataverseService.updateActivity(id, updates);
      setActivities(activities.map(a => a.id === id ? updated : a));
      return updated;
    } catch (err) {
      setError('Failed to update activity');
      throw err;
    }
  };

  const deleteActivity = async (id: string) => {
    try {
      await dataverseService.deleteActivity(id);
      setActivities(activities.filter(a => a.id !== id));
    } catch (err) {
      setError('Failed to delete activity');
      throw err;
    }
  };

  return {
    activities,
    loading,
    error,
    addActivity,
    updateActivity,
    deleteActivity,
    refresh: loadActivities,
  };
}
