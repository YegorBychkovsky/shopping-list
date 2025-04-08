# Shopping List Application

A modern, responsive shopping list application built with React, TypeScript, and Material-UI. This application allows users to manage their shopping items efficiently with features like adding, editing, and removing items.

## Features

- 📝 Add new shopping items
- ✏️ Edit existing items
- 🗑️ Remove items
- 💾 Automatic data persistence
- 🎨 Modern Material-UI design
- 📱 Responsive layout
- 🔍 Type-safe with TypeScript

## Tech Stack

- **Frontend Framework**: React 19
- **Language**: TypeScript
- **UI Library**: Material-UI (MUI) v7
- **State Management**: Zustand
- **Build Tool**: Vite
- **Code Quality**: ESLint, Prettier

## Project Structure

```
src/
├── components/         # React components
│   ├── AddItemForm/   # Form for adding new items
│   ├── EditItemDialog/# Dialog for editing items
│   ├── ShoppingList/  # Main list component
│   └── ShoppingItemForm/# Form component
├── hooks/             # Custom React hooks
├── services/          # Service layer
├── store/            # State management
├── types/            # TypeScript type definitions
└── test/             # Test files
```

## Getting Started

### Prerequisites

- Node.js (latest LTS version recommended)
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone [repository-url]
cd shopping-list
```

2. Install dependencies:
```bash
npm install
# or
yarn install
```

3. Start the development server:
```bash
npm run dev
# or
yarn dev
```

The application will be available at `http://localhost:5173`

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run lint` - Run ESLint
- `npm run preview` - Preview production build

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgments

- Material-UI for the beautiful components
- React team for the amazing framework
- Vite team for the fast build tool
