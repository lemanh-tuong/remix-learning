import { Select as AntSelect } from 'antd';
import { useState } from 'react';
import type { SelectProps as AntSelectProps } from 'antd';

interface Props extends Omit<AntSelectProps, 'defaultValue' | 'value'> {
  defaultValue?: string[];
  value?: string[];
  name?: string;
}

export const Select = ({ value, defaultValue = [], name, ...props }: Props) => {
  const [valueState, setValueState] = useState<string[]>(value ?? defaultValue);

  return (
    <div>
      <AntSelect {...props} value={valueState} defaultValue={defaultValue} onChange={setValueState} />
      <input type="hidden" name={name} value={valueState} />
    </div>
  );
};
