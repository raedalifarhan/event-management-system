import React from 'react'
import { Tabs } from 'flowbite-react';
import { HiAdjustments, HiUserCircle } from 'react-icons/hi';
import { MdDashboard } from 'react-icons/md';
import { CompanyDetailedView } from '@/types/companiesTypes';
import DownloadFileButton from '@/components/DownloadFileButton';
import UploadFile from '@/components/UploadFile';

type Props = {
  company: CompanyDetailedView;
  updatePage: () => void;
}

function CompDetailsTabs({ company, updatePage }: Props) {
  return (
    <div className="overflow-x-auto">
      <Tabs aria-label="Full width tabs" style="fullWidth">

        <Tabs.Item
          active
          title="الملفات"
          icon={MdDashboard}>

          <DownloadFileButton fileName={company?.fileUrl} />

        </Tabs.Item>

        <Tabs.Item title="رفع ملف" icon={HiUserCircle}>
          <div className='grid grid-cols-2'>
            <div className='flex flex-col gap-3 '>
              <p>رفع ملف بصيغة .pdf</p>
              <UploadFile id={company.id} label={'ملف'} updatePage={updatePage} />
            </div>

            <div className='flex flex-col gap-3 ' >
              <p>رفع صورة بصيغة ".jpeg", ".gif", ".png", ".jpg"</p>
              <UploadFile id={company.id} label={'صورة'} updatePage={updatePage} />
            </div>
          </div>
        </Tabs.Item>

        <Tabs.Item
          title="التراخيص"
          icon={HiAdjustments}>
            
        </Tabs.Item>

      </Tabs>
    </div>
  )
}

export default CompDetailsTabs