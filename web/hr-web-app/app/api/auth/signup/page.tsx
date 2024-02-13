import RegisterForm from '@/components/auth/RegisterForm'
import Headings from '@/components/company/Headings'
import React from 'react'

const SignUp = () => {
  return (
    <div className='mx-auto max-w-[40%] rounded-lg shadow-lg p-10 bg-slate-100 text-slate-800'>
    <Headings title='تسجيل مستخدم جديد الى النظام' subtitle='ادخل بيانات المستخدم الجديد مع تحديد الفرع الخاص بالمستخدم به.' />
    <RegisterForm />
  </div>
  )
}

export default SignUp