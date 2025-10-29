import React from 'react';
import { Input as FormilyInput } from '@formily/antd-v5';
import { createBehavior, createResource } from '@thevikalp/designable-core';
import { DnFC } from '@thevikalp/designable-react';
import { createFieldSchema } from '../Field';
import { AllSchemas } from '../../schemas';
import { AllLocales } from '../../locales';

export const Input: DnFC<React.ComponentProps<typeof FormilyInput>> =
  FormilyInput;

Input.Behavior = createBehavior(
  {
    name: 'Input',
    extends: ['Field'],
    selector: (node) => node.props['x-component'] === 'Input',
    designerProps: {
      propsSchema: createFieldSchema(AllSchemas.Input),
    },
    designerLocales: AllLocales.Input,
  },
  {
    name: 'Input.TextArea',
    extends: ['Field'],
    selector: (node) => node.props['x-component'] === 'Input.TextArea',
    designerProps: {
      propsSchema: createFieldSchema(AllSchemas.Input.TextArea),
    },
    designerLocales: AllLocales.TextArea,
  },
  {
    name: 'Input.Email',
    extends: ['Field'],
    selector: (node) => node.props['x-component'] === 'Input.Email',
    designerProps: {
      propsSchema: createFieldSchema(AllSchemas.Input.Email),
    },
    designerLocales: AllLocales.Email,
  },
);

Input.Resource = createResource(
  {
    icon: 'InputSource',
    elements: [
      {
        componentName: 'Field',
        props: {
          type: 'string',
          title: 'Input',
          'x-decorator': 'FormItem',
          'x-component': 'Input',
        },
      },
    ],
  },
  {
    icon: 'TextAreaSource',
    elements: [
      {
        componentName: 'Field',
        props: {
          type: 'string',
          title: 'TextArea',
          'x-decorator': 'FormItem',
          'x-component': 'Input.TextArea',
        },
      },
    ],
  },
  {
    icon: 'EmailSource',
    title: "Email",
    elements: [
      {
        componentName: 'Field',
        props: {
          type: 'string',
          title: 'Email',
          'x-validator': 'email',
          'x-decorator': 'FormItem',
          'x-component': 'Input',
          "required": true
        },
      },
    ],
  },
);
