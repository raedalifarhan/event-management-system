import Headings from "@/components/company/Headings"
import CompanyForm from "../CompanyForm"

const Create = () => {
  return (
    <div className='mx-auto max-w-[75%] rounded-lg shadow-lg p-10 bg-white'>
      <Headings title='ادخل بيانات الشركة' subtitle='ادخل تفاصيل الشركة بالكامل او قيمة افراضية.' />
      <CompanyForm />
    </div>
  )
}

export default Create