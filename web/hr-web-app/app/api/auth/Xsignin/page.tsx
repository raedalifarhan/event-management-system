import LoginForm from '@/components/auth/LoginForm'
import Headings from '@/components/company/Headings'
import React from 'react'

const SignIn = () => {
  return (
    <div className='mx-auto max-w-[40%] rounded-lg shadow-lg p-10 bg-slate-100 text-slate-800'>
      <Headings title='تسجيل الدخول الى النظام' subtitle='ادخل بيانات المستخدم لتسجيل الدخول الى النظام.' />
      <LoginForm  />
    </div>
  )
}

export default SignIn