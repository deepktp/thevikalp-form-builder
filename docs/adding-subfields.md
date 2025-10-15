# Adding Subfields

This guide explains how to add subfields (nested fields or child components) to existing components in Triones Designable. There are several approaches depending on your needs.

## Types of Subfields

### 1. Container Components (Droppable Components)

Components that can contain other components as children. Examples: `Card`, `FormGrid`.

### 2. Array Components (Dynamic Lists)

Components that create arrays of objects where each item can have subfields. Examples: `ArrayCards`, `ArrayTable`.

### 3. Schema Sub-properties

Adding nested properties to a component's configuration schema.

### 4. Grid Columns

Creating responsive grid layouts with columns that contain subfields.

## Method 1: Making a Component Droppable

To allow a component to contain other components as children, make it droppable.

### Step 1: Update Component Behavior

Modify the component's behavior to enable dropping:

```typescript
// In your component's preview.tsx
Component.Behavior = createBehavior({
  name: 'MyComponent',
  extends: ['Field'],
  selector: (node) => node.props['x-component'] === 'MyComponent',
  designerProps: {
    droppable: true,  // Enable dropping children
    allowDrop: (node) => {
      // Optional: control which components can be dropped
      return node.props['x-component'] !== 'MyComponent'; // Prevent nesting same component
    },
    propsSchema: createFieldSchema(AllSchemas.MyComponent),
  },
  designerLocales: AllLocales.MyComponent,
});
```

### Step 2: Handle Children in Render

Update your component to render children:

```tsx
export const MyComponent: DnFC<ComponentProps> = observer((props) => {
  const node = useTreeNode();
  const nodeId = useNodeIdProps();

  // If no children, show drop zone
  if (node.children.length === 0) {
    return <DroppableWidget {...props} />;
  }

  return (
    <div {...nodeId}>
      {/* Your component content */}
      <div className="my-component-content">
        {props.children}
      </div>

      {/* Render child components */}
      {node.children.map((childNode) => (
        <TreeNodeWidget key={childNode.id} node={childNode} />
      ))}
    </div>
  );
});
```

### Step 3: Update Resource Definition

Ensure the resource creates a void field that can contain children:

```typescript
MyComponent.Resource = createResource({
  icon: 'MyComponentSource',
  elements: [
    {
      componentName: 'Field',
      props: {
        type: 'void',  // Void type for containers
        'x-component': 'MyComponent',
        'x-component-props': {
          title: 'My Component',
        },
      },
      // Optionally add default children
      children: [
        {
          componentName: 'Field',
          props: {
            type: 'string',
            'x-component': 'Input',
            title: 'Default Subfield',
          },
        },
      ],
    },
  ],
});
```

## Method 2: Creating Array Components

For components that need to create dynamic lists with subfields.

### Step 1: Create Array Structure

Based on the ArrayCards pattern:

```typescript
export const MyArrayComponent: DnFC<ComponentProps> = observer((props) => {
  const node = useTreeNode();
  const nodeId = useNodeIdProps();

  const designer = useDropTemplate('MyArrayComponent', (source) => {
    // Create the structure for array items
    const objectNode = new TreeNode({
      componentName: node.componentName,
      props: {
        type: 'object',
      },
      children: source, // The dropped components become children of each array item
    });

    const additionNode = new TreeNode({
      componentName: node.componentName,
      props: {
        type: 'void',
        'x-component': 'MyArrayComponent.Addition',
      },
    });

    return [objectNode, additionNode];
  });

  // Render logic similar to ArrayCards
  return (
    <ArrayBase disabled>
      <ArrayBase.Item index={0} record={null}>
        <div className="my-array-item">
          {/* Render children components */}
          {node.children
            .filter(child => !isOperationNode(child))
            .map((child) => (
              <TreeNodeWidget key={child.id} node={child} />
            ))}
        </div>
      </ArrayBase.Item>
    </ArrayBase>
  );
});
```

### Step 2: Add Array Behaviors

```typescript
MyArrayComponent.Behavior = createArrayBehavior('MyArrayComponent');
```

## Method 3: Adding Schema Sub-properties

For adding nested configuration properties to components.

### Step 1: Extend Component Schema

