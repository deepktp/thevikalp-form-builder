# @thevikalp/designable-formily-setters

[![NPM version](https://img.shields.io/npm/v/@thevikalp/designable-formily-setters.svg?style=flat)](https://npmjs.org/package/@thevikalp/designable-formily-setters)
[![NPM downloads](http://img.shields.io/npm/dm/@thevikalp/designable-formily-setters.svg?style=flat)](https://npmjs.org/package/@thevikalp/designable-formily-setters)

The Formily Setters package provides specialized property setter components for configuring form fields in the Triones Designable settings panel. These setters handle complex configurations like data sources, validation rules, and reactive behaviors.

## Installation

```bash
npm install @thevikalp/designable-formily-setters
# or
yarn add @thevikalp/designable-formily-setters
```

## Overview

The formily-setters package provides:

- **DataSourceSetter** - Configure options for select, radio, checkbox fields
- **ValidatorSetter** - Set up validation rules for form fields
- **ReactionsSetter** - Configure reactive behaviors and conditional logic
- **Property Editors** - Specialized editors for complex field properties
- **Form Effects** - Reactive form behaviors and side effects

## DataSourceSetter

Configures data sources for selection components (Select, Radio, Checkbox, etc.).

```tsx
import { DataSourceSetter } from '@thevikalp/designable-formily-setters';

// In schema
{
  options: {
    type: 'array',
    'x-decorator': 'FormItem',
    'x-component': 'DataSourceSetter',
    'x-component-props': {
      allowTree: false, // Allow hierarchical data
      allowExtendOption: true, // Allow custom options
      defaultOptionValue: [
        { label: 'Option 1', value: 'opt1' },
        { label: 'Option 2', value: 'opt2' }
      ]
    }
  }
}
```

### Data Source Types

#### Flat Array

```typescript
const dataSource = [
  { label: 'Apple', value: 'apple' },
  { label: 'Banana', value: 'banana' },
  { label: 'Orange', value: 'orange' }
];
```

#### Tree Structure

```typescript
const treeDataSource = [
  {
    label: 'Fruits',
    value: 'fruits',
    children: [
      { label: 'Apple', value: 'apple' },
      { label: 'Banana', value: 'banana' }
    ]
  },
  {
    label: 'Vegetables',
    value: 'vegetables',
    children: [
      { label: 'Carrot', value: 'carrot' },
      { label: 'Broccoli', value: 'broccoli' }
    ]
  }
];
```

### Props

```typescript
interface IDataSourceSetterProps {
  className?: string;
  style?: React.CSSProperties;
  onChange: (dataSource: IDataSourceItem[]) => void;
  value: IDataSourceItem[];
  allowTree?: boolean; // Enable tree structure
  allowExtendOption?: boolean; // Allow adding custom options
  defaultOptionValue?: Array<{ label: string; value: any }>;
  effects?: (form: Form) => void;
}
```

## ValidatorSetter

Configures validation rules for form fields.

```tsx
import { ValidatorSetter } from '@thevikalp/designable-formily-setters';

// In schema
{
  validation: {
    type: 'array',
    'x-decorator': 'FormItem',
    'x-component': 'ValidatorSetter'
  }
}
```

### Built-in Validators

- **Required** - Field must have a value
- **Pattern** - Regular expression validation
- **Length** - String/array length validation
- **Range** - Numeric range validation
- **Custom** - Custom validation function

### Validation Rules

```typescript
const validationRules = [
  {
    required: true,
    message: 'This field is required'
  },
  {
    pattern: /^[a-zA-Z0-9]+$/,
    message: 'Only alphanumeric characters allowed'
  },
  {
    min: 5,
    max: 100,
    message: 'Value must be between 5 and 100'
  },
  {
    validator: (value) => {
      // Custom validation logic
      return value > 0;
    },
    message: 'Value must be positive'
  }
];
```

## ReactionsSetter

Configures reactive behaviors and conditional field logic.

```tsx
import { ReactionsSetter } from '@thevikalp/designable-formily-setters';

// In schema
{
  reactions: {
    type: 'array',
    'x-decorator': 'FormItem',
    'x-component': 'ReactionsSetter'
  }
}
```

### Reaction Types

#### Field Dependencies

```typescript
{
  dependencies: ['fieldA', 'fieldB'],
  fulfill: {
    state: {
      visible: '{{$deps[0] === "show"}}',
      value: '{{$deps[1]}}'
    }
  }
}
```

#### Conditional Logic

```typescript
{
  when: '{{$self.value === "option1"}}',
  fulfill: {
    state: {
      visible: true
    }
  },
  otherwise: {
    state: {
      visible: false
    }
  }
}
```

#### Async Reactions

```typescript
{
  dependencies: ['country'],
  fulfill: {
    run: '$effect(async () => { /* async logic */ })'
  }
}
```

## Advanced Setters

### MonacoInput

Code editor for custom validation functions and expressions.

```tsx
import { MonacoInput } from '@thevikalp/designable-formily-setters';

// In schema
{
  customValidator: {
    type: 'string',
    'x-decorator': 'FormItem',
    'x-component': 'MonacoInput',
    'x-component-props': {
      language: 'javascript',
      height: 200
    }
  }
}
```

### PolyInput

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

## Usage in Settings Form

### Integrating with SettingsForm

```tsx
import { SettingsForm } from '@thevikalp/designable-react-settings-form';
import * as setters from '@thevikalp/designable-formily-setters';

// Register setters
const components = {
  ...setters,
  // Other components
};

function PropertyPanel() {
  return (
    <SettingsForm components={components} />
  );
}
```

### Custom Setter Creation

```tsx
import React from 'react';
import { connect, mapProps } from '@formily/react';

const CustomSetter = connect(
  (props) => (
    <div className="custom-setter">
      <input 
        {...props}
        onChange={(e) => props.onChange?.(e.target.value)}
      />
    </div>
  ),
  mapProps((props, field) => ({
    ...props,
    value: field.value,
  }))
);

export { CustomSetter };
```

## Schema Integration

### Field Configuration Schema

```typescript
const fieldSchema = {
  type: 'object',
  properties: {
    // Basic properties
    title: {
      type: 'string',
      'x-decorator': 'FormItem',
      'x-component': 'Input'
    },

    // Data source for selection fields
    options: {
      type: 'array',
      'x-decorator': 'FormItem',
      'x-component': 'DataSourceSetter'
    },

    // Validation rules
    'x-validator': {
      type: 'array',
      'x-decorator': 'FormItem',
      'x-component': 'ValidatorSetter'
    },

    // Reactive behaviors
    'x-reactions': {
      type: 'array',
      'x-decorator': 'FormItem',
      'x-component': 'ReactionsSetter'
    }
  }
};
```

## Form Effects

Reactive behaviors that respond to form changes.

```typescript
import { effectLocales, effectSnapshot } from '@thevikalp/designable-formily-setters';

// Apply localization effects
effectLocales(form);

// Create form snapshots for undo/redo
effectSnapshot(form);
```

## Localization

Setters support multiple languages.

```typescript
// locales/en-US.ts
export const enUS = {
  DataSourceSetter: {
    title: 'Data Source',
    addOption: 'Add Option',
    editOption: 'Edit Option',
    removeOption: 'Remove Option'
  },
  ValidatorSetter: {
    title: 'Validation Rules',
    addRule: 'Add Rule',
    required: 'Required',
    pattern: 'Pattern'
  }
};
```

## Advanced Usage

### Custom Validation Rules

```typescript
// Register custom validator
const customValidators = {
  phone: {
    validator: (value) => /^[\d\s\-\+\(\)]+$/.test(value),
    message: 'Invalid phone number format'
  },
  email: {
    validator: (value) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value),
    message: 'Invalid email format'
  }
};
```

### Complex Reactions

```typescript
{
  'x-reactions': [
    {
      dependencies: ['fieldA', 'fieldB'],
      fulfill: {
        state: {
          visible: '{{$deps[0] && $deps[1]}}',
          required: '{{$deps[0] === "required"}}',
          value: '{{$deps[0] === $deps[1] ? $deps[0] : undefined}}'
        }
      }
    },
    {
      when: '{{$self.value > 100}}',
      fulfill: {
        state: {
          description: 'Value is high'
        }
      }
    }
  ]
}
```

### Dynamic Data Sources

```typescript
{
  options: {
    type: 'array',
    'x-decorator': 'FormItem',
    'x-component': 'DataSourceSetter',
    'x-reactions': [
      {
        dependencies: ['category'],
        fulfill: {
          run: '$effect(async () => { /* Load options based on category */ })'
        }
      }
    ]
  }
}
```

## Type Definitions

### IDataSourceItem

```typescript
interface IDataSourceItem {
  label: string;
  value: any;
  children?: IDataSourceItem[];
  disabled?: boolean;
}
```

### IValidatorRule

```typescript
interface IValidatorRule {
  required?: boolean;
  pattern?: string | RegExp;
  min?: number;
  max?: number;
  len?: number;
  validator?: (value: any) => boolean;
  message?: string;
}
```

### IReaction

```typescript
interface IReaction {
  dependencies?: string[];
  when?: string;
  fulfill?: {
    state?: Record<string, any>;
    run?: string;
  };
  otherwise?: {
    state?: Record<string, any>;
  };
}
```

## Dependencies

- `@thevikalp/designable-core` - Core functionality
- `@thevikalp/designable-react` - React components
- `@thevikalp/designable-react-settings-form` - Settings form
- `@thevikalp/designable-shared` - Utilities
- `@formily/antd-v5` - Formily Ant Design integration
- `@formily/core` - Formily core
- `@formily/react` - Formily React bindings
- `@formily/reactive` - Reactive state
- `@formily/reactive-react` - Reactive React bindings
- `@monaco-editor/react` - Monaco editor
- `antd` - Ant Design components

## Contributing

When contributing to the formily-setters package:

1. Follow Formily patterns for setters
2. Add comprehensive TypeScript types
3. Include validation for setter inputs
4. Test reactive behaviors
5. Document complex setter configurations

## License

UNLICENSED