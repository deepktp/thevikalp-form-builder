# Getting Started

This guide will help you get started with Triones Designable, from installation to creating your first form.

## Prerequisites

Before you begin, ensure you have:

- **Node.js**: Version 16 or higher
- **Yarn**: Version 1.22 or higher (preferred package manager)
- **Git**: For cloning the repository

## Installation

### Clone the Repository

```bash
git clone https://github.com/thevikalpdev/thevikalp-form-designer.git
cd triones-designable
```

### Install Dependencies

```bash
yarn install
```

This will install dependencies for all packages in the monorepo.

### Build Packages

```bash
yarn build
```

This builds all packages in the correct order.

## Running the Example

### Start the Basic Example

```bash
cd examples/basic
yarn dev
```

The example will start at `http://localhost:5173` (or similar port).

### What You'll See

The basic example includes:

- **Component Panel**: Drag components from the left panel
- **Design Canvas**: Drop components here to build your form
- **Settings Panel**: Configure component properties on the right
- **Toolbar**: Switch between design, JSON, markup, and preview modes
- **Save Button**: Export the form schema

## Creating Your First Form

### Step 1: Add Basic Fields

1. Drag an **Input** component to the design canvas
2. Select the input to see its properties in the settings panel
3. Set the title to "Full Name"
4. Mark it as required

### Step 2: Add Selection Fields

1. Drag a **Select** component below the input
2. Configure options in the settings panel:
   - Add options like "Option 1", "Option 2", "Option 3"
3. Set title to "Department"

### Step 3: Add Layout

1. Drag a **FormGrid** component to create a 2-column layout
2. Drag components inside the grid for responsive design

### Step 4: Preview Your Form

1. Click the **Preview** button in the toolbar
2. Test your form by filling in the fields
3. Switch back to design mode to make changes

### Step 5: Save Your Schema

1. Click the **Save** button
2. The form schema will be logged to the console
3. Copy this JSON to use in your application

## Using in Your Project

### Installation

```bash
npm install @thevikalp/designable-core @thevikalp/designable-react @thevikalp/designable-formily-antd @thevikalp/designable-formily-transformer
```

Or with Yarn:

```bash
yarn add @thevikalp/designable-core @thevikalp/designable-react @thevikalp/designable-formily-antd @thevikalp/designable-formily-transformer
```

### Basic Setup

```tsx
import React from 'react';
import {
  createDesigner,
  GlobalRegistry,
} from '@thevikalp/designable-core';
import { Designer, StudioPanel, CompositePanel, Workspace, WorkspacePanel } from '@thevikalp/designable-react';
import { Input, Select, Form } from '@thevikalp/designable-formily-antd';

function App() {
  const engine = React.useMemo(() => createDesigner(), []);

  React.useEffect(() => {
    GlobalRegistry.setDesignerLanguage('en-us');
  }, []);

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
        </CompositePanel>
        <Workspace id="form">
          <WorkspacePanel>
            <ViewportPanel>
              <ComponentTreeWidget components={{ Form, Input, Select }} />
            </ViewportPanel>
          </WorkspacePanel>
        </Workspace>
      </StudioPanel>
    </Designer>
  );
}

export default App;
```

## Understanding the Architecture

### Core Concepts

1. **Designer Engine**: The core that manages the form tree and state
2. **Components**: Formily-wrapped Ant Design components
3. **Tree Structure**: Hierarchical representation of your form
4. **Schema**: JSON representation that can be saved/loaded

### Key Components

- **Designer**: Root component that provides context
- **StudioPanel**: Main layout container
- **CompositePanel**: Tabbed panel system
- **Workspace**: Design area
- **ViewportPanel**: Scrollable design surface

## Advanced Usage

### Loading Existing Schemas

```typescript
import { transformToTree } from '@thevikalp/designable-formily-transformer';

const existingSchema = { /* your saved schema */ };
const tree = transformToTree(existingSchema);
engine.setCurrentTree(tree);
```

### Custom Components

```tsx
import { connect, mapProps } from '@formily/react';
import { Input as AntdInput } from 'antd';

const CustomInput = connect(
  AntdInput,
  mapProps((props, field) => ({
    ...props,
    placeholder: field.placeholder,
  }))
);
```

### Custom Themes

```typescript
import { GlobalRegistry } from '@thevikalp/designable-core';

GlobalRegistry.registerDesignerThemes({
  'custom-theme': {
    // Custom theme configuration
  },
});
```

## Development Workflow

### Local Development

1. **Make changes** to packages
2. **Build packages**: `yarn build`
3. **Test in example**: `cd examples/basic && yarn dev`
4. **Iterate** until satisfied

### Adding New Features

1. **Plan the feature**: Understand requirements
2. **Implement in core**: Add functionality to appropriate package
3. **Update UI**: Modify React components if needed
4. **Add tests**: Ensure functionality works
5. **Update docs**: Document the new feature

## Troubleshooting

### Common Issues

**"Module not found" errors**:
```bash
# Clean and reinstall
yarn clean
yarn install
yarn build
```

**Example not starting**:
```bash
# Check port availability
cd examples/basic
yarn dev --port 3000
```

**Components not appearing**:
- Ensure components are imported and registered
- Check that packages are built: `yarn build`

**Save not working**:
- Check browser console for errors
- Verify transformToSchema import

### Getting Help

- **Check existing issues**: Search GitHub issues
- **Read documentation**: Refer to other docs in this folder
- **Debug mode**: Use browser dev tools to inspect components

## Next Steps

- [Explore Components](./components.md) - Learn about available form components
- [Adding Fields](./adding-fields.md) - Create custom form components
- [Modifying Files](./modifying-files.md) - Understand the codebase structure
- [Commands](./commands.md) - Learn development and build commands

## Examples and Resources

- **Basic Example**: `examples/basic/` - Complete working example
- **API Documentation**: Check individual package READMEs
- **Formily Docs**: https://formilyjs.org/ - Underlying form library
- **Ant Design Docs**: https://ant.design/ - UI component library