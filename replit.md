# Bot Management Platform

## Overview

A full-stack web application for managing and monitoring bots. The platform provides a dashboard interface for creating, configuring, and testing bots with comprehensive analytics and reporting capabilities. Built with a modern React frontend and Express.js backend, featuring a clean UI with shadcn/ui components and PostgreSQL database integration.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture
- **Framework**: React 18 with TypeScript
- **Routing**: Wouter for client-side routing
- **UI Library**: shadcn/ui components built on Radix UI primitives
- **Styling**: Tailwind CSS with custom CSS variables for theming
- **State Management**: TanStack Query (React Query) for server state management
- **Build Tool**: Vite for fast development and optimized production builds

### Backend Architecture
- **Runtime**: Node.js with Express.js framework
- **Language**: TypeScript with ES modules
- **API Design**: RESTful API structure with route separation
- **Database Integration**: Drizzle ORM for type-safe database operations
- **Development Setup**: Vite middleware integration for seamless full-stack development

### Data Storage Solutions
- **Database**: PostgreSQL with Neon serverless connection pooling
- **ORM**: Drizzle ORM with schema-first approach
- **Migrations**: Drizzle Kit for database schema management
- **Schema Design**: Relational data model with users, bots, and tests tables including proper foreign key relationships

### Component Architecture
- **Layout System**: Responsive sidebar navigation with mobile-first design
- **Component Library**: Comprehensive UI component system with consistent styling
- **Responsive Design**: Mobile-responsive layout with sidebar overlay on mobile devices
- **Theme System**: CSS custom properties for consistent theming across components

### Development Workflow
- **Type Safety**: Full TypeScript integration across frontend, backend, and shared schemas
- **Path Aliases**: Configured path mapping for clean imports (@, @shared, @assets)
- **Development Server**: Hot reload with Vite dev server integration
- **Code Organization**: Clear separation between client, server, and shared code

### API Structure
The backend exposes RESTful endpoints for:
- Bot management (CRUD operations)
- Test execution and monitoring
- User authentication and management
- System status and analytics

## External Dependencies

### Database Services
- **Neon Database**: Serverless PostgreSQL hosting with connection pooling
- **Connection Management**: WebSocket-based connections for optimal performance

### UI Component Libraries
- **Radix UI**: Accessible component primitives for complex UI elements
- **Tailwind CSS**: Utility-first CSS framework for consistent styling
- **Lucide React**: Icon library for consistent iconography

### Development Tools
- **Replit Integration**: Custom Vite plugins for Replit development environment
- **TypeScript**: Static type checking across the entire codebase
- **ESBuild**: Fast JavaScript bundler for production builds

### Utility Libraries
- **TanStack Query**: Server state management and caching
- **React Hook Form**: Form state management with validation
- **Zod**: Runtime type validation and schema parsing
- **Date-fns**: Date manipulation and formatting utilities