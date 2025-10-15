# Adding Fields

This guide explains how to add new form fields to Triones Designable. The process involves creating components in the Formily Antd package and integrating them into the designer.

## Overview

Adding a new field requires:

1. Creating the component implementation
2. Defining the component schema
3. Adding localization strings
4. Registering the component in the designer
5. Updating the example application

## Step-by-Step Guide

### 1. Create Component Implementation

Navigate to the Formily Antd components directory:

```bash
cd formily/antd/src/components
```

Create a new directory for your component (e.g., `MyField/`):

```
MyField/
├── index.ts
├── MyField.tsx
└── schema.ts
```

**MyField.tsx** - Component implementation:
```tsx
import React from 'react';
import { connect, mapProps } from '@formily/react';
import { Input as AntdInput } from 'antd';

export const MyField = connect(
  AntdInput,
  mapProps(
    (props, field) => {
      return {
        ...props,
        title: field.title,
      };
    },
    (props, field) => {
      return {
        ...props,
        onChange: field.onChange,
        value: field.value,
      };
    }
  )
);

MyField.displayName = 'MyField';
```

**schema.ts** - Component schema:
```typescript
export const MyField = {
  type: 'object',
  properties: {
    title: {
      type: 'string',
      'x-decorator': 'FormItem',
      'x-component': 'Input',
      'x-component-props': {
        placeholder: 'Field Title',
      },
    },
    required: {
      type: 'boolean',
      'x-decorator': 'FormItem',
      'x-component': 'Switch',
      'x-component-props': {
        defaultChecked: false,
      },
    },
    // Add more properties as needed
  },
};
```

**index.ts** - Export the component:
```typescript
export * from './MyField';
export * from './schema';
```

### 2. Update Package Exports

Edit `formily/antd/src/components/index.ts`:

```typescript
export * from './MyField';
```

### 3. Add Localization

Edit `formily/antd/src/locales/en-US.ts`:

```typescript
export const enUS = {
  // ... existing translations
  MyField: {
    title: 'My Field',
    settings: {
      title: 'Title',
      required: 'Required',
    },
  },
};
```

### 4. Register Component in Designer

Update the main package export in `formily/antd/src/index.ts` if needed, then modify the example application.

### 5. Update Example Application

Edit `examples/basic/src/App.tsx`:

```tsx
import {
  // ... existing imports
  MyField,
} from '@thevikalp/designable-formily-antd';

const components: IDesignerComponents = {
  // ... existing components
  MyField,
};
```

Add it to the resource widget:

```tsx
<ResourceWidget
  title="Basic Fields"
  sources={[
    // ... existing sources
    MyField
  ]}
/>
```

### 6. Build and Test

```bash
# Build the formily package
cd formily/antd
yarn build

# Start the example
cd examples/basic
yarn dev
```

## Component Types

### Basic Input Components

For simple input components like text inputs, numbers, etc.:

```tsx
export const MyInput = connect(
  AntdInput,
  mapProps(
    (props, field) => ({
      ...props,
      placeholder: field.placeholder || props.placeholder,
    }),
    (props, field) => ({
      ...props,
      onChange: field.onChange,
      value: field.value,
    })
  )
);
```

### Selection Components

For components like Select, Radio, Checkbox:

```tsx
export const MySelect = connect(
  AntdSelect,
  mapProps(
    (props, field) => ({
      ...props,
      options: field.options || [],
    }),
    (props, field) => ({
      ...props,
      onChange: field.onChange,
      value: field.value,
    })
  )
);
```

### Container Components

For layout components like Card, Space:

```tsx
export const MyCard = connect(
  AntdCard,
  mapProps((props, field) => ({
    ...props,
    title: field.title,
  }))
);
```

## Schema Properties

Common schema properties for field configuration:

```typescript
{
  type: 'object',
  properties: {
    title: {
      type: 'string',
      'x-decorator': 'FormItem',
      'x-component': 'Input',
    },
    placeholder: {
      type: 'string',
      'x-decorator': 'FormItem',
      'x-component': 'Input',
    },
    required: {
      type: 'boolean',
      'x-decorator': 'FormItem',
      'x-component': 'Switch',
    },
    defaultValue: {
      type: 'string',
      'x-decorator': 'FormItem',
      'x-component': 'Input',
    },
    // Component-specific properties
    options: {
      type: 'array',
      'x-decorator': 'FormItem',
      'x-component': 'ArrayItems',
      items: {
        type: 'object',
        properties: {
          label: {
            type: 'string',
            'x-decorator': 'FormItem',
            'x-component': 'Input',
          },
          value: {
            type: 'string',
            'x-decorator': 'FormItem',
            'x-component': 'Input',
          },
        },
      },
    },
  },
}
```

## Advanced Features

### Custom Validation

Add validation rules to your schema:

```typescript
{
  required: {
    type: 'boolean',
    'x-decorator': 'FormItem',
    'x-component': 'Switch',
  },
  minLength: {
    type: 'number',
    'x-decorator': 'FormItem',
    'x-component': 'NumberPicker',
    'x-reactions': {
      dependencies: ['.required'],
      fulfill: {
        state: {
          visible: '{{$deps[0]}}',
        },
      },
    },
  },
}
```

### Conditional Properties

Use reactions to show/hide properties based on other values:

```typescript
{
  fieldType: {
    type: 'string',
    enum: ['text', 'number', 'email'],
    'x-decorator': 'FormItem',
    'x-component': 'Select',
  },
  maxLength: {
    type: 'number',
    'x-decorator': 'FormItem',
    'x-component': 'NumberPicker',
    'x-reactions': {
      dependencies: ['.fieldType'],
      fulfill: {
        state: {
          visible: '{{$deps[0] === "text"}}',
        },
      },
    },
  },
}
```

### Array Fields

For components that need array configuration (like Select options):

```typescript
{
  options: {
    type: 'array',
    'x-decorator': 'FormItem',
    'x-component': 'ArrayItems',
    items: {
      type: 'object',
      properties: {
        label: {
          type: 'string',
          'x-decorator': 'FormItem',
          'x-component': 'Input',
        },
        value: {
          type: 'string',
          'x-decorator': 'FormItem',
          'x-component': 'Input',
        },
      },
    },
  },
}
```

### Component Variants

For components with multiple display modes or variants, see the [Creating Component Variants](./creating-component-variants.md) guide.

## Testing New Components

After adding a component:

1. **Build the package**: `yarn build`
2. **Start the example**: `cd examples/basic && yarn dev`
3. **Drag the component** into the design area
4. **Configure properties** in the settings panel
5. **Switch to preview mode** to test the rendered form
6. **Save the schema** to verify JSON output

## Best Practices

- **Follow naming conventions**: Use PascalCase for component names
- **Provide default props**: Ensure components work without configuration
- **Add proper TypeScript types**: Define interfaces for component props
- **Include localization**: Support multiple languages from the start
- **Test edge cases**: Empty values, validation states, disabled states
- **Document component usage**: Add JSDoc comments to component files

## Troubleshooting

**Component not appearing in designer**:
- Check that it's exported from `components/index.ts`
- Verify it's imported and added to `components` object in `App.tsx`

**Properties not showing in settings**:
- Check schema definition syntax
- Ensure schema is properly exported

**Component not rendering in preview**:
- Verify Formily schema transformation
- Check that component is registered in `PreviewWidget.tsx`

**TypeScript errors**:
- Ensure proper type definitions
- Check import paths and exports