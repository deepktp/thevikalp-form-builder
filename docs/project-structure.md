# Project Structure

Triones Designable is organized as a monorepo using Lerna and pnpm workspaces. The project structure is designed to separate concerns and enable independent development of different packages.

## Root Directory

```
triones-designable/
├── lerna.json              # Lerna configuration
├── package.json            # Root package.json with workspace scripts
├── pnpm-workspace.yaml     # pnpm workspace configuration
├── readme.md              # Project overview (Chinese)
├── docs/                  # Documentation (this folder)
├── examples/              # Example applications
├── formily/               # Formily-specific packages
├── packages/              # Core designable packages
└── images/                # Static assets
```

## Examples Directory

```
examples/
└── basic/                 # Basic example application
    ├── src/
    │   ├── App.tsx        # Main application component
    │   ├── PreviewWidget.tsx # Form preview component
    │   └── main.tsx       # Application entry point
    ├── package.json       # Example dependencies
    ├── vite.config.ts     # Vite configuration
    └── index.html         # HTML template
```

The basic example demonstrates:
- Setting up the designer engine
- Configuring available components
- Creating the designer UI with panels
- Handling save operations
- Previewing designed forms

## Packages Directory

```
packages/
├── core/                  # Core designer engine
├── react/                 # React UI components
├── react-settings-form/   # Settings form components
├── shared/                # Shared utilities
└── flow/                  # Flow/workflow components
```

### Core Package (`@thevikalp/designable-core`)

```
packages/core/
├── src/
│   ├── index.ts           # Main exports
│   ├── types.ts           # TypeScript type definitions
│   ├── registry.ts        # Global registry for components
│   ├── presets.ts         # Default configurations
│   ├── externals.ts       # External dependencies
│   ├── drivers/           # Platform-specific drivers
│   ├── effects/           # Side effects and behaviors
│   ├── events/            # Event system
│   ├── models/            # Data models
│   └── shortcuts/         # Keyboard shortcuts
```

The core package provides:
- Designer engine creation
- Tree data structure management
- Reactive state management
- Component registration system
- Event handling
- Keyboard shortcuts

### React Package (`@thevikalp/designable-react`)

```
packages/react/
├── src/
│   ├── index.ts           # Main exports
│   ├── context.ts         # React context providers
│   ├── types.ts           # Type definitions
│   ├── styles.ts          # Style utilities
│   ├── containers/        # Layout containers
│   ├── hooks/             # React hooks
│   ├── icons/             # Icon components
│   ├── locales/           # Internationalization
│   ├── panels/            # UI panels (toolbar, settings, etc.)
│   ├── simulators/        # Component simulators
│   └── widgets/           # UI widgets
```

The React package provides:
- Designer UI components
- Panel system (composite, workspace, settings)
- Widget components (tree, outline, history)
- Toolbar and viewport management
- Drag-and-drop functionality

### React Settings Form (`@thevikalp/designable-react-settings-form`)

```
packages/react-settings-form/
├── src/
│   ├── index.ts           # Main exports
│   ├── types.ts           # Type definitions
│   ├── SchemaField.tsx    # Schema field component
│   ├── SettingsForm.tsx   # Main settings form
│   ├── components/        # Form components
│   ├── effects/           # Form effects
│   ├── locales/           # Localization
│   └── shared/            # Shared utilities
```

Provides form-based property editors for configuring components.

### Shared Package (`@thevikalp/designable-shared`)

```
packages/shared/
├── src/
│   ├── index.ts           # Main exports
│   ├── types.ts           # Type definitions
│   ├── animation.ts       # Animation utilities
│   ├── array.ts           # Array manipulation
│   ├── clone.ts           # Deep cloning utilities
│   ├── coordinate.ts      # Coordinate calculations
│   ├── element.ts         # DOM element utilities
│   ├── event.ts           # Event handling
│   ├── globalThisPolyfill.ts # Browser compatibility
│   ├── instanceof.ts      # Type checking utilities
│   ├── keycode.ts         # Keyboard code constants
│   ├── lru.ts             # LRU cache implementation
│   ├── observer.ts        # Observer pattern
│   ├── request-idle.ts    # Request idle callback
│   ├── scroller.ts        # Scrolling utilities
│   └── subscribable.ts    # Pub/sub system
```

Shared utilities used across all packages.

## Formily Directory

```
formily/
├── antd/                  # Ant Design + Formily integration
├── setters/               # Property setters for components
└── transformer/           # Schema transformation utilities
```

### Formily Antd Package (`@thevikalp/designable-formily-antd`)

```
formily/antd/
├── src/
│   ├── index.ts           # Main exports
│   ├── components/        # Form components (Input, Select, etc.)
│   ├── schemas/           # Component schemas
│   └── locales/           # Localization files
```

Provides Formily-compatible components based on Ant Design.

### Setters Package (`@thevikalp/designable-formily-setters`)

Property setter components for configuring form fields in the designer.

### Transformer Package (`@thevikalp/designable-formily-transformer`)

Utilities for transforming designer trees into Formily schemas and vice versa.

## Build System

The project uses:
- **Lerna**: Monorepo management and publishing
- **pnpm**: Package management with workspaces
- **Father**: Build tool for TypeScript packages
- **Vite**: Development server for examples

Each package has its own `package.json` with build scripts using Father for compilation.