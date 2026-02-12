# AgenticProjectTracker - Setup & Configuration Guide

## Overview
A modern React-based project tracking application for managing projects, customers, and activities with Microsoft Dataverse integration.

## Quick Start

### Development
```bash
npm install
npm run dev
```

Access the application at http://localhost:5173

### Production Build
```bash
npm run build
npm run preview
```

## Configuration

### Mock Mode (Default)
By default, the application runs in mock mode using browser localStorage for data persistence. No additional configuration needed.

### Dataverse Integration

To connect to Microsoft Dataverse:

1. Create a `.env` file in the root directory:
```bash
cp .env.example .env
```

2. Configure your Dataverse credentials:
```env
VITE_DATAVERSE_ENDPOINT=https://your-org.crm.dynamics.com/api/data/v9.2
VITE_DATAVERSE_TOKEN=your-access-token
```

3. Set up Dataverse tables with the following structure:

#### Projects Table
- name (string)
- description (string)
- status (choice: active, completed, on-hold)
- priority (choice: low, medium, high)
- startDate (date)
- completedDate (date, optional)

#### Customers Table
- name (string)
- company (string)
- email (string)
- phone (string, optional)
- engagementStatus (choice: active, inactive, pending)
- lastContactDate (date)

#### Activities Table
- title (string)
- description (string)
- dueDate (date)
- priority (choice: low, medium, high)
- status (choice: todo, in-progress, done)
- projectId (lookup to Projects, optional)
- customerId (lookup to Customers, optional)

## Features

### Project Management
- **Add Projects**: Click "+ New Project" to create a new project
- **Update Status**: Use "Mark Complete", "Put On Hold", or "Resume" buttons
- **Track Progress**: View status badges and dates for each project
- **Priority Levels**: Set low, medium, or high priority

### Customer Management
- **Add Customers**: Click "+ New Customer" to add customer contacts
- **Track Engagement**: Monitor engagement status (active, inactive, pending)
- **Update Contact**: Use "Update Last Contact" to record interactions
- **Contact Information**: Store email and phone numbers

### Activity Management
- **Add Activities**: Click "+ New Activity" to create to-do items
- **Track Status**: Click on activity icons to cycle through todo → in-progress → done
- **Set Priorities**: Assign priority levels to activities
- **Due Dates**: Set and track due dates
- **Delete Activities**: Remove completed or unwanted activities

### Dashboard Features
- **Statistics**: View counts of active projects, customers, and pending activities
- **Tab Navigation**: Filter view by All, Projects, Customers, or Activities
- **Responsive Design**: Works on desktop, tablet, and mobile devices

## Architecture

### Technology Stack
- **React 18**: UI framework with hooks
- **TypeScript**: Type-safe development
- **Vite**: Fast build tool with HMR
- **Tailwind CSS**: Utility-first CSS framework
- **Axios**: HTTP client for API calls
- **MCP SDK**: Model Context Protocol integration

### Project Structure
```
src/
├── components/       # React components
│   ├── ProjectCard.tsx
│   ├── CustomerCard.tsx
│   ├── ActivityList.tsx
│   ├── ProjectModal.tsx
│   ├── CustomerModal.tsx
│   └── ActivityModal.tsx
├── hooks/           # Custom React hooks
│   └── useData.ts
├── services/        # API services
│   └── dataverse.ts
├── types/           # TypeScript type definitions
│   └── index.ts
├── App.tsx          # Main application component
└── main.tsx         # Application entry point
```

### Data Flow
1. **Custom Hooks** (`useData.ts`) manage state and API calls
2. **Service Layer** (`dataverse.ts`) handles data persistence
3. **Components** render UI and handle user interactions
4. **LocalStorage** provides mock data storage in development

## Development

### Available Scripts
- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

### Adding New Features
1. Define types in `src/types/index.ts`
2. Add service methods in `src/services/dataverse.ts`
3. Create custom hooks in `src/hooks/`
4. Build components in `src/components/`
5. Integrate in `src/App.tsx`

## WorkIQ MCP Integration

The application supports WorkIQ MCP for gathering work-related data. To configure:

```env
VITE_WORKIQ_MCP_ENDPOINT=your-workiq-mcp-endpoint
```

Implement custom integration logic in the services layer as needed.

## Troubleshooting

### Build Errors
- Ensure Node.js v16+ is installed
- Delete `node_modules` and run `npm install` again
- Clear the build cache: `rm -rf dist`

### Data Not Persisting
- In mock mode, data is stored in localStorage
- Check browser console for errors
- Clear localStorage to reset: `localStorage.clear()`

### Dataverse Connection Issues
- Verify endpoint URL is correct
- Check access token is valid
- Ensure proper CORS configuration
- Review Dataverse table structure matches expected schema

## License
MIT
