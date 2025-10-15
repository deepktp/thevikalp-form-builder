# @thevikalp/designable-formily-transformer

[![NPM version](https://img.shields.io/npm/v/@thevikalp/designable-formily-transformer.svg?style=flat)](https://npmjs.org/package/@thevikalp/designable-formily-transformer)
[![NPM downloads](http://img.shields.io/npm/dm/@thevikalp/designable-formily-transformer.svg?style=flat)](https://npmjs.org/package/@thevikalp/designable-formily-transformer)

Schema transformation utilities for converting between Designable tree nodes and Formily schemas.

## Installation

```bash
$ npm install @thevikalp/designable-formily-transformer
```

## Dependencies

- `@formily/core`: ^2.2.29
- `@formily/json-schema`: ^2.2.29
- `@thevikalp/designable-core`: ^1.1.0
- `@thevikalp/designable-shared`: ^1.1.0

## API Reference

### Interfaces

#### `ITransformerOptions`

Configuration options for the transformer functions.

```typescript
interface ITransformerOptions {
  designableFieldName?: string;
  designableFormName?: string;
}
```

**Properties:**
- `designableFieldName` (optional): The component name used for field nodes. Defaults to `'Field'`.
- `designableFormName` (optional): The component name used for form nodes. Defaults to `'Form'`.

#### `IFormilySchema`

Represents a Formily schema with optional form configuration.

```typescript
interface IFormilySchema {
  schema?: ISchema;
  form?: Record<string, any>;
}
```

### Functions

#### `transformToSchema(node, options?)`

Converts a Designable tree node to a Formily schema.

```typescript
function transformToSchema(
  node: ITreeNode,
  options?: ITransformerOptions
): IFormilySchema
```

**Parameters:**
- `node`: The root tree node to transform
- `options` (optional): Transformation options

**Returns:** An object containing the transformed schema and form configuration.

**Example:**
```typescript
import { transformToSchema } from '@thevikalp/designable-formily-transformer';

const formilySchema = transformToSchema(treeNode, {
  designableFieldName: 'Field',
  designableFormName: 'Form'
});
```

#### `transformToTreeNode(formily, options?)`

Converts a Formily schema back to a Designable tree node.

```typescript
function transformToTreeNode(
  formily?: IFormilySchema,
  options?: ITransformerOptions
): ITreeNode
```

**Parameters:**
- `formily` (optional): The Formily schema to transform
- `options` (optional): Transformation options

**Returns:** The root tree node representing the form structure.

**Example:**
```typescript
import { transformToTreeNode } from '@thevikalp/designable-formily-transformer';

const treeNode = transformToTreeNode({
  schema: formilySchema,
  form: formConfig
});
```

## Usage

### Basic Transformation

```typescript
import { transformToSchema, transformToTreeNode } from '@thevikalp/designable-formily-transformer';

// Convert tree node to Formily schema
const formilyData = transformToSchema(treeNode);

// Convert back to tree node
const restoredTree = transformToTreeNode(formilyData);
```

### Custom Component Names

```typescript
import { transformToSchema, transformToTreeNode } from '@thevikalp/designable-formily-transformer';

const options = {
  designableFieldName: 'CustomField',
  designableFormName: 'CustomForm'
};

const schema = transformToSchema(treeNode, options);
const tree = transformToTreeNode(schema, options);
```

## Schema Structure

The transformer handles the following schema patterns:

- **Object schemas**: Properties are mapped to child field nodes
- **Array schemas**: Items are handled as array item templates, with additional properties as array elements
- **Field metadata**: Designable IDs are preserved in `x-designable-id` properties
- **Form configuration**: Root form props are extracted separately

## Integration

This package is typically used internally by Designable to bridge the gap between the visual editor's tree structure and Formily's schema format. It's not intended for direct public use but may be useful for advanced integrations or custom form builders.

## Build & Development

```bash
# Development mode
npm run dev

# Build for production
npm run build

# Build dependencies
npm run build:deps
```

## License

UNLICENSED