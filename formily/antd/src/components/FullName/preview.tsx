import React from 'react';
import { FormGrid as AntdGrid} from "@formily/antd-v5";
import { createBehavior, createResource } from '@thevikalp/designable-core';
import { DnFC, useTreeNode, useNodeIdProps, DroppableWidget, TreeNodeWidget } from '@thevikalp/designable-react';
import { observer } from '@formily/reactive-react';
import { createVoidFieldSchema } from '../Field';
import { AllSchemas } from '../../schemas';
import { AllLocales } from '../../locales';

export const FullName: DnFC<React.ComponentProps<typeof AntdGrid>> = observer((props) => {
  const node = useTreeNode();
  const nodeId = useNodeIdProps();

  return (
    <div {...nodeId}>
      <AntdGrid
        {...props}
        maxColumns={2}
        minColumns={2}
        breakpoints={[1, 3, ]}
      >
        {node.children.length === 0 ? (
          <DroppableWidget />
        ) : (
          node.children.map((child) => (
            <TreeNodeWidget key={child.id} node={child} />
          ))
        )}
      </AntdGrid>
    </div>
  );
});

FullName.Behavior = createBehavior({
  name: 'FullName',
  extends: ['Field'],
  selector: (node) => node.props['x-component'] === 'FullName',
  designerProps: {
    droppable: true,
    propsSchema: createVoidFieldSchema(AllSchemas.FullName),
  },
  designerLocales: AllLocales.FullName,
});

FullName.Resource = createResource({
  icon: 'FullNameSource',
  elements: [
    {
      componentName: 'Field',
      props: {
        type: 'void',
        'x-component': 'FullName',
        'x-component-props': {
          title: 'Full Name',
        },
      },
      children: [
        {
          componentName: 'Field',
          props: {
            type: 'string',
            title: 'First Name',
            'x-decorator': 'FormItem',
            'x-component': 'Input',
            'x-decorator-props': {
              gridSpan: 6,
            },
            required: true,
          },
        },
        {
          componentName: 'Field',
          props: {
            type: 'string',
            title: 'Last Name',
            'x-decorator': 'FormItem',
            'x-component': 'Input',
            'x-decorator-props': {
              gridSpan: 6,
            },
            required: true,
          },
        },
      ],
    },
  ],
});
