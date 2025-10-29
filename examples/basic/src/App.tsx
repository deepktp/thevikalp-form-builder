import {
  createDesigner,
  GlobalRegistry,
  KeyCode,
  Shortcut,
} from '@thevikalp/designable-core';
import { useEffect, useMemo } from 'react';
import {
  ComponentTreeWidget,
  CompositePanel,
  Designer,
  DesignerToolsWidget,
  HistoryWidget,
  IDesignerComponents,
  OutlineTreeWidget,
  ResourceWidget,
  SettingsPanel,
  StudioPanel,
  ToolbarPanel,
  ViewPanel,
  ViewportPanel,
  ViewToolsWidget,
  Workspace,
  WorkspacePanel,
} from '@thevikalp/designable-react';
import {
  ArrayCards,
  ArrayTable,
  Field,
  Form,
  Input,
  NumberPicker,
  Password,
  Rate,
  Card,
  FormGrid,
  Space,
  Checkbox,
  DatePicker,
  Radio,
  Select,
  Slider,
  Switch,
  Text,
  TimePicker,
  Transfer,
  TreeSelect,
  Upload,
  Cascader,
  FullName,
} from '@thevikalp/designable-formily-antd';
import { SettingsForm } from '@thevikalp/designable-react-settings-form';
import { transformToSchema } from '@thevikalp/designable-formily-transformer';
import { Button } from 'antd';
import { PreviewWidget } from './PreviewWidget';

function App() {
  const engine = useMemo(
    () =>
      createDesigner({
        shortcuts: [
          new Shortcut({
            codes: [
              [KeyCode.Meta, KeyCode.S],
              [KeyCode.Control, KeyCode.S],
            ],
            // eslint-disable-next-line @typescript-eslint/no-unused-vars
            handler(_ctx: any) {
              console.log(
                JSON.stringify(
                  transformToSchema(engine.getCurrentTree()),
                  null,
                  2,
                ),
              );
            },
          }),
        ],
        rootComponentName: 'Form',
      }),
    [],
  );

  const handleSave = () => {
    console.log(
      JSON.stringify(transformToSchema(engine.getCurrentTree()), null, 2),
    );
  };

  useEffect(() => {
    GlobalRegistry.setDesignerLanguage('en-us');
  }, []);

  const components: IDesignerComponents = {
    Form,
    Field,
    Input,
    Rate,
    NumberPicker,
    Password,
    ArrayCards,
    ArrayTable,
    Card,
    FormGrid,
    Space,
    Checkbox,
    DatePicker,
    Radio,
    Select,
    Slider,
    Switch,
    Text,
    TimePicker,
    Transfer,
    TreeSelect,
    Upload,
    Cascader,
    FullName,
  };

  return (
    <Designer engine={engine}>
      <StudioPanel
        actions={[
          <Button onClick={handleSave} key="save-button">
            Save
          </Button>,
        ]}
      >
        <CompositePanel>
          <CompositePanel.Item title="Component" icon="Component">
            <ResourceWidget title="Display Elements" sources={[Text]} />
            <ResourceWidget
              title="Basic Fields"
              sources={[
                Input,
                FullName,
                Password,
                NumberPicker,
                Radio,
                Checkbox,
                Select,
                Slider,
                Switch,
                DatePicker,
                TimePicker,
                Transfer,
                Upload,
                Rate,
                Cascader,
              ]}
            />
            <ResourceWidget
              title="Layout Fields"
              sources={[Card, FormGrid, Space]}
            />
            <ResourceWidget
              title="Array Fields"
              sources={[ArrayCards, ArrayTable]}
            />
          </CompositePanel.Item>
          <CompositePanel.Item title="Structure Tree" icon="Outline">
            <OutlineTreeWidget />
          </CompositePanel.Item>
          <CompositePanel.Item title="History" icon="History">
            <HistoryWidget />
          </CompositePanel.Item>
        </CompositePanel>
        <Workspace id="form">
          <WorkspacePanel>
            <ToolbarPanel>
              <DesignerToolsWidget />
              <ViewToolsWidget
                use={['DESIGNABLE', 'JSONTREE', 'MARKUP', 'PREVIEW']}
              />
            </ToolbarPanel>
            <ViewportPanel
              style={{
                height: '100%',
                padding: '10px',
                width: 'calc(100% - 100px)',
                maxWidth: '800px',
                margin: '10px auto',
              }}
            >
              <ViewPanel type="DESIGNABLE">
                {() => <ComponentTreeWidget components={components} />}
              </ViewPanel>
              <ViewPanel type="JSONTREE">
                {(tree) => (
                  <div>
                    <pre>
                      {JSON.stringify(transformToSchema(tree), null, 2)}
                    </pre>
                  </div>
                )}
              </ViewPanel>
              <ViewPanel type={`PREVIEW`}>
                {(tree) => <PreviewWidget tree={tree} />}
              </ViewPanel>
            </ViewportPanel>
          </WorkspacePanel>
        </Workspace>
        <SettingsPanel title="panels.PropertySettings">
          <SettingsForm uploadAction="https://www.mocki.io/v2/5cc8019d300000980a055e76" />
        </SettingsPanel>
      </StudioPanel>
    </Designer>
  );
}

export default App;
