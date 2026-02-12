export interface Project {
  id: string;
  name: string;
  description: string;
  status: 'active' | 'completed' | 'on-hold';
  priority: 'low' | 'medium' | 'high';
  startDate: string;
  completedDate?: string;
  customerId?: string;
}

export interface Customer {
  id: string;
  name: string;
  company: string;
  email: string;
  phone?: string;
  engagementStatus: 'active' | 'inactive' | 'pending';
  lastContactDate: string;
}

export interface Activity {
  id: string;
  title: string;
  description: string;
  dueDate: string;
  priority: 'low' | 'medium' | 'high';
  status: 'todo' | 'in-progress' | 'done';
  projectId?: string;
  customerId?: string;
}

export interface DataverseConfig {
  endpoint: string;
  apiVersion: string;
}
