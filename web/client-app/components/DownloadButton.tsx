import { downloadFileFromServer } from '@/app/actions/companyActions';
import { Button } from 'flowbite-react'
import React from 'react'
import toast from 'react-hot-toast';

interface Props {
    fileName: string
}

const DownloadButton = ({fileName}: Props) => {

    const downloadFile = async () => {
        try {
          const response = await fetch(`http://localhost:7000/api/companies/download/${fileName}`);
          
          if (response.ok) {
            const blob = await response.blob();
            const url = window.URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = `${fileName.substring(14, fileName.length)}`;
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
            toast.success(`file downloaded successfuly...`)
          } else {
            console.error('Failed to download file');
            toast.error(`Failed to download file`)
          }
        } catch (error) {
          console.error('Error downloading file:', error);
        }
      };

    return (
        <Button onClick={downloadFile}>تنزيل الملف</Button>
    )
}

export default DownloadButton