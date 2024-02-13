'use client'

import Input from '@/components/Input';
import { Button } from 'flowbite-react';
import React, { useEffect, useState } from 'react'
import { FieldValues, useForm } from 'react-hook-form'
import { usePathname, useRouter } from 'next/navigation';
import toast from 'react-hot-toast';
import agent from '../api/agent';
import DateInput from '@/components/DateInput';
import SelectInput from '@/components/SelectInput';

interface Props {
  companyId: string
  licence: Licence | undefined
}

function LicenceForm({ companyId, licence }: Props) {

  const router = useRouter();
  const pathname = usePathname();


  const { control, handleSubmit, setFocus, reset,
    formState: { isSubmitting, isValid, isDirty, errors } } = useForm({
      mode: 'onTouched'
    });

  useEffect(() => {
    if (licence) {
      const {
        licenceNo, licenceRequestStatus, notes, applicationFee, licenceFee, financialGuarantee
      } = licence;

      reset({
        licenceNo, licenceRequestStatus, notes, applicationFee, licenceFee, financialGuarantee
      });
      
    }
    setFocus('licenceNo');
  }, [setFocus, companyId])

  const onSubmit = async (data: FieldValues) => {

    try {
      data.companyId = companyId;

      // save company
      if (!licence) {
        await agent.Licences.create(data);
        toast.success('تم اضافة طلب ترخيص بنجاح');
      }
      else {
        await agent.Licences.update(licence.id, data);
        toast.success(`تم تعديل طلب ترخيص بنجاح`)
      }

      // redirect
      router.push(`/companies/details/${companyId}`);

    } catch (error) {
      toast.error('فشل في ارسال البيانات');
      console.error('Error submitting form:', error);
    }
  };
  return (
    <form className='flex flex-col gap-3' onSubmit={handleSubmit(onSubmit)}>

      <div className='grid grid-cols-2 gap-4'>
        <Input label='رقم الرخصة' name='licenceNo' control={control} type='text'
          rules={{ required: 'رقم الرخصة حقل مطلوب' }} />

        <Input label='رسوم الرخصة' name='licenceFee' control={control} type='number'
          rules={{ required: 'رسوم طلب الترخيص حقل مطلوب' }} />

      </div>
      <div className='grid grid-cols-2 gap-4'>
        <Input label='رسوم التقديم' name='applicationFee' control={control} type='number'
          rules={{ required: 'رسوم التقديم حقل مطلوب' }} />
        <Input label='الضمانة المالية' name='financialGuarantee' control={control} type='number'
          rules={{ required: 'الضمانة المالية حق ملطوب' }} />

        {/* <DateInput
          label='تاريخ الطلب'
          name='dateOfApplication'
          control={control}
          type='date'
          dateFormat={'dd MMMM yyyy h:mm a'}
          showTimeSelect
          rules={{ required: 'تاريخ الطلب مطلوب' }} /> */}

      </div>

      {licence &&
        <>
          <SelectInput
            label='حالة طلب الرخصة'
            name='licenceRequestStatus'
            control={control}
            rules={{ required: 'طلب الرخصة حقل مطلوب' }}
            options={[
              { label: 'قيد الانجاز', value: 'قيد الانجاز' },
              { label: 'موافقة مبدئية', value: 'موافقة مبدئية' },
              { label: 'موافقة نهائية', value: 'موافقة نهائية' },
            ]}
          />
        </>}

      <Input label='ملاحظات' name='notes' control={control} type='text'
        rules={{ required: 'الملاحظات حقل مطلوب' }} />

      <div className='flex justify-between gap-2 items-center'>
        <Button
          outline
          color='gray'
          onClick={() => { router.push(`/companies/details/${companyId}`) }}
        >الغاء</Button>

        <Button
          isProcessing={isSubmitting}
          disabled={!isValid}
          type='submit'
          outline color='success' >حفظ</Button>
      </div>
    </form>
  )
}

export default LicenceForm