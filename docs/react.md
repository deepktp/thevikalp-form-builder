# @thevikalp/designable-react

[![NPM version](https://img.shields.io/npm/v/@thevikalp/designable-react.svg?style=flat)](https://npmjs.org/package/@thevikalp/designable-react)
[![NPM downloads](http://img.shields.io/npm/dm/@thevikalp/designable-react.svg?style=flat)](https://npmjs.org/package/@thevikalp/designable-react)

The React package provides the UI components and hooks for building the Triones Designable interface. It includes panels, widgets, containers, and all the visual elements needed to create a drag-and-drop form designer.

## Installation

```bash
npm install @thevikalp/designable-react
# or
yarn add @thevikalp/designable-react
```

## Overview

The React package provides:

- **Designer Component**: Root component that provides context
- **Panel System**: Modular UI panels (toolbar, settings, composite, etc.)
- **Widget System**: Reusable UI widgets (tree, outline, history, etc.)
- **Container Components**: Layout containers for organizing content
- **React Hooks**: Hooks for accessing designer state and functionality
- **Context Providers**: React context for sharing designer state
- **Styling System**: Theme and styling utilities

## Core Components

### Designer

The root component that provides the designer context to all child components.

```tsx
import { Designer } from '@thevikalp/designable-react';
import { createDesigner } from '@thevikalp/designable-core';

const engine = createDesigner();

function App() {
  return (
    <Designer engine={engine}>
      {/* Designer UI components */}
    </Designer>
  );
}
```

### StudioPanel

The main layout container that organizes all designer panels.

```tsx
import { StudioPanel } from '@thevikalp/designable-react';

<Designer engine={engine}>
  <StudioPanel>
    {/* Panel content */}
  </StudioPanel>
</Designer>
```

### CompositePanel

A tabbed panel system for organizing multiple panels.

```tsx
import { CompositePanel } from '@thevikalp/designable-react';

<CompositePanel>
  <CompositePanel.Item title="Components" icon="Component">
    <ResourceWidget sources={[Input, Select]} />
  </CompositePanel.Item>
  <CompositePanel.Item title="Outlined" icon="Outline">
    <OutlineWidget />
  </CompositePanel.Item>
</CompositePanel>
```

### Workspace

Represents a design workspace/canvas.

```tsx
import { Workspace, WorkspacePanel } from '@thevikalp/designable-react';

<Workspace id="form">
  <WorkspacePanel>
    {/* Workspace content */}
  </WorkspacePanel>
</Workspace>
```

### ViewportPanel

The scrollable design surface where components are rendered.

```tsx
import { ViewportPanel } from '@thevikalp/designable-react';

<ViewportPanel>
  <ComponentTreeWidget components={{ Form, Input, Select }} />
</ViewportPanel>
```

## Panel Components

### ToolbarPanel

Provides toolbar functionality with view switching.

```tsx
import { ToolbarPanel } from '@thevikalp/designable-react';

<ToolbarPanel>
  <ViewToolsWidget />
  <DesignerToolsWidget />
</ToolbarPanel>
```

### SettingsPanel

Displays property panels for configuring selected components.

```tsx
import { SettingsPanel } from '@thevikalp/designable-react';

<SettingsPanel title="Properties">
  {/* Settings content */}
</SettingsPanel>
```

## Widget Components

### ResourceWidget

Displays available components that can be dragged into the design.

```tsx
import { ResourceWidget } from '@thevikalp/designable-react';

<ResourceWidget
  title="Form Fields"
  sources={[Input, Select, Checkbox, Radio]}
/>
```

### ComponentTreeWidget

Renders the component tree in the viewport.

```tsx
import { ComponentTreeWidget } from '@thevikalp/designable-react';

<ComponentTreeWidget
  components={{
    Form,
    Input,
    Select,
    // ... all available components
  }}
/>
```

### OutlineWidget

Shows the hierarchical outline of the form structure.

```tsx
import { OutlineWidget } from '@thevikalp/designable-react';

<OutlineWidget />
```

### HistoryWidget

Provides undo/redo functionality.

```tsx
import { HistoryWidget } from '@thevikalp/designable-react';

<HistoryWidget />
```

### DroppableWidget

A placeholder widget shown when a container can accept drops.

```tsx
import { DroppableWidget } from '@thevikalp/designable-react';

// Automatically rendered when needed
```

## Container Components

Containers provide layout structure for the designer UI.

```tsx
import { 
  Layout,
  Sider,
  Content,
  Header 
} from '@thevikalp/designable-react/containers';

// Use for custom layouts
```

## React Hooks

### useDesigner

Access the current designer engine instance.

```tsx
import { useDesigner } from '@thevikalp/designable-react';

function MyComponent() {
  const engine = useDesigner();
  
  const handleSave = () => {
    const schema = engine.getCurrentTree().serialize();
    // Save schema
  };
  
  return <button onClick={handleSave}>Save</button>;
}
```

### useTreeNode

Access the current tree node context.

```tsx
import { useTreeNode } from '@thevikalp/designable-react';

function NodeComponent() {
  const node = useTreeNode();
  
  return (
    <div>
      Component: {node.componentName}
      Props: {JSON.stringify(node.props)}
    </div>
  );
}
```

### useWorkspace

Access the current workspace.

```tsx
import { useWorkspace } from '@thevikalp/designable-react';

function WorkspaceInfo() {
  const workspace = useWorkspace();
  
  return (
    <div>
      <h3>{workspace.title}</h3>
      <p>ID: {workspace.id}</p>
    </div>
  );
}
```

### useSelection

Access the current selection state.

```tsx
import { useSelection } from '@thevikalp/designable-react';

function SelectionInfo() {
  const selection = useSelection();
  
  return (
    <div>
      Selected nodes: {selection.selected.length}
    </div>
  );
}
```

### useWorkbench

Access the workbench state.

```tsx
import { useWorkbench } from '@thevikalp/designable-react';

function ViewSwitcher() {
  const workbench = useWorkbench();
  
  const switchToPreview = () => {
    workbench.type = 'PREVIEW';
  };
  
  return (
    <button onClick={switchToPreview}>
      Preview
    </button>
  );
}
```

### useHistory

Access undo/redo functionality.

```tsx
import { useHistory } from '@thevikalp/designable-react';

function HistoryControls() {
  const history = useHistory();
  
  return (
    <div>
      <button 
        onClick={() => history.undo()}
        disabled={!history.canUndo}
      >
        Undo
      </button>
      <button 
        onClick={() => history.redo()}
        disabled={!history.canRedo}
      >
        Redo
      </button>
    </div>
  );
}
```

### useCursor

Access cursor state for drag operations.

```tsx
import { useCursor } from '@thevikalp/designable-react';

function CursorIndicator() {
  const cursor = useCursor();
  
  return (
    <div className={`cursor-${cursor.type}`}>
      {cursor.dragging && 'Dragging...'}
    </div>
  );
}
```

## Context Providers

### DesignerComponentsContext

Provides the component map to child components.

```tsx
import { DesignerComponentsContext } from '@thevikalp/designable-react';

const components = {
  Input: FormilyInput,
  Select: FormilySelect,
  // ...
};

<DesignerComponentsContext.Provider value={components}>
  {/* Components that need access to the component map */}
</DesignerComponentsContext.Provider>
```

### TreeNodeContext

Provides the current tree node to descendants.

```tsx
import { TreeNodeContext } from '@thevikalp/designable-react';

// Usually managed automatically by the designer
```

## Styling and Theming

### CSS-in-JS Support

The package includes CSS-in-JS utilities for dynamic styling.

```tsx
import { useCssInJs } from '@thevikalp/designable-react';

function StyledComponent() {
  const css = useCssInJs();
  
  return (
    <div 
      className={css`
        background: ${props => props.theme.primaryColor};
        padding: 16px;
      `}
    >
      Content
    </div>
  );
}
```

### Theme Variables

Access design tokens and theme variables.

```tsx
import { useTheme, useToken } from '@thevikalp/designable-react';

function ThemedComponent() {
  const theme = useTheme();
  const token = useToken();
  
  return (
    <div style={{ color: token.colorPrimary }}>
      Themed content
    </div>
  );
}
```

## Advanced Usage

### Custom Panels

Create custom panels by extending the panel system.

```tsx
import { CompositePanel } from '@thevikalp/designable-react';

function CustomPanel() {
  return (
    <CompositePanel.Item title="Custom" icon="CustomIcon">
      <div>
        {/* Custom panel content */}
      </div>
    </CompositePanel.Item>
  );
}
```

### Custom Widgets

Create reusable widgets for specific functionality.

```tsx
import { observer } from '@formily/reactive-react';
import { useDesigner } from '@thevikalp/designable-react';

const CustomWidget = observer(() => {
  const designer = useDesigner();
  
  return (
    <div>
      {/* Widget content */}
    </div>
  );
});
```

### Layout Customization

Customize the designer layout using containers.

```tsx
import { Layout, Sider, Content } from '@thevikalp/designable-react/containers';

<StudioPanel>
  <Layout>
    <Sider width={300}>
      <CompositePanel />
    </Sider>
    <Content>
      <Workspace id="main">
        <WorkspacePanel>
          <ToolbarPanel />
          <ViewportPanel />
        </WorkspacePanel>
      </Workspace>
    </Content>
    <Sider width={300}>
      <SettingsPanel />
    </Sider>
  </Layout>
</StudioPanel>
```

## Type Definitions

### IDesignerComponents

Map of component names to their implementations.

```typescript
interface IDesignerComponents {
  [componentName: string]: React.ComponentType<any>;
}
```

### IWorkspaceContext

Context provided by the Workspace component.

```typescript
interface IWorkspaceContext {
  id: string;
  title: string;
  // ... more properties
}
```

## Dependencies

- `@thevikalp/designable-core` - Core functionality
- `@thevikalp/designable-shared` - Shared utilities
- `@formily/reactive-react` - React reactive bindings
- `antd` - UI components
- `react` - React library

## Complete Example

```tsx
import React from 'react';
import {
  Designer,
  StudioPanel,
  CompositePanel,
  Workspace,
  WorkspacePanel,
  ToolbarPanel,
  ViewportPanel,
  SettingsPanel,
  ResourceWidget,
  ComponentTreeWidget,
  OutlineWidget,
  HistoryWidget,
} from '@thevikalp/designable-react';
import { createDesigner, GlobalRegistry } from '@thevikalp/designable-core';
import { Input, Select } from '@thevikalp/designable-formily-antd';

const engine = createDesigner();

GlobalRegistry.setDesignerLanguage('en-us');

const components = {
  Input,
  Select,
};

function App() {
  return (
    <Designer engine={engine}>
      <StudioPanel>
        <CompositePanel>
          <CompositePanel.Item title="Components" icon="Component">
            <ResourceWidget
              title="Fields"
              sources={[Input, Select]}
            />
          </CompositePanel.Item>
          <CompositePanel.Item title="Outline" icon="Outline">
            <OutlineWidget />
          </CompositePanel.Item>
        </CompositePanel>
        
        <Workspace id="form">
          <WorkspacePanel>
            <ToolbarPanel>
              <HistoryWidget />
            </ToolbarPanel>
            <ViewportPanel>
              <ComponentTreeWidget components={components} />
            </ViewportPanel>
          </WorkspacePanel>
        </Workspace>
        
        <SettingsPanel />
      </StudioPanel>
    </Designer>
  );
}

export default App;
```

## Contributing

When contributing to the React package:

1. Follow React best practices
2. Use TypeScript for type safety
3. Implement proper error boundaries
4. Add comprehensive tests
5. Document new components and hooks

## License

UNLICENSED