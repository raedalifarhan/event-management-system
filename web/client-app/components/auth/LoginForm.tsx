'use client'
import { UserFormValues } from '@/types/userTypes';
import { Button } from 'flowbite-react'
import { usePathname, useRouter } from 'next/navigation';
import React from 'react'
import { FieldValues, useForm } from 'react-hook-form'
import Input from '../Input';

interface Props {
    user: UserFormValues;
}

function LoginForm({ user }: Props) {

    const router = useRouter();
    const pathname = usePathname();

    const {
        control, handleSubmit, formState: { isSubmitting, isValid, isDirty, errors }
    } = useForm({
        mode: 'onTouched'
    });

    const onSubmit = async (data: FieldValues) => {
        console.log(data);

    }

    return (
        <form className='flex flex-col gap-3' onSubmit={handleSubmit(onSubmit)}>

            <Input label='البريد الالكبروني' name='email'
                control={control}
                rules={{ required: 'البريد الالكتروني مطلوب' }} />

            <Input label='كلمة المرور' name='password'
                control={control}
                rules={{ required: 'كلمة المرور حقل مطلوب' }} />


            <Button
                isProcessing={isSubmitting}
                disabled={!isValid}
                type='submit'
                outline color='success' >تسجيل الدخول</Button>

        </form>
    )
}

export default LoginForm