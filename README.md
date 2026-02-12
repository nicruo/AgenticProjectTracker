# AgenticProjectTracker

A modern React-based project tracking application for managing projects, customers, and activities with Dataverse integration.

## Features

- **Project Management**: Track initiatives with add/update/complete functionality
- **Customer Engagement**: Manage customer relationships and engagement status
- **Activity Tracking**: Keep track of tasks and to-do items
- **Dataverse Integration**: Store data in Microsoft Dataverse (with mock mode for testing)
- **Modern UI**: Clean, responsive design built with React and Tailwind CSS

## Getting Started

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone https://github.com/nicruonorth/AgenticProjectTracker.git
cd AgenticProjectTracker
```

2. Install dependencies:
```bash
npm install
```

3. (Optional) Configure Dataverse:
```bash
cp .env.example .env
# Edit .env and add your Dataverse credentials
```

By default, the application runs in mock mode using localStorage for data persistence.

### Development

Start the development server:
```bash
npm run dev
```

The application will be available at `http://localhost:5173`

### Build

Create a production build:
```bash
npm run build
```

### Preview Production Build

Preview the production build locally:
```bash
npm run preview
```

## Usage

### Projects
- Click "New Project" to add a project
- View all projects in the Projects section
- Mark projects as complete, on-hold, or active
- Track project priorities and dates

### Customers
- Add customer contacts with company and engagement details
- Update engagement status
- Track last contact dates

### Activities
- Add tasks and to-do items
- Set priorities and due dates
- Mark activities as in-progress or done
- Link activities to projects or customers

## Dataverse Integration

To connect to Microsoft Dataverse:

1. Set up a Dataverse environment
2. Create tables for Projects, Customers, and Activities
3. Generate an access token
4. Configure the `.env` file with your endpoint and token

The application will automatically switch from mock mode to Dataverse mode when credentials are provided.

## WorkIQ MCP Integration

The application supports integration with WorkIQ MCP for gathering work-related data. Configuration can be added to the `.env` file.

## Tech Stack

- **React 18** - UI framework
- **TypeScript** - Type safety
- **Vite** - Build tool
- **Tailwind CSS** - Styling
- **Axios** - HTTP client
- **MCP SDK** - Model Context Protocol integration

## License

MIT
