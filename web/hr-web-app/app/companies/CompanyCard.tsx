import { Company } from '@/types/companiesTypes'

import Link from 'next/link';
import React from 'react'
import CompanyImg from './CompanyImg';
import { IoLogoWhatsapp } from "react-icons/io5";
import { AiOutlinePhone } from "react-icons/ai";

interface Props {
    company: Company;
}

const CompanyCard = ({ company }: Props) => {
    return (
        <div className='relative'>
            <div className='flex p-2 my-2 text-slate-500 rounded-sm items-center justify-between border-x-2 border-slate-200'>
                <strong>{company.companyName} - {company.code}</strong>
                <div className='flex justify-between gap-2 items-center'>
                    <Link href={`https://wa.me/${company.phoneNumber}`}><IoLogoWhatsapp size={30}  /></Link>
                    <Link href={`tel:${company.phoneNumber}`}><AiOutlinePhone size={30} /></Link>
                </div>
            </div>
            <div className='w-full aspect-w-16 aspect-h-10 bg-gray-200 aspect-video rounded-sm overflow-hidden'>
                <Link href={`/companies/details/${company.id}`}>
                    <CompanyImg imageUrl={company.imageUrl} />

                    <div className='absolute bottom-2 left-2 text-slate-200'>
                        <div className={`${company.licenceStatus == 'Active' ? 'bg-green-700' : 'bg-yellow-700'}
                                rounded-md text-base p-2`}>
                            {company.licenceStatus}
                        </div>
                    </div>
                </Link>
            </div>
            <div className='flex justify-between items-center gap-4 mt-4 text-sm border-b-2 rounded-sm p-2 text-slate-500 border-slate-200'>
                <p className='font-semibold'><strong>رأس المال | </strong>{company.companyCapital}</p>
                <p className='font-semibold'><strong>العنوان | </strong>{company.address}</p>
            </div>
        </div>
    )
}

export default CompanyCard