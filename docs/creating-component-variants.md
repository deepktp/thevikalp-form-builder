# Creating Components with Multiple Variants

This guide explains how to create form components that support multiple variants or display modes, like the Upload component which supports 'text', 'picture', and 'picture-card' list types.

## Understanding Variant Patterns

Triones Designable supports several approaches for component variants:

### 1. Property-Based Variants
Single component with a property that controls different display modes (e.g., Upload's `listType`)

### 2. Separate Component Variants
Multiple related components with different names (e.g., `Upload` and `Upload.Dragger`)

### 3. Configuration Variants
Same component with different configuration options (e.g., Select with `mode` property)

### 4. Behavior Variants
Different behaviors for the same component based on selectors

## Method 1: Property-Based Variants

Best for components that have different visual styles but similar functionality.

### Example: Upload Component Variants

The Upload component uses the `listType` property to control three variants:

```typescript
// In schemas/Upload.ts
export const Upload: ISchema = {
  type: 'object',
  properties: {
    // ... other properties
    listType: {
      enum: ['text', 'picture', 'picture-card'],
      'x-decorator': 'FormItem',
      'x-component': 'Radio.Group',
      'x-component-props': {
        defaultValue: 'text',
        optionType: 'button',
      },
    },
    // ... more properties
  },
};
```

### Step-by-Step Implementation

#### Step 1: Define Variant Property in Schema

```typescript
// schemas/MyComponent.ts
export const MyComponent: ISchema = {
  type: 'object',
  properties: {
    // Basic properties
    title: {
      type: 'string',
      'x-decorator': 'FormItem',
      'x-component': 'Input',
    },

    // Variant selector
    variant: {
      type: 'string',
      enum: ['basic', 'advanced', 'compact'],
      'x-decorator': 'FormItem',
      'x-component': 'Radio.Group',
      'x-component-props': {
        defaultValue: 'basic',
        optionType: 'button',
      },
    },

    // Variant-specific properties
    showIcon: {
      type: 'boolean',
      'x-decorator': 'FormItem',
      'x-component': 'Switch',
      'x-reactions': {
        dependencies: ['variant'],
        fulfill: {
          state: {
            visible: '{{$deps[0] === "advanced"}}',
          },
        },
      },
    },

    compactMode: {
      type: 'boolean',
      'x-decorator': 'FormItem',
      'x-component': 'Switch',
      'x-reactions': {
        dependencies: ['variant'],
        fulfill: {
          state: {
            visible: '{{$deps[0] === "compact"}}',
          },
        },
      },
    },
  },
};
```

#### Step 2: Handle Variants in Component

```tsx
// components/MyComponent/preview.tsx
export const MyComponent: DnFC<ComponentProps> = (props) => {
  const { variant = 'basic', showIcon, compactMode, ...otherProps } = props;

  // Render different variants
  switch (variant) {
    case 'advanced':
      return (
        <div className="my-component advanced">
          {showIcon && <Icon type="advanced" />}
          <AntdComponent {...otherProps} />
        </div>
      );

    case 'compact':
      return (
        <div className={`my-component compact ${compactMode ? 'ultra-compact' : ''}`}>
          <AntdComponent size="small" {...otherProps} />
        </div>
      );

    case 'basic':
    default:
      return (
        <div className="my-component basic">
          <AntdComponent {...otherProps} />
        </div>
      );
  }
};
```

#### Step 3: Single Behavior Definition

```typescript
MyComponent.Behavior = createBehavior({
  name: 'MyComponent',
  extends: ['Field'],
  selector: (node) => node.props['x-component'] === 'MyComponent',
  designerProps: {
    propsSchema: createFieldSchema(AllSchemas.MyComponent),
  },
  designerLocales: AllLocales.MyComponent,
});
```

#### Step 4: Single Resource Definition

```typescript
MyComponent.Resource = createResource({
  icon: 'MyComponentSource',
  elements: [
    {
      componentName: 'Field',
      props: {
        type: 'string',
        'x-component': 'MyComponent',
        'x-component-props': {
          variant: 'basic', // Default variant
        },
      },
    },
  ],
});
```

## Method 2: Separate Component Variants

Best for components that are fundamentally different but related.

### Example: Upload and Upload.Dragger

```typescript
// components/Upload/preview.tsx
export const Upload: DnFC<React.ComponentProps<typeof FormilyUpload>> = FormilyUpload;

Upload.Behavior = createBehavior(
  {
    name: 'Upload',
    extends: ['Field'],
    selector: (node) => node.props['x-component'] === 'Upload',
    designerProps: {
      propsSchema: createFieldSchema(AllSchemas.Upload),
    },
    designerLocales: AllLocales.Upload,
  },
  {
    name: 'Upload.Dragger',
    extends: ['Field'],
    selector: (node) => node.props['x-component'] === 'Upload.Dragger',
    designerProps: {
      propsSchema: createFieldSchema(AllSchemas.Upload.Dragger),
    },
    designerLocales: AllLocales.UploadDragger,
  },
);

Upload.Resource = createResource(
  {
    icon: 'UploadSource',
    elements: [
      {
        componentName: 'Field',
        props: {
          type: 'Array<object>',
          'x-component': 'Upload',
          'x-component-props': {
            listType: 'text',
          },
        },
      },
    ],
  },
  {
    icon: 'UploadDraggerSource',
    elements: [
      {
        componentName: 'Field',
        props: {
          type: 'Array<object>',
          'x-component': 'Upload.Dragger',
          'x-component-props': {
            listType: 'text',
          },
        },
      },
    ],
  },
);
```

### Step-by-Step Implementation

#### Step 1: Create Multiple Component Definitions

```typescript
// components/MyComponent/index.ts
export * from './BasicVariant';
export * from './AdvancedVariant';
```

#### Step 2: Define Each Variant

```tsx
// components/MyComponent/BasicVariant.tsx
export const BasicVariant: DnFC<ComponentProps> = (props) => {
  return (
    <div className="my-component basic-variant">
      <AntdComponent {...props} />
    </div>
  );
};

BasicVariant.Behavior = createBehavior({
  name: 'MyComponent.Basic',
  extends: ['Field'],
  selector: (node) => node.props['x-component'] === 'MyComponent.Basic',
  designerProps: {
    propsSchema: createFieldSchema(AllSchemas.MyComponent.Basic),
  },
});

BasicVariant.Resource = createResource({
  icon: 'BasicVariantSource',
  elements: [
    {
      componentName: 'Field',
      props: {
        type: 'string',
        'x-component': 'MyComponent.Basic',
      },
    },
  ],
});
```

#### Step 3: Define Schema for Each Variant

```typescript
// schemas/MyComponent.ts
export const MyComponent: ISchema & {
  Basic?: ISchema;
  Advanced?: ISchema;
} = {
  // Base schema (if needed)
};

MyComponent.Basic = {
  type: 'object',
  properties: {
    // Basic variant specific properties
    simpleMode: {
      type: 'boolean',
      'x-decorator': 'FormItem',
      'x-component': 'Switch',
    },
  },
};

MyComponent.Advanced = {
  type: 'object',
  properties: {
    // Advanced variant specific properties
    complexConfig: {
      type: 'object',
      'x-decorator': 'FormItem',
      'x-component': 'Card',
      properties: {
        option1: { /* ... */ },
        option2: { /* ... */ },
      },
    },
  },
};
```

## Method 3: Configuration Variants

Best for components that change behavior based on configuration.

### Example: Select Component Modes

```typescript
// schemas/Select.ts
export const Select: ISchema = {
  type: 'object',
  properties: {
    mode: {
      type: 'string',
      enum: ['multiple', 'tags', null],
      'x-decorator': 'FormItem',
      'x-component': 'Radio.Group',
      'x-component-props': {
        defaultValue: null,
        optionType: 'button',
      },
    },
    // ... other properties
  },
};
```

### Step-by-Step Implementation

#### Step 1: Add Configuration Property

```typescript
export const MyComponent: ISchema = {
  type: 'object',
  properties: {
    displayMode: {
      type: 'string',
      enum: ['inline', 'block', 'floating'],
      'x-decorator': 'FormItem',
      'x-component': 'Select',
      'x-component-props': {
        defaultValue: 'inline',
      },
    },
    // Conditional properties based on displayMode
    inlineSpacing: {
      type: 'number',
      'x-decorator': 'FormItem',
      'x-component': 'NumberPicker',
      'x-reactions': {
        dependencies: ['displayMode'],
        fulfill: {
          state: {
            visible: '{{$deps[0] === "inline"}}',
          },
        },
      },
    },
  },
};
```

#### Step 2: Handle Configuration in Component

```tsx
export const MyComponent: DnFC<ComponentProps> = (props) => {
  const { displayMode = 'inline', inlineSpacing, ...otherProps } = props;

  const className = `my-component ${displayMode}`;
  const style = displayMode === 'inline' ? { marginRight: inlineSpacing } : {};

  return (
    <div className={className} style={style}>
      <AntdComponent {...otherProps} />
    </div>
  );
};
```

## Method 4: Behavior Variants

Best for components that need different designer behaviors.

### Step-by-Step Implementation

#### Step 1: Define Multiple Behaviors

```typescript
MyComponent.Behavior = createBehavior(
  {
    name: 'MyComponent.Default',
    extends: ['Field'],
    selector: (node) => node.props['x-component'] === 'MyComponent' &&
                       !node.props['x-component-props']?.specialMode,
    designerProps: {
      propsSchema: createFieldSchema(AllSchemas.MyComponent.Default),
    },
  },
  {
    name: 'MyComponent.Special',
    extends: ['Field'],
    selector: (node) => node.props['x-component'] === 'MyComponent' &&
                       node.props['x-component-props']?.specialMode,
    designerProps: {
      propsSchema: createFieldSchema(AllSchemas.MyComponent.Special),
      // Different designer properties
      droppable: true,
      resizable: true,
    },
  },
);
```

#### Step 2: Single Component with Conditional Logic

```tsx
export const MyComponent: DnFC<ComponentProps> = (props) => {
  const { specialMode, ...otherProps } = props;

  if (specialMode) {
    return <SpecialModeComponent {...otherProps} />;
  }

  return <DefaultModeComponent {...otherProps} />;
};
```

## Advanced Patterns

### Dynamic Variant Loading

```typescript
// Lazy load variants
const VariantComponents = {
  basic: lazy(() => import('./variants/BasicVariant')),
  advanced: lazy(() => import('./variants/AdvancedVariant')),
};

export const MyComponent: DnFC<ComponentProps> = (props) => {
  const { variant = 'basic' } = props;
  const VariantComponent = VariantComponents[variant];

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <VariantComponent {...props} />
    </Suspense>
  );
};
```

### Variant Inheritance

```typescript
// Base schema with common properties
const BaseSchema = {
  type: 'object',
  properties: {
    title: { /* common property */ },
    required: { /* common property */ },
  },
};

// Extend for specific variants
MyComponent.Basic = {
  ...BaseSchema,
  properties: {
    ...BaseSchema.properties,
    basicOnlyProp: { /* basic specific */ },
  },
};

MyComponent.Advanced = {
  ...BaseSchema,
  properties: {
    ...BaseSchema.properties,
    advancedOnlyProp: { /* advanced specific */ },
  },
};
```

### Variant Validation

```typescript
// Add validation based on variant
MyComponent.Basic = {
  type: 'object',
  properties: {
    // ... properties
  },
  // Add custom validation
  'x-validator': (value, rule, ctx) => {
    if (ctx.field.componentProps.variant === 'basic') {
      // Basic variant validation
      return value.length > 0;
    }
    return true;
  },
};
```

## Best Practices

### 1. Clear Variant Naming
- Use descriptive names: `Upload.Dragger` vs `UploadDrag`
- Follow consistent patterns: `Component.Variant` or `ComponentVariant`

### 2. Schema Organization
- Group variant-specific properties logically
- Use reactions to show/hide conditional properties
- Provide sensible defaults for each variant

### 3. Component Structure
- Keep variant logic contained within the component
- Use CSS classes for styling variants: `component--variant-basic`
- Avoid deep nesting of variant conditions

### 4. Resource Management
- Create separate resources for distinct variants
- Use different icons to distinguish variants
- Provide appropriate default props for each variant

### 5. Documentation
- Document the differences between variants
- Provide usage examples for each variant
- Explain when to use each variant

## Examples from the Codebase

### Upload Component (Property-based)
- **Variants**: text, picture, picture-card
- **Control**: `listType` property
- **Single component**: `Upload`
- **Single behavior**: `Upload`

### Radio Component (Separate components)
- **Variants**: `Radio` and `Radio.Group`
- **Separate schemas**: `Radio` and `Radio.Group`
- **Separate behaviors**: `Radio` and `Radio.Group`

### Select Component (Configuration-based)
- **Variants**: single, multiple, tags
- **Control**: `mode` property
- **Single component**: `Select`
- **Conditional properties**: based on mode

## Choosing the Right Pattern

### Use Property-Based Variants When:
- Variants are visual/style differences
- Same underlying functionality
- Need to switch variants dynamically
- Few variant-specific properties

### Use Separate Components When:
- Variants have significantly different APIs
- Different use cases or contexts
- Variants need different behaviors
- Complex variant-specific logic

### Use Configuration Variants When:
- Variants are controlled by a single property
- Many conditional properties based on configuration
- Need to maintain component simplicity

### Use Behavior Variants When:
- Same component, different designer interactions
- Variants need different designer capabilities
- Complex conditional logic in designer