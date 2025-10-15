#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

// Get field name from command line arguments
const fieldName = process.argv[2];

if (!fieldName) {
  console.error('❌ Error: Please provide a field name');
  console.log('Usage: yarn create:field <FieldName>');
  console.log('Example: yarn create:field MyCustomField');
  process.exit(1);
}

// Convert to PascalCase and validate
const pascalCaseName = fieldName.replace(/(^\w|-\w)/g, (match) =>
  match.replace('-', '').toUpperCase(),
);

if (!/^[A-Z][a-zA-Z0-9]*$/.test(pascalCaseName)) {
  console.error(
    '❌ Error: Field name must be in PascalCase (e.g., MyCustomField)',
  );
  process.exit(1);
}

const kebabCaseName = pascalCaseName
  .replace(/([a-z0-9]|(?=[A-Z]))([A-Z])/g, '$1-$2')
  .toLowerCase();
const componentPath = path.join(
  __dirname,
  '..',
  'formily',
  'antd',
  'src',
  'components',
  pascalCaseName,
);
const schemaPath = path.join(
  __dirname,
  '..',
  'formily',
  'antd',
  'src',
  'schemas',
);

console.log('🚀 Creating field template for: ' + pascalCaseName);

// Create component directory
if (!fs.existsSync(componentPath)) {
  fs.mkdirSync(componentPath, { recursive: true });
}

// Generate component files
const files = {
  // Component index.ts
  'index.ts': "export * from './preview';\n",

  // Component preview.tsx
  'preview.tsx':
    "import React from 'react';\nimport { Input as FormilyInput } from '@formily/antd-v5';\nimport { createBehavior, createResource } from '@thevikalp/designable-core';\nimport { DnFC } from '@thevikalp/designable-react';\nimport { createFieldSchema } from '../Field';\nimport { AllSchemas } from '../../schemas';\nimport { AllLocales } from '../../locales';\n\nexport const " +
    pascalCaseName +
    ': DnFC<React.ComponentProps<typeof FormilyInput>> = FormilyInput;\n\n' +
    pascalCaseName +
    ".Behavior = createBehavior({\n  name: '" +
    pascalCaseName +
    "',\n  extends: ['Field'],\n  selector: (node) => node.props['x-component'] === '" +
    pascalCaseName +
    "',\n  designerProps: {\n    propsSchema: createFieldSchema(AllSchemas." +
    pascalCaseName +
    '),\n  },\n  designerLocales: AllLocales.' +
    pascalCaseName +
    ',\n});\n\n' +
    pascalCaseName +
    ".Resource = createResource({\n  icon: '" +
    pascalCaseName +
    "Source',\n  elements: [\n    {\n      componentName: 'Field',\n      props: {\n        type: 'string',\n        title: '" +
    pascalCaseName +
    "',\n        'x-decorator': 'FormItem',\n        'x-component': '" +
    pascalCaseName +
    "',\n      },\n    },\n  ],\n});\n",
};

// Schema file content
const schemaContent =
  "import { ISchema } from '@formily/react';\n\nexport const " +
  pascalCaseName +
  ": ISchema = {\n  type: 'object',\n  properties: {\n    placeholder: {\n      type: 'string',\n      'x-decorator': 'FormItem',\n      'x-component': 'Input',\n      'x-component-props': {\n        placeholder: 'Enter placeholder text',\n      },\n    },\n    maxLength: {\n      type: 'number',\n      'x-decorator': 'FormItem',\n      'x-component': 'NumberPicker',\n      'x-component-props': {\n        placeholder: 'Maximum length',\n      },\n    },\n    required: {\n      type: 'boolean',\n      'x-decorator': 'FormItem',\n      'x-component': 'Switch',\n      'x-component-props': {\n        defaultChecked: false,\n      },\n    },\n  },\n};\n";

