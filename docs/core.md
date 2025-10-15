# @thevikalp/designable-core

[![NPM version](https://img.shields.io/npm/v/@thevikalp/designable-core.svg?style=flat)](https://npmjs.org/package/@thevikalp/designable-core)
[![NPM downloads](http://img.shields.io/npm/dm/@thevikalp/designable-core.svg?style=flat)](https://npmjs.org/package/@thevikalp/designable-core)

The core package provides the fundamental engine and data structures for Triones Designable. It manages the designer state, component tree, behaviors, and provides the reactive foundation for the entire system.

## Installation

```bash
npm install @thevikalp/designable-core
# or
yarn add @thevikalp/designable-core
```

## Overview

The core package is the heart of Triones Designable, providing:

- **Designer Engine**: The main orchestrator that manages all designer operations
- **Tree Data Structure**: Hierarchical representation of form layouts
- **Reactive State Management**: Built on Formily Reactive for efficient updates
- **Component Registry**: Global system for registering components, behaviors, and locales
- **Event System**: Comprehensive event handling and propagation
- **Keyboard Shortcuts**: Extensible shortcut management
- **History Management**: Undo/redo functionality

## Core Concepts

### Designer Engine

The `Engine` is the central coordinator that manages:

- Workspaces (design canvases)
- Workbenches (UI panels)
- Viewports (rendering areas)
- Operations (user actions)

```typescript
import { createDesigner } from '@thevikalp/designable-core';

const engine = createDesigner({
  // Optional configuration
  shortcuts: [...],
  defaultComponentTree: {...},
  defaultScreenType: 'PC'
});
```

### Tree Node System

Forms are represented as a tree of `TreeNode` objects, where each node represents a component or container.

```typescript
interface ITreeNode {
  id: string;
  componentName: string;
  props: Record<string, any>;
  children: TreeNode[];
  // ... more properties
}
```

### Reactive State

All state is managed through Formily's reactive system, ensuring efficient updates and automatic re-rendering.

## Main Exports

### Engine

```typescript
import { createDesigner, Engine } from '@thevikalp/designable-core';

// Create a new designer instance
const engine = createDesigner();

// Access engine properties
engine.workbench; // Current workbench
engine.workspace; // Current workspace
engine.viewport; // Current viewport
```

### TreeNode

```typescript
import { TreeNode } from '@thevikalp/designable-core';

// Create a new tree node
const node = new TreeNode({
  componentName: 'Input',
  props: {
    title: 'Name',
    required: true
  }
});

// Manipulate the tree
node.append(childNode);
node.remove();
node.clone();
```

### Global Registry

The global registry manages components, behaviors, locales, and icons.

```typescript
import { GlobalRegistry } from '@thevikalp/designable-core';

// Register a component behavior
GlobalRegistry.registerDesignerBehaviors({
  Input: {
    Behavior: [{
      name: 'Input',
      selector: (node) => node.props['x-component'] === 'Input',
      designerProps: {
        droppable: false,
        propsSchema: {...}
      }
    }]
  }
});

// Set language
GlobalRegistry.setDesignerLanguage('en-us');

// Register locales
GlobalRegistry.registerDesignerLocales({
  'en-us': {
    Input: {
      title: 'Input Field'
    }
  }
});
```

### Shortcuts

```typescript
import { Shortcut } from '@thevikalp/designable-core';

// Define custom shortcuts
const shortcuts: Shortcut[] = [
  {
    keys: [['Control', 'z'], ['Meta', 'z']],
    action: () => {
      // Undo action
    }
  }
];

const engine = createDesigner({ shortcuts });
```

## Key Classes

### Engine

The main designer engine that coordinates all operations.

**Methods:**
- `createWorkspace(id: string)` - Create a new workspace
- `setCurrentWorkspace(workspace: Workspace)` - Switch to a workspace
- `mount()` - Mount the engine
- `unmount()` - Unmount the engine

### TreeNode

Represents a node in the component tree.

**Properties:**
- `id: string` - Unique identifier
- `componentName: string` - Component type
- `props: Record<string, any>` - Component properties
- `children: TreeNode[]` - Child nodes

**Methods:**
- `append(node: TreeNode)` - Add child node
- `insertBefore(node: TreeNode)` - Insert before this node
- `remove()` - Remove this node
- `clone()` - Create a deep copy
- `findById(id: string)` - Find descendant by ID

### Workspace

Represents a design canvas/workspace.

**Properties:**
- `id: string` - Workspace identifier
- `title: string` - Display title
- `tree: TreeNode` - Root tree node

### Workbench

Manages the UI panels and layout.

**Types:**
- `DESIGNABLE` - Design mode
- `PREVIEW` - Preview mode
- `JSONTREE` - JSON tree view
- `MARKUP` - Markup view

### Viewport

Handles the rendering viewport and transformations.

**Properties:**
- `scrollX: number` - Horizontal scroll
- `scrollY: number` - Vertical scroll
- `scale: number` - Zoom level

## Behaviors

Behaviors define how components interact in the designer.

```typescript
interface IBehavior {
  name: string;
  extends?: string[];
  selector: (node: TreeNode) => boolean;
  designerProps?: IDesignerControllerProps;
  designerLocales?: IDesignerLocales;
}
```

### Built-in Behaviors

- **Field**: Basic form field behavior
- **Container**: Container component behavior
- **Array**: Array field behavior

## Events

The core package provides a comprehensive event system.

```typescript
import { on, off, emit } from '@thevikalp/designable-shared';

// Listen for events
on('tree:change', (payload) => {
  console.log('Tree changed:', payload);
});

// Emit custom events
emit('custom:event', data);
```

## Type Definitions

### IEngineProps

Configuration options for the designer engine.

```typescript
interface IEngineProps {
  shortcuts?: Shortcut[];
  sourceIdAttrName?: string;
  nodeIdAttrName?: string;
  defaultComponentTree?: ITreeNode;
  defaultScreenType?: ScreenType;
  // ... more options
}
```

### IDesignerProps

Properties that define component behavior in the designer.

```typescript
interface IDesignerProps {
  droppable?: boolean;
  draggable?: boolean;
  deletable?: boolean;
  cloneable?: boolean;
  resizable?: IResizable;
  propsSchema?: ISchema;
  defaultProps?: any;
  // ... more options
}
```

## Usage Examples

### Basic Setup

```typescript
import { createDesigner, GlobalRegistry } from '@thevikalp/designable-core';

// Create engine
const engine = createDesigner();

// Register components
GlobalRegistry.registerDesignerBehaviors({
  // Component behaviors...
});

// Set language
GlobalRegistry.setDesignerLanguage('en-us');

// Mount engine
engine.mount();
```

### Working with Trees

```typescript
import { TreeNode } from '@thevikalp/designable-core';

// Create form structure
const formNode = new TreeNode({
  componentName: 'Form',
  props: { layout: 'vertical' }
});

const inputNode = new TreeNode({
  componentName: 'Input',
  props: { title: 'Name', required: true }
});

formNode.append(inputNode);

// Set as current tree
engine.setCurrentTree(formNode);
```

### Custom Behaviors

```typescript
const customBehavior: IBehavior = {
  name: 'CustomInput',
  selector: (node) => node.componentName === 'CustomInput',
  designerProps: {
    droppable: false,
    propsSchema: {
      type: 'object',
      properties: {
        title: { type: 'string', 'x-component': 'Input' },
        required: { type: 'boolean', 'x-component': 'Switch' }
      }
    }
  }
};

GlobalRegistry.registerDesignerBehaviors({
  CustomInput: { Behavior: [customBehavior] }
});
```

## Dependencies

- `@formily/reactive` - Reactive state management
- `@formily/json-schema` - Schema handling
- `@formily/path` - Path utilities
- `@thevikalp/designable-shared` - Shared utilities

## API Reference

For complete API documentation, see the TypeScript definitions in `src/types.ts` and individual class files.

## Contributing

When contributing to the core package:

1. Maintain backward compatibility
2. Update type definitions
3. Add comprehensive tests
4. Follow reactive patterns
5. Document new APIs

## License

UNLICENSED