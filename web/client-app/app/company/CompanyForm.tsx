'use client'

import Input from '@/components/Input';
import { Button } from 'flowbite-react';
import React, { useEffect, useState } from 'react'
import { FieldValues, useForm } from 'react-hook-form'
import { usePathname, useRouter } from 'next/navigation';
import toast from 'react-hot-toast';
import SelectInput from '@/components/SelectInput';
import { CompanyDetailedView, CompanyFormType } from '@/types/companiesTypes';
import agent from '../api/agent';

interface Props {
  company?: CompanyDetailedView
}

interface SelectOptions {
  label: string
  value: string
}

const CompanyForm = ({ company }: Props) => {
  const router = useRouter();
  const pathname = usePathname();
  const [options, setOptions] = useState<SelectOptions[]>([]);

  const { control, handleSubmit, setFocus, reset,
    formState: { isSubmitting, isValid, isDirty, errors } } = useForm({
      mode: 'onTouched'
    });

  useEffect(() => {
    if (company) {
      const {
        violationsAndPenalties, complianceOfficer, companyName, code, oldComericalName,
        phoneNumber, address, commercialRegistrationNo, companyCapital, typeOfActivity,
        branchId, companyType, info
      } = company;

      reset({
        violationsAndPenalties, complianceOfficer, companyName, code, oldComericalName,
        phoneNumber, address, commercialRegistrationNo, companyCapital, typeOfActivity,
        branchId, companyType, info
      });

      const selectOptions: SelectOptions[] = [];
      agent.Branches.list().then(res => {
        res.map(branch => {
          selectOptions.push({ label: branch.branchName, value: branch.id })
        })
      }).then(() => {
        setOptions(selectOptions);
      })
    }
    setFocus('companyName');
  }, [setFocus])


  const onSubmit = async (data: FieldValues) => {
    let id;
    let res;
    try {
      // save company
      if (pathname === '/company/create') {
        res = await agent.Companies.create(data);
        id = res;
        toast.success('Form submitted successfully');
      } else {
        res = await agent.Companies.update(company!.id, data);
        id = company!.id;
        toast.success(`company info updated successfuly`)
      }
      // redirect
      router.push(`/company/details/${id}`);

    } catch (error) {
      toast.error('Error submitting form');
      console.error('Error submitting form:', error);
    }
  };

  return (
    <form className='flex flex-col gap-3' onSubmit={handleSubmit(onSubmit)}>
      <SelectInput
        label='الفرع'
        name='branchId'
        control={control}
        rules={{ required: 'اختيار فرع ضروري' }}
        options={options}
      />

      <div className='grid grid-cols-2 gap-4'>
        <Input label='اسم الشركة' name='companyName'
          control={control}
          rules={{ required: 'اسم الشركة مطلوب' }} />

        <Input label='كود الشركة' name='code'
          control={control}
          rules={{ required: 'كود الشركة مطلوب' }} />
      </div>

      <div className='grid grid-cols-2 gap-4'>
        <Input label='اسم الشركة القديم'
          name='oldComericalName' control={control}
          rules={{ required: 'اسم الشركة مطلوب' }} />

        <Input label='رقم الهاتف'
          name='phoneNumber' control={control}
          rules={{ required: 'رقم الهاتف مطلوب' }} />
      </div>

      <div className='grid grid-cols-2 gap-4'>
        <Input label='العنوان' name='address'
          control={control}
          rules={{ required: 'العنوان مطلوب' }} />

        <Input label='ملاحظات' name='info' control={control}
          rules={{ required: 'حقل الملاحظات مطلوب' }} />
      </div>

      <div className='grid grid-cols-2 gap-4'>
        <Input label='رقم السجل التجاري'
          name='commercialRegistrationNo' control={control}
          rules={{ required: 'Commercial registration number. is required' }} />

        <Input label='رأس المال' name='companyCapital' control={control} type='number'
          rules={{ required: 'حقل رأس المال مطلوب' }} />
      </div>


      <Input label='المخالفات و العقوبات'
        name='violationsAndPenalties'
        control={control}
        rules={{ required: 'حقل المخالفات والعقوبات مطلوب' }} />

      <Input label='الشكاوي'
        name='complianceOfficer'
        control={control}
        rules={{ required: 'حقل الشكاوي مطلوب' }} />

      {/*
      <div className='grid grid-cols-4 gap-4'>
         <Input label='رسوم الطلب' name='applicationFee' control={control} type='number'
          rules={{ required: 'Application Fee is required' }} /> 

       

         <Input label='رسوم الرخصة' name='licenceFee' control={control} type='number'
          rules={{ required: 'Licence Fee is required' }} />

        <Input label='الضمانة المالية' name='financialGuarantee' control={control} type='number'
          rules={{ required: 'Financial Guarantee is required' }} /> 
      </div> */
      }

      {pathname === '/company/create' &&
        <>
          <div className='grid grid-cols-4 gap-4'>
            {/* <DateInput
              label='تاريخ تقديم الطلب'
              name='dateOfApplication'
              control={control}
              type='date'
              dateFormat={'dd MMMM yyyy h:mm a'}
              showTimeSelect
              rules={{ required: 'Date of application is required' }} /> */}

            {/* <DateInput
              label='تاريخ طلب الرخصة'
              name='licenceRequestDate'
              control={control}
              type='date'
              dateFormat={'dd MMMM yyyy h:mm a'}
              showTimeSelect
              rules={{ required: 'Licence request date is required' }} /> */}



            {/* <DateInput label='تاريخ الموافقة المبدأية'
              name='dateOfPreliminaryApproval'
              control={control}
              type='date'
              dateFormat={'dd MMMM yyyy h:mm a'}
              showTimeSelect
              rules={{ required: 'Date of preliminary approval is required' }} /> */}
          </div>
        </>}

      <div className='grid grid-cols-2 gap-4'>
        <SelectInput
          label='نوع الشركة'
          name='companyType'
          control={control}
          rules={{ required: 'Company type is required' }}
          options={[
            { label: 'مكتب', value: 'مكتب' },
            { label: 'شركة', value: 'شركة' },
          ]}
        />

        <SelectInput
          label='نمط النشاط'
          name='typeOfActivity'
          control={control}
          rules={{ required: 'نمط النشاط حقل مطلوب' }}
          options={[
            { label: 'صرافة وحوالات', value: 'صرافة وحوالات' },
            { label: 'صرافة', value: 'صرافة' },
          ]}
        />
      </div>

      <div className='flex justify-between gap-2 items-center'>
        <Button outline color='gray' onClick={() => { router.push('/') }} >الغاء</Button>
        <Button
          isProcessing={isSubmitting}
          disabled={!isValid}
          type='submit'
          outline color='success' >حفظ</Button>
      </div>
    </form>
  )
}

export default CompanyForm