```typescript
// In schemas/MyComponent.ts
export const MyComponent = {
  type: 'object',
  properties: {
    // Basic properties
    title: {
      type: 'string',
      'x-decorator': 'FormItem',
      'x-component': 'Input',
    },

    // Sub-properties object
    validation: {
      type: 'object',
      'x-decorator': 'FormItem',
      'x-component': 'Card',
      'x-component-props': {
        title: 'Validation Rules',
      },
      properties: {
        required: {
          type: 'boolean',
          'x-decorator': 'FormItem',
          'x-component': 'Switch',
          title: 'Required',
        },
        minLength: {
          type: 'number',
          'x-decorator': 'FormItem',
          'x-component': 'NumberPicker',
          title: 'Minimum Length',
        },
        pattern: {
          type: 'string',
          'x-decorator': 'FormItem',
          'x-component': 'Input',
          title: 'Pattern',
        },
      },
    },

    // Array of sub-properties
    options: {
      type: 'array',
      'x-decorator': 'FormItem',
      'x-component': 'ArrayItems',
      title: 'Options',
      items: {
        type: 'object',
        properties: {
          label: {
            type: 'string',
            'x-decorator': 'FormItem',
            'x-component': 'Input',
            title: 'Label',
          },
          value: {
            type: 'string',
            'x-decorator': 'FormItem',
            'x-component': 'Input',
            title: 'Value',
          },
        },
      },
    },
  },
};
```

### Step 2: Handle Sub-properties in Component

```typescript
export const MyComponent: DnFC<ComponentProps> = (props) => {
  // Access sub-properties
  const { validation, options } = props;

  // Use sub-properties in rendering logic
  return (
    <AntdComponent
      required={validation?.required}
      minLength={validation?.minLength}
      pattern={validation?.pattern}
      options={options}
      {...otherProps}
    >
      {props.children}
    </AntdComponent>
  );
};
```

## Method 4: Creating Grid Layouts

For responsive layouts with columns containing subfields.

### Step 1: Create Grid Component

Similar to FormGrid:

```typescript
export const MyGrid: DnFC<ComponentProps> = observer((props) => {
  const node = useTreeNode();
  const nodeId = useNodeIdProps();

  if (node.children.length === 0) return <DroppableWidget />;

  return (
    <div {...nodeId} className="my-grid">
      <div className="grid-container">
        {node.children.map((child) => (
          <div key={child.id} className="grid-column">
            <TreeNodeWidget node={child} />
          </div>
        ))}
      </div>
    </div>
  );
});
```

### Step 2: Add Grid Behaviors

```typescript
MyGrid.Behavior = createBehavior({
  name: 'MyGrid',
  extends: ['Field'],
  selector: (node) => node.props['x-component'] === 'MyGrid',
  designerProps: {
    droppable: true,
    allowDrop: (node) => node.props['x-component'] !== 'MyGrid',
  },
});

MyGrid.ColumnBehavior = createBehavior({
  name: 'MyGrid.Column',
  extends: ['Field'],
  selector: (node) => node.props['x-component'] === 'MyGrid.Column',
  designerProps: {
    droppable: true,
    allowDrop: (node) => node.props['x-component'] === 'MyGrid',
  },
});
```

## Practical Examples

### Example 1: Address Component with Subfields

```typescript
// Address component that contains street, city, state, zip
export const Address: DnFC<ComponentProps> = observer((props) => {
  const node = useTreeNode();
  const nodeId = useNodeIdProps();

  return (
    <Card {...nodeId} title="Address">
      {node.children.length === 0 ? (
        <DroppableWidget />
      ) : (
        node.children.map((child) => (
          <TreeNodeWidget key={child.id} node={child} />
        ))
      )}
    </Card>
  );
});

Address.Resource = createResource({
  icon: 'AddressSource',
  elements: [
    {
      componentName: 'Field',
      props: {
        type: 'void',
        'x-component': 'Address',
      },
      children: [
        {
          componentName: 'Field',
          props: {
            type: 'string',
            'x-component': 'Input',
            title: 'Street Address',
          },
        },
        {
          componentName: 'Field',
          props: {
            type: 'string',
            'x-component': 'Input',
            title: 'City',
          },
        },
        {
          componentName: 'Field',
          props: {
            type: 'string',
            'x-component': 'Select',
            title: 'State',
            enum: ['CA', 'NY', 'TX'], // etc
          },
        },
        {
          componentName: 'Field',
          props: {
            type: 'string',
            'x-component': 'Input',
            title: 'ZIP Code',
          },
        },
      ],
    },
  ],
});
```

