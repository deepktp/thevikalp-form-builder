# @thevikalp/designable-formily-antd

[![NPM version](https://img.shields.io/npm/v/@thevikalp/designable-formily-antd.svg?style=flat)](https://npmjs.org/package/@thevikalp/designable-formily-antd)
[![NPM downloads](http://img.shields.io/npm/dm/@thevikalp/designable-formily-antd.svg?style=flat)](https://npmjs.org/package/@thevikalp/designable-formily-antd)

The Formily Antd package provides Formily-compatible form components based on Ant Design. It includes all the form fields and layout components needed to build dynamic forms in the Triones Designable system.

## Installation

```bash
npm install @thevikalp/designable-formily-antd
# or
yarn add @thevikalp/designable-formily-antd
```

## Overview

The formily-antd package provides:

- **Form Components** - All Ant Design form fields wrapped for Formily
- **Layout Components** - Form grids, cards, spaces for layout
- **Array Components** - Dynamic arrays with cards and tables
- **Schema Definitions** - JSON schemas for each component
- **Localization** - Multi-language support
- **Designer Integration** - Behaviors and resources for the designer

## Form Components

### Basic Fields

#### Input

Single-line text input field.

```tsx
import { Input } from '@thevikalp/designable-formily-antd';

// In schema
{
  name: {
    type: 'string',
    'x-decorator': 'FormItem',
    'x-component': 'Input',
    'x-component-props': {
      placeholder: 'Enter your name',
      maxLength: 50
    }
  }
}
```

#### Password

Password input with masking.

```tsx
{
  password: {
    type: 'string',
    'x-decorator': 'FormItem',
    'x-component': 'Password',
    'x-component-props': {
      placeholder: 'Enter password'
    }
  }
}
```

#### NumberPicker

Numeric input with increment/decrement controls.

```tsx
{
  age: {
    type: 'number',
    'x-decorator': 'FormItem',
    'x-component': 'NumberPicker',
    'x-component-props': {
      min: 0,
      max: 120,
      step: 1
    }
  }
}
```

### Selection Fields

#### Select

Dropdown selection component.

```tsx
{
  department: {
    type: 'string',
    'x-decorator': 'FormItem',
    'x-component': 'Select',
    'x-component-props': {
      placeholder: 'Select department',
      mode: 'multiple' // or 'tags'
    },
    enum: [
      { label: 'Engineering', value: 'eng' },
      { label: 'Marketing', value: 'mkt' },
      { label: 'Sales', value: 'sales' }
    ]
  }
}
```

#### Radio

Radio button group for single selection.

```tsx
{
  gender: {
    type: 'string',
    'x-decorator': 'FormItem',
    'x-component': 'Radio.Group',
    enum: [
      { label: 'Male', value: 'male' },
      { label: 'Female', value: 'female' }
    ]
  }
}
```

#### Checkbox

Checkbox group for multiple selection.

```tsx
{
  interests: {
    type: 'array',
    'x-decorator': 'FormItem',
    'x-component': 'Checkbox.Group',
    enum: [
      { label: 'Sports', value: 'sports' },
      { label: 'Music', value: 'music' },
      { label: 'Reading', value: 'reading' }
    ]
  }
}
```

#### Switch

Boolean toggle switch.

```tsx
{
  newsletter: {
    type: 'boolean',
    'x-decorator': 'FormItem',
    'x-component': 'Switch',
    'x-component-props': {
      checkedChildren: 'Yes',
      unCheckedChildren: 'No'
    }
  }
}
```

#### Slider

Numeric range slider.

```tsx
{
  volume: {
    type: 'number',
    'x-decorator': 'FormItem',
    'x-component': 'Slider',
    'x-component-props': {
      min: 0,
      max: 100,
      step: 1,
      range: false
    }
  }
}
```

#### Rate

Star rating component.

```tsx
{
  rating: {
    type: 'number',
    'x-decorator': 'FormItem',
    'x-component': 'Rate',
    'x-component-props': {
      count: 5,
      allowHalf: true
    }
  }
}
```

### Date and Time Fields

#### DatePicker

Date selection component.

```tsx
{
  birthDate: {
    type: 'string',
    'x-decorator': 'FormItem',
    'x-component': 'DatePicker',
    'x-component-props': {
      format: 'YYYY-MM-DD',
      picker: 'date' // 'date', 'week', 'month', 'quarter', 'year'
    }
  }
}
```

#### TimePicker

Time selection component.

```tsx
{
  meetingTime: {
    type: 'string',
    'x-decorator': 'FormItem',
    'x-component': 'TimePicker',
    'x-component-props': {
      format: 'HH:mm:ss'
    }
  }
}
```

### Advanced Fields

#### Cascader

Hierarchical selection with cascading options.

```tsx
{
  location: {
    type: 'array',
    'x-decorator': 'FormItem',
    'x-component': 'Cascader',
    'x-component-props': {
      placeholder: 'Select location'
    },
    enum: [
      {
        value: 'zhejiang',
        label: 'Zhejiang',
        children: [
          {
            value: 'hangzhou',
            label: 'Hangzhou',
            children: [
              { value: 'xihu', label: 'West Lake' }
            ]
          }
        ]
      }
    ]
  }
}
```

#### TreeSelect

Tree-structured selection.

```tsx
{
  category: {
    type: 'string',
    'x-decorator': 'FormItem',
    'x-component': 'TreeSelect',
    'x-component-props': {
      placeholder: 'Select category',
      multiple: true,
      treeData: [
        {
          title: 'Electronics',
          value: 'electronics',
          children: [
            { title: 'Phones', value: 'phones' },
            { title: 'Laptops', value: 'laptops' }
          ]
        }
      ]
    }
  }
}
```

#### Transfer

Data transfer between two lists.

```tsx
{
  permissions: {
    type: 'array',
    'x-decorator': 'FormItem',
    'x-component': 'Transfer',
    'x-component-props': {
      titles: ['Available', 'Selected'],
      dataSource: [
        { key: '1', title: 'Read' },
        { key: '2', title: 'Write' },
        { key: '3', title: 'Delete' }
      ]
    }
  }
}
```

#### Upload

File upload component.

```tsx
{
  attachments: {
    type: 'array',
    'x-decorator': 'FormItem',
    'x-component': 'Upload',
    'x-component-props': {
      action: '/api/upload',
      listType: 'text', // 'text', 'picture', 'picture-card'
      maxCount: 5,
      accept: '.jpg,.png,.pdf'
    }
  }
}
```

### Layout Components

#### Card

Content container with header and body.

```tsx
{
  personalInfo: {
    type: 'void',
    'x-component': 'Card',
    'x-component-props': {
      title: 'Personal Information'
    },
    properties: {
      // Nested fields
    }
  }
}
```

#### FormGrid

Responsive grid layout for form fields.

```tsx
{
  contactInfo: {
    type: 'void',
    'x-component': 'FormGrid',
    'x-component-props': {
      columns: 2,
      columnGap: 16,
      rowGap: 16
    },
    properties: {
      firstName: { /* field */ },
      lastName: { /* field */ },
      email: { /* field */ },
      phone: { /* field */ }
    }
  }
}
```

#### Space

Spacing container for child elements.

```tsx
{
  actions: {
    type: 'void',
    'x-component': 'Space',
    'x-component-props': {
      direction: 'horizontal', // 'horizontal' | 'vertical'
      size: 'middle' // 'small' | 'middle' | 'large' | number
    },
    properties: {
      submit: { /* button */ },
      cancel: { /* button */ }
    }
  }
}
```

### Array Components

#### ArrayCards

Dynamic array with card-based items.

```tsx
{
  experiences: {
    type: 'array',
    'x-decorator': 'FormItem',
    'x-component': 'ArrayCards',
    'x-component-props': {
      title: 'Work Experience'
    },
    items: {
      type: 'object',
      properties: {
        company: {
          type: 'string',
          'x-decorator': 'FormItem',
          'x-component': 'Input',
          'x-component-props': {
            placeholder: 'Company name'
          }
        },
        position: {
          type: 'string',
          'x-decorator': 'FormItem',
          'x-component': 'Input',
          'x-component-props': {
            placeholder: 'Position'
          }
        }
      }
    }
  }
}
```

#### ArrayTable

Dynamic array with table-based layout.

```tsx
{
  products: {
    type: 'array',
    'x-decorator': 'FormItem',
    'x-component': 'ArrayTable',
    'x-component-props': {
      title: 'Products'
    },
    items: {
      type: 'object',
      properties: {
        name: {
          type: 'string',
          'x-decorator': 'FormItem',
          'x-component': 'Input'
        },
        price: {
          type: 'number',
          'x-decorator': 'FormItem',
          'x-component': 'NumberPicker'
        },
        quantity: {
          type: 'number',
          'x-decorator': 'FormItem',
          'x-component': 'NumberPicker'
        }
      }
    }
  }
}
```

## Form Components

### Form

Root form component.

```tsx
import { Form } from '@thevikalp/designable-formily-antd';

{
  form: {
    type: 'object',
    'x-component': 'Form',
    'x-component-props': {
      layout: 'vertical', // 'horizontal' | 'vertical' | 'inline'
      labelCol: { span: 6 },
      wrapperCol: { span: 18 }
    },
    properties: {
      // Form fields
    }
  }
}
```

### Field

Generic field wrapper.

```tsx
{
  customField: {
    type: 'string',
    'x-decorator': 'FormItem',
    'x-component': 'Field',
    'x-component-props': {
      component: [CustomInput] // Custom component
    }
  }
}
```

## Schema Definitions

Each component has a corresponding schema file that defines its configuration.

```typescript
// schemas/Input.ts
export const Input = {
  type: 'object',
  properties: {
    title: {
      type: 'string',
      'x-decorator': 'FormItem',
      'x-component': 'Input',
      'x-component-props': {
        placeholder: 'Field Title'
      }
    },
    placeholder: {
      type: 'string',
      'x-decorator': 'FormItem',
      'x-component': 'Input'
    },
    required: {
      type: 'boolean',
      'x-decorator': 'FormItem',
      'x-component': 'Switch'
    },
    maxLength: {
      type: 'number',
      'x-decorator': 'FormItem',
      'x-component': 'NumberPicker'
    }
  }
};
```

## Designer Integration

### Component Behaviors

Each component registers behaviors for the designer.

```typescript
Input.Behavior = createBehavior({
  name: 'Input',
  extends: ['Field'],
  selector: (node) => node.props['x-component'] === 'Input',
  designerProps: {
    droppable: false,
    propsSchema: createFieldSchema(InputSchema)
  }
});
```

### Component Resources

Components register as resources in the designer.

```typescript
Input.Resource = createResource({
  icon: 'InputSource',
  elements: [
    {
      componentName: 'Field',
      props: {
        type: 'string',
        'x-component': 'Input'
      }
    }
  ]
});
```

## Localization

Components support multiple languages.

```typescript
// locales/en-US.ts
export const enUS = {
  Input: {
    title: 'Input',
    settings: {
      title: 'Title',
      placeholder: 'Placeholder',
      required: 'Required'
    }
  }
};
```

## Usage in Designer

### Registering Components

```tsx
import { GlobalRegistry } from '@thevikalp/designable-core';
import * as Components from '@thevikalp/designable-formily-antd';

// Register all components
Object.keys(Components).forEach(key => {
  const Component = Components[key];
  if (Component.Behavior) {
    GlobalRegistry.registerDesignerBehaviors(Component.Behavior);
  }
  if (Component.Resource) {
    // Register resources
  }
});
```

### Using in Forms

```tsx
import { createForm } from '@formily/core';
import { createSchemaField } from '@formily/react';
import * as components from '@thevikalp/designable-formily-antd';

const SchemaField = createSchemaField({
  components: {
    ...components,
    // Add custom components
  }
});

const form = createForm();

function MyForm() {
  return (
    <Form form={form}>
      <SchemaField schema={mySchema} />
    </Form>
  );
}
```

## Advanced Usage

### Custom Component Creation

```tsx
import { connect, mapProps } from '@formily/react';
import { Input as AntdInput } from 'antd';

export const CustomInput = connect(
  AntdInput,
  mapProps(
    (props, field) => ({
      ...props,
      placeholder: field.placeholder,
    }),
    (props, field) => ({
      ...props,
      onChange: field.onChange,
      value: field.value,
    })
  )
);

CustomInput.displayName = 'CustomInput';
```

### Extending Components

```typescript
// Extend existing component
export const ExtendedInput = connect(
  AntdInput,
  mapProps(
    (props, field) => ({
      ...props,
      addonBefore: field.addonBefore,
      addonAfter: field.addonAfter,
    }),
    (props, field) => ({
      ...props,
      onChange: field.onChange,
      value: field.value,
    })
  )
);
```

## Component Categories

| Category | Components |
|----------|------------|
| Basic | Input, Password, NumberPicker, Text |
| Selection | Select, Radio, Checkbox, Switch, Slider, Rate |
| Date/Time | DatePicker, TimePicker |
| Advanced | Cascader, TreeSelect, Transfer, Upload |
| Layout | Card, FormGrid, Space |
| Array | ArrayCards, ArrayTable |
| Form | Form, Field |

## Dependencies

- `@formily/antd-v5` - Formily Ant Design integration
- `@formily/core` - Formily core
- `@formily/json-schema` - Schema handling
- `@formily/react` - React bindings
- `@formily/reactive-react` - Reactive React bindings
- `@thevikalp/designable-core` - Designer core
- `@thevikalp/designable-formily-setters` - Property setters
- `@thevikalp/designable-formily-transformer` - Schema transformation
- `@thevikalp/designable-react` - React components
- `@thevikalp/designable-shared` - Utilities
- `antd` - Ant Design components

## Contributing

When contributing to the formily-antd package:

1. Follow Formily component patterns
2. Add comprehensive schemas
3. Include localization strings
4. Register designer behaviors
5. Test component rendering
6. Document component props

## License

UNLICENSED