# Components

Triones Designable provides a comprehensive set of form components built on Ant Design and Formily. This document describes all available components and their usage.

## Component Categories

### Display Elements

#### Text
- **Purpose**: Display static text content
- **Usage**: Headers, labels, descriptions
- **Properties**:
  - `value`: Text content
  - `mode`: Display mode (`normal`, `h1`, `h2`, `h3`, `p`)
  - `content`: Alternative content property

### Basic Fields

#### Input
- **Purpose**: Single-line text input
- **Ant Design Component**: `Input`
- **Properties**:
  - `placeholder`: Placeholder text
  - `maxLength`: Maximum character count
  - `required`: Validation requirement

#### Password
- **Purpose**: Password input with masking
- **Ant Design Component**: `Input.Password`
- **Properties**:
  - `placeholder`: Placeholder text
  - `required`: Validation requirement

#### NumberPicker
- **Purpose**: Numeric input with increment/decrement
- **Ant Design Component**: `InputNumber`
- **Properties**:
  - `placeholder`: Placeholder text
  - `min`: Minimum value
  - `max`: Maximum value
  - `step`: Increment step
  - `required`: Validation requirement

#### Radio
- **Purpose**: Single selection from options
- **Ant Design Component**: `Radio.Group`
- **Properties**:
  - `options`: Array of radio options
  - `required`: Validation requirement

#### Checkbox
- **Purpose**: Multiple selection or boolean toggle
- **Ant Design Component**: `Checkbox` / `Checkbox.Group`
- **Properties**:
  - `options`: Array of checkbox options (for group)
  - `required`: Validation requirement

#### Select
- **Purpose**: Dropdown selection
- **Ant Design Component**: `Select`
- **Properties**:
  - `options`: Array of select options
  - `mode`: Selection mode (`multiple`, `tags`)
  - `placeholder`: Placeholder text
  - `required`: Validation requirement

#### Slider
- **Purpose**: Numeric range selection
- **Ant Design Component**: `Slider`
- **Properties**:
  - `min`: Minimum value
  - `max`: Maximum value
  - `step`: Increment step
  - `range`: Enable range selection
  - `required`: Validation requirement

#### Switch
- **Purpose**: Boolean toggle
- **Ant Design Component**: `Switch`
- **Properties**:
  - `checkedChildren`: Text when checked
  - `unCheckedChildren`: Text when unchecked
  - `required`: Validation requirement

### Date and Time Fields

#### DatePicker
- **Purpose**: Date selection
- **Ant Design Component**: `DatePicker`
- **Properties**:
  - `format`: Date format string
  - `picker`: Date picker type (`date`, `week`, `month`, `quarter`, `year`)
  - `required`: Validation requirement

#### TimePicker
- **Purpose**: Time selection
- **Ant Design Component**: `TimePicker`
- **Properties**:
  - `format`: Time format string
  - `required`: Validation requirement

### Advanced Fields

#### Cascader
- **Purpose**: Hierarchical selection
- **Ant Design Component**: `Cascader`
- **Properties**:
  - `options`: Hierarchical options array
  - `placeholder`: Placeholder text
  - `required`: Validation requirement

#### TreeSelect
- **Purpose**: Tree-structured selection
- **Ant Design Component**: `TreeSelect`
- **Properties**:
  - `treeData`: Tree data structure
  - `multiple`: Enable multiple selection
  - `placeholder`: Placeholder text
  - `required`: Validation requirement

#### Transfer
- **Purpose**: Data transfer between two lists
- **Ant Design Component**: `Transfer`
- **Properties**:
  - `dataSource`: Data source array
  - `titles`: Titles for source and target lists
  - `required`: Validation requirement

#### Upload
- **Purpose**: File upload
- **Ant Design Component**: `Upload`
- **Properties**:
  - `action`: Upload URL
  - `listType`: Upload list type (`text`, `picture`, `picture-card`)
  - `maxCount`: Maximum file count
  - `accept`: Accepted file types
  - `required`: Validation requirement

#### Rate
- **Purpose**: Star rating input
- **Ant Design Component**: `Rate`
- **Properties**:
  - `count`: Number of stars
  - `allowHalf`: Allow half stars
  - `required`: Validation requirement

### Layout Components

#### Card
- **Purpose**: Content container with header and body
- **Ant Design Component**: `Card`
- **Properties**:
  - `title`: Card title
  - `extra`: Extra content in header
  - `size`: Card size (`default`, `small`)

#### FormGrid
- **Purpose**: Responsive grid layout for form fields
- **Formily Component**: `FormGrid`
- **Properties**:
  - `columns`: Number of columns
  - `columnGap`: Gap between columns
  - `rowGap`: Gap between rows

