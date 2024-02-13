import Headings from '@/components/company/Headings'
import React from 'react'
import LicenceForm from '../../LicenceForm'

function CreateLicence({ params }: { params: { companyId: string }}) {
  return (
    <div className='mx-auto max-w-[75%] rounded-lg shadow-lg p-10 bg-white'>
    <Headings title='تقديم طلب ترخيص' subtitle='ادخل تفاصيل طلب الترخيص بالكامل او قيمة افراضية.' />
    <LicenceForm licence={undefined} companyId={params.companyId} />
  </div>
  )
}

export default CreateLicence