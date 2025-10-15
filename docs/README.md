# Triones Designable Documentation

Triones Designable is a powerful form designer library built on top of [Formily](https://formilyjs.org/) and [Ant Design](https://ant.design/). It provides a drag-and-drop interface for creating dynamic forms with a visual designer.

## Features

- **Visual Form Designer**: Drag-and-drop interface for building forms
- **Component Library**: Rich set of form components based on Ant Design
- **Schema Generation**: Automatically generates Formily schemas from designs
- **Preview Mode**: Real-time preview of forms during design
- **Settings Panel**: Configure component properties visually
- **History Management**: Undo/redo functionality
- **Multiple Views**: Design, JSON tree, markup, and preview modes

## Quick Start

1. Install dependencies:
   ```bash
   yarn install
   ```

2. Build the packages:
   ```bash
   yarn build
   ```

3. Run the basic example:
   ```bash
   cd examples/basic
   yarn dev
   ```

## Documentation Sections

- [Project Structure](./project-structure.md) - Overview of the monorepo structure
- [Commands](./commands.md) - Available scripts and commands
- [Packages](./packages.md) - Description of all packages in the monorepo
- [Adding Fields](./adding-fields.md) - How to add new form fields
- [Adding Subfields](./adding-subfields.md) - How to add nested fields and child components
- [Creating Component Variants](./creating-component-variants.md) - How to create components with multiple variants
- [Modifying Files](./modifying-files.md) - Guidelines for modifying existing code
- [Components](./components.md) - Available form components
- [Getting Started](./getting-started.md) - Step-by-step setup guide

## Architecture

Triones Designable consists of several key packages:

- **@thevikalp/designable-core**: Core engine with designer logic, tree management, and reactive state
- **@thevikalp/designable-react**: React components for the designer UI (panels, widgets, etc.)
- **@thevikalp/designable-formily-antd**: Formily + Ant Design component implementations
- **@thevikalp/designable-shared**: Shared utilities and types

The designer works by:

1. Creating a tree structure representing the form layout
2. Allowing users to drag components into the tree
3. Transforming the tree into a Formily schema
4. Rendering the schema using Formily's reactive form system

## Contributing

Please follow conventional commit messages:

- `feat:` for new features
- `fix:` for bug fixes
- `docs:` for documentation changes
- `refactor:` for code refactoring
- `style:` for formatting changes

## License

UNLICENSED