#### Space
- **Purpose**: Spacing container for child elements
- **Ant Design Component**: `Space`
- **Properties**:
  - `direction`: Layout direction (`horizontal`, `vertical`)
  - `size`: Spacing size (`small`, `middle`, `large`, or number)

### Array Fields

#### ArrayCards
- **Purpose**: Dynamic array with card-based items
- **Formily Component**: `ArrayCards`
- **Properties**:
  - `title`: Array field title
  - `minItems`: Minimum number of items
  - `maxItems`: Maximum number of items

#### ArrayTable
- **Purpose**: Dynamic array with table-based layout
- **Formily Component**: `ArrayTable`
- **Properties**:
  - `title`: Array field title
  - `minItems`: Minimum number of items
  - `maxItems`: Maximum number of items

## Component Architecture

### Formily Integration

All components are wrapped with Formily's `connect` function to provide:

- **Reactive state**: Automatic state management
- **Validation**: Built-in validation system
- **Schema binding**: Automatic property mapping
- **Event handling**: Standardized event callbacks

### Property Mapping

Components use `mapProps` to map Formily field properties to Ant Design props:

```typescript
export const Input = connect(
  AntdInput,
  mapProps(
    // Read props from field
    (props, field) => ({
      ...props,
      placeholder: field.placeholder,
    }),
    // Write props to field
    (props, field) => ({
      ...props,
      onChange: field.onChange,
      value: field.value,
    })
  )
);
```

### Schema Definitions

Each component has a corresponding schema file that defines:

- **Property types**: TypeScript interfaces
- **Validation rules**: Required fields, formats
- **UI configuration**: Decorators and components
- **Default values**: Initial property values

## Usage in Designer

### Adding Components to Resources

Components are organized into resource groups in the designer:

```typescript
<ResourceWidget
  title="Basic Fields"
  sources={[Input, Password, NumberPicker, Radio, Checkbox, Select, Slider, Switch]}
/>
```

### Component Registration

Components must be registered in the designer's component map:

```typescript
const components: IDesignerComponents = {
  Form,
  Field,
  Input,
  Select,
  // ... other components
};
```

### Preview Rendering

Components are rendered in preview mode using Formily's `SchemaField`:

```typescript
const SchemaField = createSchemaField({
  components: {
    Input: AntdInput,
    Select: AntdSelect,
    // ... all components
  },
});
```

## Customization

### Extending Components

To customize a component:

1. **Create a wrapper component**
2. **Add custom properties**
3. **Maintain Formily compatibility**

```typescript
const CustomInput = connect(
  AntdInput,
  mapProps(
    (props, field) => ({
      ...props,
      customProp: field.customProp,
    }),
    (props, field) => ({
      ...props,
      onChange: field.onChange,
      value: field.value,
    })
  )
);
```

### Adding New Properties

Extend component schemas to add new configurable properties:

```typescript
const CustomInputSchema = {
  type: 'object',
  properties: {
    // Existing properties...
    customProp: {
      type: 'string',
      'x-decorator': 'FormItem',
      'x-component': 'Input',
    },
  },
};
```

## Best Practices

### Component Selection

- **Use appropriate input types**: Choose components that match data types
- **Consider user experience**: Select intuitive components for the use case
- **Validate appropriately**: Add validation rules based on business requirements

### Layout Design

- **Use FormGrid for responsive layouts**: Organize fields in columns
- **Group related fields**: Use Card components to group logical sections
- **Provide spacing**: Use Space components for visual separation

### Performance Considerations

- **Lazy load components**: Import components only when needed
- **Optimize re-renders**: Use React.memo for expensive components
- **Minimize prop drilling**: Leverage Formily's context system

## Troubleshooting

### Common Issues

**Component not rendering**:
- Check component registration in `components` object
- Verify schema compatibility
- Ensure proper imports

**Properties not applying**:
- Check property mapping in `mapProps`
- Verify schema definitions
- Test in isolation

**Validation not working**:
- Check Formily validation rules
- Verify field configuration
- Test validation logic

**Styling issues**:
- Check Ant Design theme compatibility
- Verify CSS class overrides
- Test in different browsers

## Component Status

| Component | Status | Notes |
|-----------|--------|-------|
| Input | ✅ Stable | Fully implemented |
| Select | ✅ Stable | Supports single/multiple modes |
| DatePicker | ✅ Stable | All picker types supported |
| ArrayTable | ✅ Stable | Complex array handling |
| Upload | ⚠️ Beta | File handling may need customization |
| TreeSelect | ✅ Stable | Full tree functionality |

## Future Components

Planned additions:
- Rich text editor
- Color picker
- Signature pad
- Map/location picker
- Advanced validation components