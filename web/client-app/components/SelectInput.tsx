import React from 'react';
import { Select as FlowbiteSelect, Label } from 'flowbite-react';
import { UseControllerProps, useController } from 'react-hook-form';

type Props = {
  label: string;
  options: { label: string; value: string }[];
  showLabel?: boolean;
} & UseControllerProps;

const SelectInput = (props: Props) => {
  const { field, fieldState } = useController({ ...props, defaultValue: '' });

  return (
    <div className='mb-3'>
      {props.showLabel && (
        <div className='mb-2 block'>
          <Label htmlFor={field.name} value={props.label} />
        </div>
      )}
      <FlowbiteSelect
        {...props}
        {...field}
        style={{ padding: '15px' }}
        color={fieldState.error ? 'failure' : !fieldState.isDirty ? '' : 'success'}
        helperText={fieldState.error?.message}
      >
        <option value='' disabled hidden>
          اختر {props.label}
        </option>
        {props.options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </FlowbiteSelect>
    </div>
  );
};

export default SelectInput;
