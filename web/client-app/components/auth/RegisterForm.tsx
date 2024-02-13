'use client'

import React, { useEffect, useState } from 'react'
import Input from '../Input'
import { FieldValues, useForm } from 'react-hook-form';
import { usePathname, useRouter } from 'next/navigation';
import { Button } from 'flowbite-react';
import { UserFormValues } from '@/types/userTypes';
import SelectInput from '../SelectInput';
import agent from '@/app/api/agent';

interface Props {
  user: UserFormValues;
}

interface SelectOptions {
  label: string
  value: string
}

function RegisterForm({ user }: Props) {

  const router = useRouter();
  const pathname = usePathname();
  const [options, setOptions] = useState<SelectOptions[]>([]);

  const {
    control, handleSubmit, setFocus, formState: { isSubmitting, isValid, isDirty, errors }
  } = useForm({
    mode: 'onTouched'
  });

  useEffect(() => {
    const selectOptions: SelectOptions[] = [];
      agent.Branches.list().then(res => {
        res.map(branch => {
          selectOptions.push({ label: branch.branchName, value: branch.id })
        })
      }).then(() => {
        setOptions(selectOptions);
    })
    setFocus('displayName');
  }, [setFocus])

  const onSubmit = async (data: FieldValues) => {
    console.log(data);
    
  }

  return (
    <form className='flex flex-col gap-3' onSubmit={handleSubmit(onSubmit)}>

      <Input label='الاسم الظاهر' name='displayName'
        control={control}
        rules={{ required: 'الاسم الظاهر حقل مطلوب' }} />

      <Input label='اسم المستخدم' name='username'
        control={control}
        rules={{ required: 'اسم المستخدم حقل مطلوب' }} />

      <Input label='البريد الالكبروني' name='email'
        control={control}
        rules={{ required: 'البريد الالكتروني مطلوب' }} />

      <Input label='كلمة المرور' name='password'
        control={control}
        rules={{ required: 'كلمة المرور حقل مطلوب' }} />

      <SelectInput
        label='الفرع'
        name='branchId'
        control={control}
        rules={{ required: 'اختيار فرع ضروري' }}
        options={options}
      />


      <Button
        isProcessing={isSubmitting}
        disabled={!isValid}
        type='submit'
        outline color='success' >تسجيل</Button>

    </form>
  )
}

export default RegisterForm