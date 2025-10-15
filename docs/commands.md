# Commands

This document describes the available commands for developing, building, and maintaining the Triones Designable project.

## Root Level Commands

These commands are run from the project root directory.

### Development Commands

```bash
# Install all dependencies for the monorepo
yarn install

# Clean all node_modules and build artifacts
yarn clean

# Check TypeScript types across all packages
yarn check:types

# Build all packages
yarn build

# Start the basic example in development mode
yarn example:basic

# Create a new field component template
yarn create:field <FieldName>
```

### Field Creation Commands

```bash
# Create a new field component template
yarn create:field <FieldName>
```

**Examples:**
```bash
yarn create:field MyCustomField
yarn create:field EmailInput
yarn create:field PhoneNumber
```

**What it creates:**
- Component directory: `formily/antd/src/components/<FieldName>/`
- Component files: `index.ts`, `preview.tsx`
- Schema file: `formily/antd/src/schemas/<FieldName>.ts`
- Locale file: `formily/antd/src/locales/<FieldName>.ts`
- Updates all index files automatically

**Field naming rules:**
- Must be in PascalCase (e.g., `MyCustomField`)
- Cannot contain spaces or special characters
- Will be converted to appropriate formats for different files

## Package-Level Commands

Each package in `packages/` and `formily/` directories has these commands:

```bash
# Start development server for the package
yarn dev

# Build the package
yarn build

# Build dependencies (prebundle)
yarn build:deps

# Run doctor check before publishing
yarn prepublishOnly
```

## Example Commands

Commands for the basic example in `examples/basic/`:

```bash
# Install example dependencies
yarn install

# Start development server
yarn dev

# Build for production
yarn build

# Run linter
yarn lint

# Preview production build
yarn preview
```

## Development Workflow

### Setting Up Development Environment

1. **Clone and install**:
   ```bash
   git clone <repository-url>
   cd triones-designable
   yarn install
   ```

2. **Build all packages**:
   ```bash
   yarn build
   ```

3. **Start the example**:
   ```bash
   cd examples/basic
   yarn dev
   ```

### Debugging Individual Packages

If you need to debug a specific package:

1. **Navigate to the package**:
   ```bash
   cd packages/core  # or react, formily/antd, etc.
   ```

2. **Start development server**:
   ```bash
   yarn dev
   ```

3. **In a separate terminal, start the example**:
   ```bash
   cd examples/basic
   yarn dev
   ```

The example will use the local development version of the package.

### Adding New Components

When adding new form components:

1. **Create component in formily/antd**:
   ```bash
   cd formily/antd/src/components
   # Create new component directory
   ```

2. **Build the package**:
   ```bash
   cd formily/antd
   yarn build
   ```

3. **Update the example** to include the new component in `App.tsx`

4. **Test in the example**:
   ```bash
   cd examples/basic
   yarn dev
   ```

### Publishing Workflow

For maintainers:

1. **Ensure all tests pass and code is formatted**:
   ```bash
   yarn format
   yarn check:types
   ```

2. **Build all packages**:
   ```bash
   yarn build
   ```

3. **Create version**:
   ```bash
   yarn version:beta  # for beta releases
   # or
   yarn lerna version  # for standard versions
   ```

4. **Publish**:
   ```bash
   yarn release
   ```

## Troubleshooting

### Common Issues

**"Cannot find module" errors**:
- Run `yarn install` from root
- Ensure all packages are built: `yarn build`

**TypeScript errors**:
- Run `yarn check:types` to see all type issues
- Check individual package builds

**Example not starting**:
- Ensure packages are built: `yarn build`
- Check that workspace dependencies are correct in `examples/basic/package.json`

**Build failures**:
- Clean and rebuild: `yarn clean && yarn install && yarn build`
- Check Father configuration in individual packages

### Useful Commands for Debugging

```bash
# Check what's installed
yarn list

# Check workspace info
yarn workspaces info

# Clean specific package
cd packages/core
rm -rf node_modules dist
yarn install && yarn build

# Check package versions
lerna ls
```

## Commit Message Conventions

Follow conventional commits:

```bash
# Features
git commit -m "feat: add new form component"

# Bug fixes
git commit -m "fix: resolve date picker validation issue"

# Documentation
git commit -m "docs: update component API documentation"

# Code style
git commit -m "style: format code with prettier"

# Refactoring
git commit -m "refactor: simplify component tree logic"

# Build changes
git commit -m "build: update webpack configuration"
```