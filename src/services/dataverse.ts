import axios, { type AxiosInstance } from 'axios';
import type { Project, Customer, Activity } from '../types';

class DataverseService {
  private client: AxiosInstance | null = null;
  private mockMode: boolean = true; // Use mock mode by default

  constructor() {
    const endpoint = import.meta.env.VITE_DATAVERSE_ENDPOINT;
    const token = import.meta.env.VITE_DATAVERSE_TOKEN;

    if (endpoint && token) {
      this.client = axios.create({
        baseURL: endpoint,
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
          'OData-MaxVersion': '4.0',
          'OData-Version': '4.0',
        },
      });
      this.mockMode = false;
    }
  }

  // Projects
  async getProjects(): Promise<Project[]> {
    if (this.mockMode) {
      return this.getMockProjects();
    }
    // Real Dataverse implementation
    const response = await this.client!.get('/projects');
    return response.data.value;
  }

  async createProject(project: Omit<Project, 'id'>): Promise<Project> {
    if (this.mockMode) {
      const newProject = { ...project, id: Date.now().toString() };
      const projects = this.getMockProjects();
      projects.push(newProject);
      this.saveMockProjects(projects);
      return newProject;
    }
    const response = await this.client!.post('/projects', project);
    return response.data;
  }

  async updateProject(id: string, project: Partial<Project>): Promise<Project> {
    if (this.mockMode) {
      const projects = this.getMockProjects();
      const index = projects.findIndex(p => p.id === id);
      if (index !== -1) {
        projects[index] = { ...projects[index], ...project };
        this.saveMockProjects(projects);
        return projects[index];
      }
      throw new Error('Project not found');
    }
    const response = await this.client!.patch(`/projects(${id})`, project);
    return response.data;
  }

  async deleteProject(id: string): Promise<void> {
    if (this.mockMode) {
      const projects = this.getMockProjects();
      const filtered = projects.filter(p => p.id !== id);
      this.saveMockProjects(filtered);
      return;
    }
    await this.client!.delete(`/projects(${id})`);
  }

  // Customers
  async getCustomers(): Promise<Customer[]> {
    if (this.mockMode) {
      return this.getMockCustomers();
    }
    const response = await this.client!.get('/customers');
    return response.data.value;
  }

  async createCustomer(customer: Omit<Customer, 'id'>): Promise<Customer> {
    if (this.mockMode) {
      const newCustomer = { ...customer, id: Date.now().toString() };
      const customers = this.getMockCustomers();
      customers.push(newCustomer);
      this.saveMockCustomers(customers);
      return newCustomer;
    }
    const response = await this.client!.post('/customers', customer);
    return response.data;
  }

  async updateCustomer(id: string, customer: Partial<Customer>): Promise<Customer> {
    if (this.mockMode) {
      const customers = this.getMockCustomers();
      const index = customers.findIndex(c => c.id === id);
      if (index !== -1) {
        customers[index] = { ...customers[index], ...customer };
        this.saveMockCustomers(customers);
        return customers[index];
      }
      throw new Error('Customer not found');
    }
    const response = await this.client!.patch(`/customers(${id})`, customer);
    return response.data;
  }

  // Activities
  async getActivities(): Promise<Activity[]> {
    if (this.mockMode) {
      return this.getMockActivities();
    }
    const response = await this.client!.get('/activities');
    return response.data.value;
  }

  async createActivity(activity: Omit<Activity, 'id'>): Promise<Activity> {
    if (this.mockMode) {
      const newActivity = { ...activity, id: Date.now().toString() };
      const activities = this.getMockActivities();
      activities.push(newActivity);
      this.saveMockActivities(activities);
      return newActivity;
    }
    const response = await this.client!.post('/activities', activity);
    return response.data;
  }

  async updateActivity(id: string, activity: Partial<Activity>): Promise<Activity> {
    if (this.mockMode) {
      const activities = this.getMockActivities();
      const index = activities.findIndex(a => a.id === id);
      if (index !== -1) {
        activities[index] = { ...activities[index], ...activity };
        this.saveMockActivities(activities);
        return activities[index];
      }
      throw new Error('Activity not found');
    }
    const response = await this.client!.patch(`/activities(${id})`, activity);
    return response.data;
  }

  async deleteActivity(id: string): Promise<void> {
    if (this.mockMode) {
      const activities = this.getMockActivities();
      const filtered = activities.filter(a => a.id !== id);
      this.saveMockActivities(filtered);
      return;
    }
    await this.client!.delete(`/activities(${id})`);
  }

  // Mock data methods
  private getMockProjects(): Project[] {
    const data = localStorage.getItem('projects');
    if (data) {
      return JSON.parse(data);
    }
    const defaultProjects: Project[] = [
      {
        id: '1',
        name: 'Website Redesign',
        description: 'Modernize company website with new design',
        status: 'active',
        priority: 'high',
        startDate: '2024-01-15',
      },
      {
        id: '2',
        name: 'Mobile App Development',
        description: 'Build native mobile app for iOS and Android',
        status: 'active',
        priority: 'medium',
        startDate: '2024-02-01',
      },
    ];
    this.saveMockProjects(defaultProjects);
    return defaultProjects;
  }

  private saveMockProjects(projects: Project[]): void {
    localStorage.setItem('projects', JSON.stringify(projects));
  }

  private getMockCustomers(): Customer[] {
    const data = localStorage.getItem('customers');
    if (data) {
      return JSON.parse(data);
    }
    const defaultCustomers: Customer[] = [
      {
        id: '1',
        name: 'John Smith',
        company: 'TechCorp Inc.',
        email: 'john.smith@techcorp.com',
        phone: '+1-555-0101',
        engagementStatus: 'active',
        lastContactDate: '2024-02-10',
      },
      {
        id: '2',
        name: 'Sarah Johnson',
        company: 'Innovate LLC',
        email: 'sarah.j@innovate.com',
        phone: '+1-555-0202',
        engagementStatus: 'active',
        lastContactDate: '2024-02-08',
      },
    ];
    this.saveMockCustomers(defaultCustomers);
    return defaultCustomers;
  }

  private saveMockCustomers(customers: Customer[]): void {
    localStorage.setItem('customers', JSON.stringify(customers));
  }

  private getMockActivities(): Activity[] {
    const data = localStorage.getItem('activities');
    if (data) {
      return JSON.parse(data);
    }
    const defaultActivities: Activity[] = [
      {
        id: '1',
        title: 'Review design mockups',
        description: 'Review and approve the latest design mockups',
        dueDate: '2024-02-15',
        priority: 'high',
        status: 'todo',
        projectId: '1',
      },
      {
        id: '2',
        title: 'Schedule client meeting',
        description: 'Schedule kickoff meeting with client',
        dueDate: '2024-02-12',
        priority: 'medium',
        status: 'in-progress',
        customerId: '1',
      },
      {
        id: '3',
        title: 'Update project timeline',
        description: 'Update and share project timeline with stakeholders',
        dueDate: '2024-02-14',
        priority: 'medium',
        status: 'todo',
        projectId: '2',
      },
    ];
    this.saveMockActivities(defaultActivities);
    return defaultActivities;
  }

  private saveMockActivities(activities: Activity[]): void {
    localStorage.setItem('activities', JSON.stringify(activities));
  }
}

export const dataverseService = new DataverseService();
