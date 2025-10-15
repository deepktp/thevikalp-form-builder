# Modifying Files

This guide provides guidelines for modifying existing files in the Triones Designable codebase. It covers best practices, file organization, and common modification patterns.

## Code Organization Principles

### File Structure Conventions

- **One responsibility per file**: Each file should have a single, clear purpose
- **Consistent naming**: Use kebab-case for directories, PascalCase for components
- **Index files**: Use `index.ts` files to centralize exports
- **Type definitions**: Keep types in separate `.ts` files when complex

### Import/Export Patterns

**Preferred import style**:
```typescript
// Good: Named imports
import { createDesigner, TreeNode } from '@thevikalp/designable-core';

// Avoid: Namespace imports (except for libraries)
import * as Core from '@thevikalp/designable-core';
```

**Export patterns**:
```typescript
// index.ts files should re-export
export * from './Designer';
export * from './TreeNode';
export * from './types';

// Component files should export default and named
export const Designer = () => { /* ... */ };
export default Designer;
```

## Modifying Components

### React Component Changes

When modifying React components:

1. **Preserve existing props interface**:
```typescript
interface IDesignerProps {
  engine: IDesigner;
  children?: React.ReactNode;
  // Add new props here
  theme?: 'light' | 'dark';
}
```

2. **Use functional components with hooks**:
```typescript
const Designer: React.FC<IDesignerProps> = ({ engine, children, theme = 'light' }) => {
  // Component logic
};
```

3. **Maintain TypeScript strictness**:
```typescript
// Good: Explicit types
const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {};

// Avoid: any types
const handleClick = (event: any) => {};
```

### Core Engine Modifications

When modifying core functionality:

1. **Preserve backward compatibility**:
```typescript
// Add new parameters with defaults
createDesigner(options: IDesignerOptions = {}) {
  const { theme = 'light', ...rest } = options;
  // Use theme...
}
```

2. **Update type definitions**:
```typescript
interface IDesignerOptions {
  shortcuts?: Shortcut[];
  theme?: 'light' | 'dark'; // New property
}
```

3. **Maintain reactive patterns**:
```typescript
// Use observable properties
@observable
theme: 'light' | 'dark' = 'light';
```

## Schema Modifications

### Component Schema Changes

When modifying component schemas in Formily packages:

1. **Version carefully**: Schema changes can break existing forms
2. **Add new properties**: Don't remove existing ones without migration
3. **Use semantic versioning**: Major version for breaking changes

```typescript
// Adding new property
const InputSchema = {
  type: 'object',
  properties: {
    // Existing properties...
    maxLength: {
      type: 'number',
      'x-decorator': 'FormItem',
      'x-component': 'NumberPicker',
    },
  },
};
```

### Schema Validation

Always validate schema changes:

```typescript
// Test with sample data
const testSchema = {
  type: 'object',
  properties: {
    newField: { /* new schema */ },
  },
};

// Verify it transforms correctly
const transformed = transformToSchema(testTree);
```

## Localization Updates

### Adding Translations

When adding new text strings:

1. **Update all language files**:
```typescript
// en-US.ts
export const enUS = {
  Designer: {
    title: 'Form Designer',
    newProperty: 'New Property', // Add here
  },
};

// zh-CN.ts
export const zhCN = {
  Designer: {
    title: '表单设计器',
    newProperty: '新属性', // Add here
  },
};
```

2. **Use translation keys in components**:
```typescript
import { useTranslation } from './hooks';

const MyComponent = () => {
  const t = useTranslation();
  return <div>{t('Designer.newProperty')}</div>;
};
```

## Build System Changes

### Package.json Modifications

When updating dependencies:

1. **Check compatibility**: Ensure versions work across packages
2. **Update peer dependencies**: Keep Formily and Antd versions in sync
3. **Test builds**: Run `yarn build` after changes

```json
{
  "dependencies": {
    "@formily/core": "^2.2.29", // Keep consistent
    "antd": "^5.8.2" // Keep consistent
  }
}
```

### Build Configuration

When modifying build settings:

1. **Update Father config**: Check `father.config.ts` in packages
2. **Maintain output structure**: Preserve `dist/index.js` and `dist/index.d.ts`
3. **Test in examples**: Ensure examples still work

## Testing Changes

### Manual Testing Steps

1. **Build affected packages**:
```bash
cd packages/core
yarn build
```

2. **Start example application**:
```bash
cd examples/basic
yarn dev
```

3. **Test functionality**:
   - Create a form with modified components
   - Test property panels
   - Verify preview mode
   - Check save/load functionality

### Automated Testing

Add tests for new functionality:

```typescript
// __tests__/Designer.test.tsx
import { createDesigner } from '../src';

describe('Designer', () => {
  it('should create with new theme option', () => {
    const designer = createDesigner({ theme: 'dark' });
    expect(designer.theme).toBe('dark');
  });
});
```

## Common Modification Patterns

### Adding New Features

1. **Start with types**: Define interfaces first
2. **Implement core logic**: Add functionality to core packages
3. **Update UI**: Modify React components
4. **Add configuration**: Update schemas and settings
5. **Test integration**: Verify in examples

### Bug Fixes

1. **Reproduce issue**: Understand the problem
2. **Identify root cause**: Find the source
3. **Implement fix**: Make minimal changes
4. **Test fix**: Verify it resolves the issue
5. **Check regressions**: Ensure no new problems

### Performance Improvements

1. **Profile first**: Identify bottlenecks
2. **Optimize algorithms**: Improve complex operations
3. **Reduce re-renders**: Use React.memo, useMemo
4. **Lazy loading**: Implement code splitting
5. **Test performance**: Measure improvements

## File Modification Checklist

Before committing changes:

- [ ] **TypeScript compiles**: `yarn check:types`
- [ ] **Build succeeds**: `yarn build`
- [ ] **Example runs**: `yarn example:basic`
- [ ] **No console errors**: Check browser console
- [ ] **Tests pass**: Run any existing tests
- [ ] **Documentation updated**: Update relevant docs
- [ ] **Peer dependencies**: Check version compatibility

## Breaking Changes

When making breaking changes:

1. **Document clearly**: Explain what changed and why
2. **Provide migration guide**: Help users update
3. **Version appropriately**: Use semantic versioning
4. **Deprecation warnings**: Warn about deprecated APIs

```typescript
// Deprecation example
/** @deprecated Use `theme` option instead */
darkMode?: boolean;

// New API
theme?: 'light' | 'dark';
```

## Code Review Guidelines

When reviewing changes:

- **Functionality**: Does it work as intended?
- **Performance**: Any performance implications?
- **Security**: Any security concerns?
- **Maintainability**: Is the code readable and maintainable?
- **Testing**: Are there adequate tests?
- **Documentation**: Is documentation updated?

## Rollback Procedures

If changes need to be reverted:

1. **Identify problematic commit**:
```bash
git log --oneline
```

2. **Revert commit**:
```bash
git revert <commit-hash>
```

3. **Rebuild and test**:
```bash
yarn install && yarn build
```

4. **Notify team**: Communicate the rollback