### Example 2: Product Component with Validation Sub-properties

```typescript
// Product component with nested validation rules
export const Product = {
  type: 'object',
  properties: {
    name: {
      type: 'string',
      'x-decorator': 'FormItem',
      'x-component': 'Input',
      title: 'Product Name',
    },
    price: {
      type: 'number',
      'x-decorator': 'FormItem',
      'x-component': 'NumberPicker',
      title: 'Price',
    },
    validation: {
      type: 'object',
      'x-decorator': 'FormItem',
      'x-component': 'Card',
      'x-component-props': {
        title: 'Validation Rules',
        size: 'small',
      },
      properties: {
        required: {
          type: 'boolean',
          'x-decorator': 'FormItem',
          'x-component': 'Switch',
          title: 'Required',
          default: true,
        },
        minPrice: {
          type: 'number',
          'x-decorator': 'FormItem',
          'x-component': 'NumberPicker',
          title: 'Minimum Price',
          'x-component-props': {
            min: 0,
          },
        },
        maxPrice: {
          type: 'number',
          'x-decorator': 'FormItem',
          'x-component': 'NumberPicker',
          title: 'Maximum Price',
          'x-component-props': {
            min: 0,
          },
        },
      },
    },
  },
};
```

## Testing Subfields

### In the Designer

1. **Drag the component** to the canvas
2. **Drag sub-components** into the droppable area
3. **Configure properties** in the settings panel
4. **Switch to preview mode** to test the rendered form

### Programmatic Testing

```typescript
// Test schema generation
const tree = /* create tree with subfields */;
const schema = transformToSchema(tree);
console.log(JSON.stringify(schema, null, 2));

// Test form rendering
const form = createForm();
const FormComponent = () => (
  <Form form={form}>
    <SchemaField schema={schema} />
  </Form>
);
```

## Best Practices

### 1. Clear Component Hierarchy
- Use meaningful names for subfield components
- Maintain consistent nesting levels
- Document component relationships

### 2. Performance Considerations
- Avoid deep nesting (more than 3-4 levels)
- Use lazy loading for complex sub-components
- Optimize re-renders with React.memo

### 3. User Experience
- Provide visual feedback for droppable areas
- Show loading states for dynamic content
- Include helpful tooltips and descriptions

### 4. Schema Design
- Group related sub-properties logically
- Use appropriate input types for each property
- Provide sensible defaults

### 5. Error Handling
- Validate subfield configurations
- Handle missing required subfields gracefully
- Provide clear error messages

## Common Patterns

### Conditional Subfields
```typescript
{
  fieldType: {
    type: 'string',
    enum: ['text', 'number', 'select'],
    'x-decorator': 'FormItem',
    'x-component': 'Select',
  },
  // Show options only when fieldType is 'select'
  options: {
    type: 'array',
    'x-decorator': 'FormItem',
    'x-component': 'ArrayItems',
    'x-reactions': {
      dependencies: ['fieldType'],
      fulfill: {
        state: {
          visible: '{{$deps[0] === "select"}}',
        },
      },
    },
  },
}
```

### Dynamic Subfield Addition
```typescript
// In component preview
<LoadTemplate
  actions={[
    {
      title: 'Add Subfield',
      icon: 'AddField',
      onClick: () => {
        const subfield = new TreeNode({
          componentName: 'Field',
          props: {
            type: 'string',
            'x-component': 'Input',
            title: 'New Subfield',
          },
        });
        node.append(subfield);
      },
    },
  ]}
/>
```

## Troubleshooting

### Component Not Accepting Children
- Check `droppable: true` in behavior
- Verify `allowDrop` function logic
- Ensure component type is 'void' for containers

### Subfields Not Rendering
- Check TreeNodeWidget import and usage
- Verify children array is not empty
- Test with DroppableWidget fallback

### Schema Issues
- Validate JSON schema syntax
- Check property types and decorators
- Test schema transformation

### Performance Issues
- Profile component re-renders
- Use React.memo for expensive components
- Implement virtualization for large lists