# EVM Gas Prediction Frontend

A React-based dashboard for monitoring and predicting gas prices across different EVM-compatible blockchains.

## Backend Repository

This frontend connects to the EVM Gas Prediction Backend API:
**[https://github.com/Abbracx/evm-gas-prediction-be](https://github.com/Abbracx/evm-gas-prediction-be)**

## Features

- Real-time gas price monitoring
- Multi-chain support (Ethereum, Polygon, BSC, etc.)
- Interactive dashboard with chain selection
- TypeScript support with strict type checking
- Modern UI with Tailwind CSS

## Tech Stack

- **React 19** with TypeScript
- **Vite** for fast development and building
- **Tailwind CSS v4** for styling
- **React Router** for navigation
- **Axios** for API calls
- **Context API** for state management

## Prerequisites

- Node.js 18+ 
- Yarn package manager
- Backend API running (see backend repository above)

## Installation

1. Clone the repository:
```bash
git clone https://github.com/Abbracx/evm-gas-prediction-fe.git
cd evm-gas-prediction-fe
```

2. Install dependencies:
```bash
yarn install
```

3. Install Tailwind CSS PostCSS plugin:
```bash
yarn add -D @tailwindcss/postcss
```

## Development

Start the development server:
```bash
yarn dev
```

The application will be available at `http://localhost:5173`

## Build

Create a production build:
```bash
yarn build
```

## Project Structure

```
src/
├── components/     # Reusable UI components
├── context/        # React Context providers
├── hooks/          # Custom React hooks
├── pages/          # Page components
├── services/       # API services
├── types/          # TypeScript type definitions
├── App.tsx         # Main app component
└── main.tsx        # Application entry point
```

## Configuration

- **Tailwind CSS**: Configured with PostCSS plugin for v4 support
- **ESLint**: Strict TypeScript rules with React hooks validation
- **TypeScript**: Strict mode enabled with path mapping

## API Integration

The app integrates with the backend API through the `gasApi` service located in `src/services/api.ts`.

Make sure the backend is running before starting the frontend application.

## Contributing

1. Follow the existing code style and TypeScript patterns
2. Use the provided ESLint configuration
3. Ensure all components are properly typed
4. Test changes across different chains
