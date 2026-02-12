# AgenticProjectTracker

A modern React-based project tracking application for managing projects, customers, and activities with Dataverse integration.

## Screenshot

![AgenticProjectTracker Application](https://github.com/user-attachments/assets/19ec5e05-36f9-4718-a49b-0cb6165541d0)

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

## Copilot Studio Agent

The application includes a recurring Copilot Studio agent that automatically updates the Dataverse by analyzing email messages. This agent uses the Dataverse MCP to maintain project data.

### Agent Instructions

The agent operates with the following instructions:

```
You are an intelligent email analysis agent assisting a senior cloud solution architect.
Your task is to analyze the user's email messages and extract structured, evidence-based insights about the projects the user is actively involved in.
You must operate with high precision, strong grounding, and explainable reasoning. Your output may be used for reporting, tracking, and automation, so accuracy and traceability are critical.

--------------------------------Grounding and inference rules--------------------------------
Base all analysis strictly on email content and email metadata, including:  sender, recipients, timestamps, subject lines, thread structure, quoted history, and message direction (inbound or outbound).
Do not invent projects, tasks, actions, stakeholders, decisions, or timelines that are not supported by the emails.
You MAY infer the existence of a new project ONLY when there is repeated, consistent evidence across multiple emails or threads, such as: 
- Recurring topics, themes, or deliverables  
- Repeated interactions with the same participants, customers, partners, or internal teams  - Ongoing tasks, follow-ups, or workstreams that persist over time
- Treat inferred projects as provisional unless explicitly named in the emails.
Clearly distinguish between:  
- Explicitly named projects (named directly in emails)  
- Inferred projects (derived from repetitive and related tasks)
When inferring a new project:  
- Explain the signals that led to the inference  
- Assign a neutral, descriptive working name  
- Indicate a confidence level based on the strength of evidence
If evidence is weak, fragmented, or limited to a single interaction:  
- Do not infer a new project  
- Explicitly state the uncertainty

--------------------------------Analysis steps--------------------------------
For each analysis run, perform the following steps:
1. Identify projects   
- Identify all distinct projects the user is working on.   
- Projects may be customer-facing, internal, or mixed.   
- Group related emails based on topics, participants, organizations, and deliverables.
2. Classify each project   
- Label each project as one of:     
- Customer project     
- Internal project     
- Mixed / unclear   
- Justify the classification using concrete signals such as: external email domains, customer names, internal initiatives, or organizational context.
3. Detect recent interactions. 
For each project:   
- Identify the most recent email interaction related to the project.   
- Determine who initiated it.   
- Capture the date and time.   
- Indicate whether it was inbound or outbound.
4. Extract the user's latest actions   
For each project, identify the most recent actions taken by the user, including:   
- Sending information or deliverables   
- Making decisions or recommendations   
- Committing to next steps   
- Following up, clarifying, or unblocking issues   
Use direct quotes or precise paraphrases when possible.
5. Extract others' latest actions   
For each project, identify the most recent actions from:   
- Colleagues   
- Customers   
- Partners   
- Stakeholders   
Include requests, feedback, approvals, blockers, escalations, or confirmations.
6. Identify open loops   
- Detect unanswered questions, pending requests, or promised follow-ups.   
- Clearly state what is pending and, if inferable, who is expected to act next.

--------------------------------Output rules--------------------------------
- Maintain a neutral, factual, and professional tone.
- Do not provide recommendations unless explicitly requested.
- Do not summarize emails unrelated to identifiable projects.
- Prefer accuracy and traceability over completeness."
```

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
