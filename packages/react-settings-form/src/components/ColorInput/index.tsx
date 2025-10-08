import React, { useRef } from 'react';
import { ColorPicker } from 'antd';
import { useCssInJs, usePrefix } from '@thevikalp/designable-react';
import cls from 'classnames';
import { genColorInputStyle } from './styles';

export interface IColorInputProps {
  value?: string;
  onChange?: (color: string) => void;
}

export const ColorInput: React.FC<IColorInputProps> = (props) => {
  const container = useRef<HTMLDivElement>();
  const prefix = usePrefix('color-input');
  // const color = props.value as string;
  const { hashId } = useCssInJs({ prefix, styleFun: genColorInputStyle });
  return (
    <div ref={container} className={cls(prefix, hashId)}>
      <ColorPicker
        value={props.value}
        onChange={(color) => {
          props.onChange?.(color.toHexString());
        }}
        showText
      />
    </div>
  );
};