// Create component files
Object.entries(files).forEach(([fileName, content]) => {
  const filePath = path.join(componentPath, fileName);
  fs.writeFileSync(filePath, content);
  console.log(
    '✅ Created: ' + path.relative(path.join(__dirname, '..'), filePath),
  );
});

// Create schema file
const schemaFilePath = path.join(schemaPath, pascalCaseName + '.ts');
fs.writeFileSync(schemaFilePath, schemaContent);
console.log(
  '✅ Created: ' + path.relative(path.join(__dirname, '..'), schemaFilePath),
);

// Update components index.ts
const componentsIndexPath = path.join(
  __dirname,
  '..',
  'formily',
  'antd',
  'src',
  'components',
  'index.ts',
);
let componentsIndex = fs.readFileSync(componentsIndexPath, 'utf8');

// Add export if not already present
if (!componentsIndex.includes("export * from './" + pascalCaseName + "';")) {
  componentsIndex += "\nexport * from './" + pascalCaseName + "';";
  fs.writeFileSync(componentsIndexPath, componentsIndex);
  console.log('✅ Updated: formily/antd/src/components/index.ts');
}

// Update schemas index.ts
const schemasIndexPath = path.join(
  __dirname,
  '..',
  'formily',
  'antd',
  'src',
  'schemas',
  'all.ts',
);
let schemasIndex = fs.readFileSync(schemasIndexPath, 'utf8');

// Add export if not already present
if (!schemasIndex.includes("export * from './" + pascalCaseName + "';")) {
  schemasIndex += "\nexport * from './" + pascalCaseName + "';";
  fs.writeFileSync(schemasIndexPath, schemasIndex);
  console.log('✅ Updated: formily/antd/src/schemas/all.ts');
}

// Update locales
const localesDir = path.join(
  __dirname,
  '..',
  'formily',
  'antd',
  'src',
  'locales',
);

// Create locale file
const localeContent =
  'export const ' +
  pascalCaseName +
  " = {\n  'zh-CN': {\n    title: '" +
  pascalCaseName +
  "',\n    settings: {\n      'x-component-props': {\n        placeholder: '占位提示',\n        maxLength: '最大长度',\n      },\n    },\n  },\n  'en-US': {\n    title: '" +
  pascalCaseName +
  "',\n    settings: {\n      'x-component-props': {\n        placeholder: 'Placeholder',\n        maxLength: 'Max Length',\n      },\n    },\n  },\n  'ko-KR': {\n    title: '" +
  pascalCaseName +
  "',\n    settings: {\n      'x-component-props': {\n        placeholder: '플레이스홀더',\n        maxLength: '최대 길이',\n      },\n    },\n  },\n};\n";

const localeFilePath = path.join(localesDir, pascalCaseName + '.ts');
fs.writeFileSync(localeFilePath, localeContent);
console.log(
  '✅ Created: ' + path.relative(path.join(__dirname, '..'), localeFilePath),
);

// Update locales index.ts
const localesIndexPath = path.join(localesDir, 'all.ts');
let localesIndex = fs.readFileSync(localesIndexPath, 'utf8');

// Add export if not already present
if (!localesIndex.includes("export * from './" + pascalCaseName + "';")) {
  localesIndex += "\nexport * from './" + pascalCaseName + "';";
  fs.writeFileSync(localesIndexPath, localesIndex);
  console.log('✅ Updated: formily/antd/src/locales/all.ts');
}

console.log('\n🎉 Field template created successfully!');
console.log('\n📝 Next steps:');
console.log(
  '1. Edit the generated files in: formily/antd/src/components/' +
    pascalCaseName +
    '/',
);
console.log(
  '2. Customize the schema in: formily/antd/src/schemas/' +
    pascalCaseName +
    '.ts',
);
console.log('3. Update locales in: formily/antd/src/locales/');
console.log('4. Build the project: yarn build');
console.log('5. Test in the example: yarn example:basic');
console.log(
  '\n💡 The field will appear in the "Basic Fields" section of the designer.',
);
