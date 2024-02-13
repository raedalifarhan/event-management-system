import { Button } from 'flowbite-react'
import Link from 'next/link'
import React from 'react'

interface Props {
    id: string
}

const EditButton = ({id}: Props) => {
  return (
    <Button outline>
        <Link href={`/company/update/${id}`}>تعديل بيانات الشركة</Link>
    </Button>
  )
}

export default EditButton