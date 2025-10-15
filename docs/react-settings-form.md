# @thevikalp/designable-react-settings-form

[![NPM version](https://img.shields.io/npm/v/@thevikalp/designable-react-settings-form.svg?style=flat)](https://npmjs.org/package/@thevikalp/designable-react-settings-form)
[![NPM downloads](http://img.shields.io/npm/dm/@thevikalp/designable-react-settings-form.svg?style=flat)](https://npmjs.org/package/@thevikalp/designable-react-settings-form)

The React Settings Form package provides form-based property editors for configuring components in the Triones Designable interface. It includes specialized input components and a dynamic form system for editing component properties.

## Installation

```bash
npm install @thevikalp/designable-react-settings-form
# or
yarn add @thevikalp/designable-react-settings-form
```

## Overview

The settings form package provides:

- **SettingsForm** - Main form component for property editing
- **SchemaField** - Dynamic field renderer based on JSON schemas
- **Property Setters** - Specialized input components for different property types
- **Style Setters** - CSS property editors (colors, sizes, positions, etc.)
- **Form Effects** - Reactive form behaviors and validation
- **Registry System** - Component registration for the settings panel

## Core Components

### SettingsForm

The main form component that displays and edits properties of selected components.

```tsx
import { SettingsForm } from '@thevikalp/designable-react-settings-form';

function SettingsPanel() {
  return (
    <div className="settings-panel">
      <SettingsForm 
        title="Properties"
        uploadAction="/api/upload"
      />
    </div>
  );
}
```

**Props:**
- `title?: string` - Panel title
- `uploadAction?: string` - File upload endpoint
- `components?: Record<string, React.ComponentType>` - Custom form components

### SchemaField

Renders form fields based on JSON Schema definitions.

```tsx
import { SchemaField } from '@thevikalp/designable-react-settings-form';

const schema = {
  type: 'object',
  properties: {
    title: {
      type: 'string',
      'x-decorator': 'FormItem',
      'x-component': 'Input',
      'x-component-props': {
        placeholder: 'Enter title'
      }
    }
  }
};

<SchemaField schema={schema} />
```

## Property Setters

### Basic Input Components

#### InputItems

Dynamic array input for multiple values.

```tsx
// Used in schema definitions
{
  options: {
    type: 'array',
    'x-decorator': 'FormItem',
    'x-component': 'InputItems',
    'x-component-props': {
      placeholder: 'Add option'
    }
  }
}
```

#### ValueInput

Flexible input that adapts to different value types.

```tsx
{
  value: {
    type: 'string',
    'x-decorator': 'FormItem',
    'x-component': 'ValueInput',
    'x-component-props': {
      placeholder: 'Enter value'
    }
  }
}
```

#### PolyInput

Polymorphic input that changes type based on context.

```tsx
{
  expression: {
    type: 'string',
    'x-decorator': 'FormItem',
    'x-component': 'PolyInput',
    'x-component-props': {
      options: [
        { label: 'String', value: 'string' },
        { label: 'Number', value: 'number' },
        { label: 'Expression', value: 'expression' }
      ]
    }
  }
}
```

### Style Property Setters

#### ColorInput

Color picker input with palette support.

```tsx
{
  backgroundColor: {
    type: 'string',
    'x-decorator': 'FormItem',
    'x-component': 'ColorInput'
  }
}
```

#### SizeInput

Dimension input with unit selection.

```tsx
{
  width: {
    type: 'string',
    'x-decorator': 'FormItem',
    'x-component': 'SizeInput',
    'x-component-props': {
      units: ['px', '%', 'em', 'rem']
    }
  }
}
```

#### PositionInput

Position/coordinate input.

```tsx
{
  position: {
    type: 'object',
    'x-decorator': 'FormItem',
    'x-component': 'PositionInput'
  }
}
```

#### BoxStyleSetter

Combined box model properties (margin, padding, border).

```tsx
{
  boxStyle: {
    type: 'object',
    'x-decorator': 'FormItem',
    'x-component': 'BoxStyleSetter'
  }
}
```

#### BorderStyleSetter

Border properties (width, style, color, radius).

```tsx
{
  border: {
    type: 'object',
    'x-decorator': 'FormItem',
    'x-component': 'BorderStyleSetter'
  }
}
```

#### BorderRadiusStyleSetter

Border radius editor with visual preview.

```tsx
{
  borderRadius: {
    type: 'string',
    'x-decorator': 'FormItem',
    'x-component': 'BorderRadiusStyleSetter'
  }
}
```

#### BoxShadowStyleSetter

Box shadow properties with preview.

```tsx
{
  boxShadow: {
    type: 'string',
    'x-decorator': 'FormItem',
    'x-component': 'BoxShadowStyleSetter'
  }
}
```

#### BackgroundStyleSetter

Background properties (color, image, position).

```tsx
{
  background: {
    type: 'object',
    'x-decorator': 'FormItem',
    'x-component': 'BackgroundStyleSetter'
  }
}
```

#### FontStyleSetter

Typography properties (family, size, weight, style).

```tsx
{
  font: {
    type: 'object',
    'x-decorator': 'FormItem',
    'x-component': 'FontStyleSetter'
  }
}
```

#### DisplayStyleSetter

CSS display and layout properties.

```tsx
{
  display: {
    type: 'string',
    'x-decorator': 'FormItem',
    'x-component': 'DisplayStyleSetter'
  }
}
```

#### FlexStyleSetter

Flexbox layout properties.

```tsx
{
  flex: {
    type: 'object',
    'x-decorator': 'FormItem',
    'x-component': 'FlexStyleSetter'
  }
}
```

### Advanced Components

#### MonacoInput

Code editor using Monaco Editor (VS Code editor).

```tsx
{
  code: {
    type: 'string',
    'x-decorator': 'FormItem',
    'x-component': 'MonacoInput',
    'x-component-props': {
      language: 'javascript'
    }
  }
}
```

#### DrawerSetter

Collapsible drawer for complex property groups.

```tsx
{
  advanced: {
    type: 'object',
    'x-decorator': 'FormItem',
    'x-component': 'DrawerSetter',
    'x-component-props': {
      title: 'Advanced Settings'
    }
  }
}
```

#### FoldItem

Collapsible form item.

```tsx
{
  details: {
    type: 'object',
    'x-decorator': 'FoldItem',
    'x-component-props': {
      title: 'Details'
    }
  }
}
```

#### CollapseItem

Accordion-style collapsible item.

```tsx
{
  sections: {
    type: 'object',
    'x-decorator': 'CollapseItem',
    'x-component-props': {
      title: 'Sections'
    }
  }
}
```

## Form Effects

Reactive behaviors that respond to form changes.

```typescript
import { effectLocales, effectSnapshot } from '@thevikalp/designable-react-settings-form';

// Apply localization effects
effectLocales(node)(form);

// Create form snapshots for undo/redo
effectSnapshot(form);
```

## Registry System

Register custom property setters.

```typescript
import { registerSettingsFormComponent } from '@thevikalp/designable-react-settings-form';

// Register custom component
registerSettingsFormComponent('CustomSetter', CustomSetterComponent);
```

## Schema Definition

Define property schemas for components.

```typescript
const componentSchema = {
  type: 'object',
  properties: {
    // Basic properties
    title: {
      type: 'string',
      'x-decorator': 'FormItem',
      'x-component': 'Input',
      'x-component-props': {
        placeholder: 'Component title'
      }
    },

    // Style properties
    style: {
      type: 'object',
      'x-decorator': 'FormItem',
      'x-component': 'BoxStyleSetter'
    },

    // Array properties
    options: {
      type: 'array',
      'x-decorator': 'FormItem',
      'x-component': 'InputItems',
      items: {
        type: 'object',
        properties: {
          label: {
            type: 'string',
            'x-decorator': 'FormItem',
            'x-component': 'Input'
          },
          value: {
            type: 'string',
            'x-decorator': 'FormItem',
            'x-component': 'Input'
          }
        }
      }
    },

    // Conditional properties
    showAdvanced: {
      type: 'boolean',
      'x-decorator': 'FormItem',
      'x-component': 'Switch'
    },

    advancedSetting: {
      type: 'string',
      'x-decorator': 'FormItem',
      'x-component': 'Input',
      'x-reactions': {
        dependencies: ['showAdvanced'],
        fulfill: {
          state: {
            visible: '{{$deps[0]}}'
          }
        }
      }
    }
  }
};
```

## Usage Examples

### Basic Settings Panel

```tsx
import React from 'react';
import { SettingsForm } from '@thevikalp/designable-react-settings-form';
import { useSelectedNode } from '@thevikalp/designable-react';

function PropertiesPanel() {
  const node = useSelectedNode();
  
  if (!node) {
    return <div>No component selected</div>;
  }

  return (
    <div className="properties-panel">
      <h3>Properties</h3>
      <SettingsForm />
    </div>
  );
}
```

### Custom Property Setter

```tsx
import React from 'react';
import { Input } from 'antd';

const CustomColorSetter = (props) => {
  return (
    <div className="custom-color-setter">
      <Input 
        {...props} 
        type="color"
        onChange={(e) => props.onChange?.(e.target.value)}
      />
      <span>Selected: {props.value}</span>
    </div>
  );
};

// Register the custom setter
registerSettingsFormComponent('CustomColorSetter', CustomColorSetter);
```

### Complex Form Schema

```typescript
const formSchema = {
  type: 'object',
  properties: {
    // Basic info
    name: {
      type: 'string',
      'x-decorator': 'FormItem',
      'x-component': 'Input',
      'x-component-props': {
        placeholder: 'Form name'
      }
    },

    // Layout
    layout: {
      type: 'string',
      enum: ['horizontal', 'vertical', 'inline'],
      'x-decorator': 'FormItem',
      'x-component': 'Select',
      default: 'vertical'
    },

    // Styling
    styling: {
      type: 'object',
      'x-decorator': 'CollapseItem',
      'x-component-props': {
        title: 'Styling'
      },
      properties: {
        backgroundColor: {
          type: 'string',
          'x-decorator': 'FormItem',
          'x-component': 'ColorInput'
        },
        border: {
          type: 'object',
          'x-decorator': 'FormItem',
          'x-component': 'BorderStyleSetter'
        },
        spacing: {
          type: 'object',
          'x-decorator': 'FormItem',
          'x-component': 'BoxStyleSetter'
        }
      }
    },

    // Validation
    validation: {
      type: 'object',
      'x-decorator': 'CollapseItem',
      'x-component-props': {
        title: 'Validation'
      },
      properties: {
        required: {
          type: 'boolean',
          'x-decorator': 'FormItem',
          'x-component': 'Switch'
        },
        customRule: {
          type: 'string',
          'x-decorator': 'FormItem',
          'x-component': 'MonacoInput',
          'x-component-props': {
            language: 'javascript',
            height: 100
          }
        }
      }
    }
  }
};
```

## File Upload Support

The settings form supports file uploads through the `uploadAction` prop.

```tsx
<SettingsForm 
  uploadAction="/api/upload"
  onUploadSuccess={(response) => {
    console.log('Upload successful:', response);
  }}
  onUploadError={(error) => {
    console.error('Upload failed:', error);
  }}
/>
```

## Type Definitions

### ISettingFormProps

```typescript
interface ISettingFormProps {
  title?: string;
  uploadAction?: string;
  components?: Record<string, React.ComponentType>;
  effects?: (form: Form) => void;
}
```

### Component Registration

```typescript
function registerSettingsFormComponent(
  name: string, 
  component: React.ComponentType
): void;
```

## Dependencies

- `@thevikalp/designable-core` - Core functionality
- `@thevikalp/designable-react` - React components
- `@thevikalp/designable-shared` - Utilities
- `@formily/antd-v5` - Formily Ant Design integration
- `@formily/core` - Formily core
- `@formily/react` - Formily React bindings
- `antd` - Ant Design components
- `@monaco-editor/react` - Monaco editor integration

## Contributing

When contributing to the settings form package:

1. Follow Formily schema conventions
2. Add TypeScript types for new components
3. Include proper form validation
4. Test component interactions
5. Document property setter usage

## License

UNLICENSED