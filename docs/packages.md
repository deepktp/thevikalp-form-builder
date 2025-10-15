# Packages

Triones Designable is organized into several packages, each serving a specific purpose in the form designer ecosystem. This document describes each package and its responsibilities.

## Core Packages

### @thevikalp/designable-core

**Version**: 1.1.0  
**Purpose**: Core engine for the form designer

**Key Features**:
- Designer engine creation and management
- Tree data structure for form layouts
- Reactive state management using Formily Reactive
- Global component registry
- Event system and keyboard shortcuts
- History management (undo/redo)

**Main Exports**:
- `createDesigner()` - Creates a new designer instance
- `GlobalRegistry` - Global component and language registry
- `TreeNode` - Tree node data structure
- `Shortcut` - Keyboard shortcut management
- `KeyCode` - Keyboard code constants

**Dependencies**:
- `@formily/reactive` - Reactive state management
- `@formily/json-schema` - Schema handling
- `@thevikalp/designable-shared` - Shared utilities

### @thevikalp/designable-react

**Version**: 1.1.0  
**Purpose**: React UI components for the designer interface

**Key Features**:
- Complete designer UI with panels and widgets
- Drag-and-drop functionality
- Multiple view modes (design, JSON tree, preview)
- Toolbar and viewport management
- Component tree widget
- Settings panel integration

**Main Components**:
- `Designer` - Root designer component
- `StudioPanel` - Main studio layout
- `CompositePanel` - Multi-tab panel system
- `Workspace` - Design workspace
- `ViewportPanel` - Viewport container
- `ToolbarPanel` - Toolbar container
- `SettingsPanel` - Properties panel

**Dependencies**:
- `@thevikalp/designable-core` - Core functionality
- `@thevikalp/designable-shared` - Utilities
- `antd` - UI components
- `@formily/reactive-react` - React reactive bindings

### @thevikalp/designable-shared

**Version**: 1.1.0  
**Purpose**: Shared utilities and types used across packages

**Key Features**:
- Utility functions for arrays, objects, DOM manipulation
- Animation helpers
- Coordinate calculations
- Event handling utilities
- LRU cache implementation
- Observer pattern implementation
- TypeScript type definitions

**Main Exports**:
- Array manipulation functions
- DOM element utilities
- Animation functions
- Coordinate helpers
- Event system classes
- Type definitions

## Formily Integration Packages

### @thevikalp/designable-formily-antd

**Version**: 1.1.0  
**Purpose**: Formily + Ant Design component implementations

**Key Features**:
- Formily-compatible form components
- Ant Design v5 component wrappers
- Schema definitions for each component
- Localization support
- Field and form wrappers

**Available Components**:
- **Basic Fields**: Input, Password, NumberPicker, Text
- **Selection Fields**: Select, Radio, Checkbox, Switch, Slider, Rate
- **Date/Time Fields**: DatePicker, TimePicker
- **Advanced Fields**: Cascader, TreeSelect, Transfer, Upload
- **Layout Components**: FormGrid, Space, Card
- **Array Fields**: ArrayCards, ArrayTable
- **Form Components**: Form, Field

**Dependencies**:
- `@formily/antd-v5` - Formily Ant Design integration
- `@formily/core` - Formily core
- `@thevikalp/designable-core` - Designer core
- `antd` - Ant Design components

### @thevikalp/designable-formily-setters

**Version**: 1.1.0  
**Purpose**: Property setter components for the settings panel

**Key Features**:
- Form-based property editors
- Component-specific property panels
- Validation rule editors
- Style property editors

**Dependencies**:
- `@thevikalp/designable-core`
- `@formily/react`

### @thevikalp/designable-formily-transformer

**Version**: 1.1.0  
**Purpose**: Schema transformation utilities

**Key Features**:
- Transform designer tree to Formily schema
- Transform Formily schema to designer tree
- Schema validation and normalization

**Main Functions**:
- `transformToSchema()` - Convert tree to schema
- `transformToTree()` - Convert schema to tree

**Dependencies**:
- `@formily/json-schema`
- `@thevikalp/designable-core`

## Additional Packages

### @thevikalp/designable-react-settings-form

**Version**: 1.1.0  
**Purpose**: Settings form component for property editing

**Key Features**:
- Dynamic form generation for component properties
- Schema-based form rendering
- File upload support for settings

**Main Components**:
- `SettingsForm` - Main settings form component
- `SchemaField` - Schema field renderer

**Dependencies**:
- `@thevikalp/designable-core`
- `@formily/react`

### @thevikalp/designable-flow

**Version**: 1.1.0  
**Purpose**: Flow/workflow components (currently minimal)

**Key Features**:
- Basic flow diagram support
- Workflow node management

## Package Dependencies Graph

```
@thevikalp/designable-formily-antd
├── @thevikalp/designable-core
├── @thevikalp/designable-react
├── @thevikalp/designable-formily-setters
├── @thevikalp/designable-formily-transformer
├── @thevikalp/designable-shared
└── @formily/antd-v5

@thevikalp/designable-react
├── @thevikalp/designable-core
└── @thevikalp/designable-shared

@thevikalp/designable-core
└── @thevikalp/designable-shared

@thevikalp/designable-react-settings-form
└── @thevikalp/designable-core
```

## Development Dependencies

All packages use:
- `father` - Build tool for TypeScript packages
- `@types/node` - Node.js type definitions
- `@types/react` - React type definitions

## Build Configuration

Each package uses Father for building with these features:
- TypeScript compilation
- ESM and CommonJS outputs
- Type definition generation
- Dependency prebundling

## Version Management

All packages are versioned together using Lerna:
- Current version: 1.1.0
- Versioning strategy: Independent with fixed versions
- Publishing: To npm public registry

## Package Scripts

Standard scripts across all packages:
- `dev` - Start development server
- `build` - Production build
- `build:deps` - Prebundle dependencies
- `prepublishOnly` - Pre-publish checks