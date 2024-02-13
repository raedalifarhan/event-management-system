'use client'

import agent from "@/app/api/agent";
import { CompanyDetailedView } from "@/types/companiesTypes";
import { useEffect, useState } from "react";
import CompanyImg from "../../CompanyImg";
import Headings from "@/components/company/Headings";
import CompDetailsTabs from "../CompDetailsTabs";
import EditButton from "../../update/[id]/EditButton";
import Link from "next/link";
import { Button } from "flowbite-react";

export default function Details({ params }: { params: { id: string } }) {
  const [company, setCompany] = useState<CompanyDetailedView>();
  const [uploadClick, setUploadClick] = useState(0);

  useEffect(() => {
    agent.Companies.details(params.id).then(res => {
      setCompany(res);
    });
  }, [uploadClick])

  if (!company) return <p>Loading...</p>

  function updatePage() {
    setUploadClick(1 + uploadClick);
  }
  // Perform a null check before using startsWith
  const imageSrc = company.imageUrl && company.imageUrl.startsWith('http')
    ? company.imageUrl
    : `http://localhost:7000/images/${company.imageUrl}`;

  return (
    <div className=" flex flex-col gap-10 w-full mx-auto max-w-[90%] rounded-lg shadow-lg p-10 bg-white text-slate-800">
      <div className='grid grid-cols-3 gap-4 '>
        <div>
          <Headings title={`تفاصيل عن  ${company.companyName}`} subtitle={`${company.info}`} />
          <hr className="my-4" />

          <div className="flex gap-2">
          <EditButton id={company?.id} />
          <Button outline>
            <Link href={`/licences/create/${company.id}`}>أضافة طلب ترخيص</Link>
          </Button>
          <Button outline >
              <Link href={`/licences/update/${company.id}`} >تحديث الترخيص</Link>
            </Button>
          </div>

          <strong>النمط</strong>
          <p className="mb-2">{company.companyType}</p>

          <strong>الرمز</strong>
          <p className="mb-2">{company.code}</p>

          <strong>رقم السجيل التجاري</strong>
          <p className="mb-2">{company.commercialRegistrationNo}</p>

          <strong>رقم الهاتف</strong>
          <p className="mb-2">{company.phoneNumber}</p>

          <strong>العنوان</strong>
          <p className="mb-2">{company.address}</p>

          <strong>حالة الرخصة</strong>
          <p className="mb-2 ">
            <span className="bg-sky-200 p-1 rounded-md">
              {company.typeOfActivity}
            </span></p>

        </div>

        <div className="col-span-2 overflow-clip aspect-w-16 aspect-h-10">
          <CompanyImg imageUrl={imageSrc} />
        </div>
      </div>

      <CompDetailsTabs company={company} updatePage={updatePage} />
    </div>

  );
}