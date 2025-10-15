# @thevikalp/designable-flow

[![NPM version](https://img.shields.io/npm/v/@thevikalp/designable-flow.svg?style=flat)](https://npmjs.org/package/@thevikalp/designable-flow)
[![NPM downloads](http://img.shields.io/npm/dm/@thevikalp/designable-flow.svg?style=flat)](https://npmjs.org/package/@thevikalp/designable-flow)

The Flow package provides workflow and flowchart design capabilities for Triones Designable. It integrates AntV X6 (a graph visualization library) to create interactive flow diagrams and process workflows.

## Installation

```bash
npm install @thevikalp/designable-flow
# or
yarn add @thevikalp/designable-flow
```

## Overview

The flow package provides:

- **FlowDesigner** - Main flow designer component
- **FlowEngine** - Engine for managing flow state and operations
- **Flow Panels** - UI panels for flow editing (toolbar, property panel, etc.)
- **Flow Widgets** - Interactive widgets for flow nodes and connections
- **Flow Containers** - Layout containers for the flow designer
- **Flow Hooks** - React hooks for flow state management
- **Node Types** - Predefined node types for flowcharts
- **Connection Management** - Edge creation and management

## Core Components

### FlowDesigner

The root component that provides the flow designer context and canvas.

```tsx
import { FlowDesigner, FlowEngine } from '@thevikalp/designable-flow';

const engine = new FlowEngine();

function FlowEditor() {
  return (
    <FlowDesigner engine={engine}>
      {/* Flow designer UI components */}
    </FlowDesigner>
  );
}
```

### FlowViewport

The canvas area where the flow diagram is rendered.

```tsx
import { FlowViewport } from '@thevikalp/designable-flow';

<FlowViewport>
  {/* Flow content is rendered here */}
</FlowViewport>
```

## Flow Engine

### FlowEngine

The core engine that manages the flow state, nodes, and connections.

```typescript
import { FlowEngine } from '@thevikalp/designable-flow';

const engine = new FlowEngine({
  // Configuration options
  width: 800,
  height: 600,
  grid: true,
  snapline: true
});

// Mount to DOM
engine.mount();

// Add nodes
const node = engine.addNode({
  id: 'node1',
  shape: 'rect',
  x: 100,
  y: 100,
  width: 100,
  height: 60,
  label: 'Start'
});

// Add connections
engine.addEdge({
  source: 'node1',
  target: 'node2',
  shape: 'edge'
});

// Get flow data
const data = engine.getData();
```

## Panels and Widgets

### Flow Toolbar Panel

Provides tools for flow editing operations.

```tsx
import { FlowToolbarPanel } from '@thevikalp/designable-flow';

<FlowToolbarPanel>
  {/* Toolbar buttons for zoom, undo, etc. */}
</FlowToolbarPanel>
```

### Flow Property Panel

Displays properties of selected flow elements.

```tsx
import { FlowPropertyPanel } from '@thevikalp/designable-flow';

<FlowPropertyPanel />
```

### Flow Mini Map

Miniature overview of the entire flow diagram.

```tsx
import { FlowMiniMap } from '@thevikalp/designable-flow';

<FlowMiniMap />
```

## Node Types

### Basic Shapes

```typescript
// Rectangle node
engine.addNode({
  shape: 'rect',
  x: 100,
  y: 100,
  width: 120,
  height: 60,
  label: 'Process'
});

// Circle node
engine.addNode({
  shape: 'circle',
  x: 250,
  y: 100,
  width: 80,
  height: 80,
  label: 'Decision'
});

// Diamond node
engine.addNode({
  shape: 'diamond',
  x: 400,
  y: 100,
  width: 100,
  height: 100,
  label: 'Decision'
});
```

### Custom Nodes

```typescript
// Register custom node
FlowEngine.registerNode('custom-node', {
  inherit: 'rect',
  width: 120,
  height: 60,
  attrs: {
    body: {
      fill: '#f5f5f5',
      stroke: '#d9d9d9'
    }
  }
});

// Use custom node
engine.addNode({
  shape: 'custom-node',
  x: 100,
  y: 100,
  label: 'Custom Process'
});
```

## Connections and Edges

### Basic Connections

```typescript
// Add edge between nodes
engine.addEdge({
  id: 'edge1',
  source: 'node1',
  target: 'node2',
  shape: 'edge',
  attrs: {
    line: {
      stroke: '#1890ff',
      strokeWidth: 2
    }
  }
});
```

### Connection Styles

```typescript
// Different edge shapes
engine.addEdge({
  shape: 'edge', // Straight line
  // ...
});

engine.addEdge({
  shape: 'manhattan', // Manhattan routing
  // ...
});

engine.addEdge({
  shape: 'orth', // Orthogonal routing
  // ...
});
```

### Connection Labels

```typescript
engine.addEdge({
  source: 'node1',
  target: 'node2',
  labels: [
    {
      attrs: {
        text: {
          text: 'Yes'
        }
      }
    }
  ]
});
```

## Flow Operations

### Zoom and Pan

```typescript
// Zoom to fit
engine.zoomToFit();

// Zoom to specific level
engine.zoomTo(1.5);

// Center content
engine.centerContent();

// Pan to position
engine.translate(100, 50);
```

### Selection

```typescript
// Select nodes
engine.select(['node1', 'node2']);

// Get selected elements
const selected = engine.getSelectedCells();

// Clear selection
engine.cleanSelection();
```

### History (Undo/Redo)

```typescript
// Undo last operation
engine.undo();

// Redo last undone operation
engine.redo();

// Check if can undo/redo
engine.canUndo();
engine.canRedo();
```

## Event Handling

### Flow Events

```typescript
// Listen to node events
engine.on('node:click', ({ node }) => {
  console.log('Node clicked:', node.id);
});

engine.on('node:added', ({ node }) => {
  console.log('Node added:', node.id);
});

engine.on('edge:connected', ({ edge }) => {
  console.log('Edge connected:', edge.id);
});

// Cell events (nodes and edges)
engine.on('cell:selected', ({ cell }) => {
  console.log('Cell selected:', cell.id);
});
```

### Canvas Events

```typescript
engine.on('blank:click', () => {
  console.log('Canvas clicked');
});

engine.on('scale', ({ scale }) => {
  console.log('Zoom level:', scale);
});
```

## Data Import/Export

### Export Flow Data

```typescript
// Get flow data as JSON
const flowData = engine.getData();

// Export with custom format
const customData = {
  nodes: engine.getNodes().map(node => ({
    id: node.id,
    position: node.position(),
    size: node.size(),
    data: node.getData()
  })),
  edges: engine.getEdges().map(edge => ({
    id: edge.id,
    source: edge.getSourceCellId(),
    target: edge.getTargetCellId(),
    data: edge.getData()
  }))
};
```

### Import Flow Data

```typescript
// Load flow data
engine.loadData(flowData);

// Or load from custom format
engine.clearCells();
customData.nodes.forEach(nodeData => {
  engine.addNode(nodeData);
});
customData.edges.forEach(edgeData => {
  engine.addEdge(edgeData);
});
```

## Styling and Theming

### Node Styling

```typescript
// Style nodes
engine.addNode({
  shape: 'rect',
  attrs: {
    body: {
      fill: '#e6f7ff',
      stroke: '#1890ff',
      strokeWidth: 2
    },
    label: {
      fill: '#1890ff',
      fontSize: 14
    }
  }
});
```

### Canvas Styling

```typescript
// Configure canvas
const engine = new FlowEngine({
  grid: {
    visible: true,
    type: 'mesh',
    args: {
      color: '#d0d0d0',
      thickness: 1
    }
  },
  snapline: {
    enabled: true,
    sharp: true
  },
  background: {
    color: '#f8f9fa'
  }
});
```

## React Hooks

### useFlowDesigner

Access the current flow designer engine.

```tsx
import { useFlowDesigner } from '@thevikalp/designable-flow';

function FlowComponent() {
  const engine = useFlowDesigner();
  
  const addNode = () => {
    engine.addNode({
      shape: 'rect',
      x: 100,
      y: 100,
      label: 'New Node'
    });
  };
  
  return <button onClick={addNode}>Add Node</button>;
}
```

### useFlowViewport

Access viewport information and controls.

```tsx
import { useFlowViewport } from '@thevikalp/designable-flow';

function ViewportControls() {
  const viewport = useFlowViewport();
  
  return (
    <div>
      <button onClick={() => viewport.zoomIn()}>Zoom In</button>
      <button onClick={() => viewport.zoomOut()}>Zoom Out</button>
      <button onClick={() => viewport.fit()}>Fit to Screen</button>
    </div>
  );
}
```

## Advanced Features

### Custom Node Components

```tsx
import { FlowEngine } from '@thevikalp/designable-flow';

// Register React component as node
FlowEngine.registerReactComponent('custom-node', CustomNodeComponent);

// Use in flow
engine.addNode({
  shape: 'react-shape',
  component: 'custom-node',
  x: 100,
  y: 100,
  data: { /* props for component */ }
});
```

### Validation

```typescript
// Add validation rules
engine.on('edge:connected', ({ edge }) => {
  const source = edge.getSourceCell();
  const target = edge.getTargetCell();
  
  // Custom validation logic
  if (!isValidConnection(source, target)) {
    engine.removeCell(edge);
    alert('Invalid connection');
  }
});
```

### Keyboard Shortcuts

```typescript
// Register keyboard shortcuts
engine.bindKey('delete', () => {
  const selected = engine.getSelectedCells();
  engine.removeCells(selected);
});

engine.bindKey('ctrl+c', () => {
  // Copy logic
});

engine.bindKey('ctrl+v', () => {
  // Paste logic
});
```

## Integration with Designable

The flow package integrates with the main Designable system:

```tsx
import { createDesigner } from '@thevikalp/designable-core';
import { FlowDesigner, FlowEngine } from '@thevikalp/designable-flow';

const designer = createDesigner();
const flowEngine = new FlowEngine();

function IntegratedDesigner() {
  return (
    <Designer engine={designer}>
      <StudioPanel>
        {/* Regular designable panels */}
        <CompositePanel>
          <CompositePanel.Item title="Flow" icon="Flow">
            <FlowDesigner engine={flowEngine}>
              <FlowViewport />
            </FlowDesigner>
          </CompositePanel.Item>
        </CompositePanel>
      </StudioPanel>
    </Designer>
  );
}
```

## Dependencies

- `@thevikalp/designable-core` - Core functionality
- `@thevikalp/designable-react` - React components
- `@thevikalp/designable-shared` - Utilities
- `@antv/x6` - Graph visualization library
- `@antv/x6-react-shape` - React shape components
- `antd` - UI components

## API Reference

For complete API documentation, refer to:

- [AntV X6 Documentation](https://x6.antv.vision/) - Underlying graph library
- Flow package TypeScript definitions

## Contributing

When contributing to the flow package:

1. Follow AntV X6 conventions
2. Add proper TypeScript types
3. Include visual tests for flow diagrams
4. Document custom node types
5. Test integration with main designer

## License

UNLICENSED