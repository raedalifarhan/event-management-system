import { error } from 'console'
import { Label, TextInput } from 'flowbite-react'
import React from 'react'
import { UseControllerProps, useController } from 'react-hook-form'

type Props = {
    label: string
    type?: string
    showLabel?: boolean
} & UseControllerProps

const Input = (props: Props) => {
    const { field, fieldState } = useController({ ...props, defaultValue: '' })

    return (
        <div className='mb-3'>
            {props.showLabel && (
                <div className='mb-2 block'>
                    <Label htmlFor={field.name} value={props.label} />
                </div>
            )}

            <TextInput
                {...props}
                {...field}
                style={{padding: '15px'}}
                type={props.type || 'text'}
                placeholder={props.label}
                color={fieldState.error ? 'failure' : !fieldState.isDirty ? '':'success'}
                helperText={fieldState.error?.message}
            />
        
        </div>
    )
}

export default Input