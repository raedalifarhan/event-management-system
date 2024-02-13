
import { Button } from 'flowbite-react'
import React from 'react'
import toast from 'react-hot-toast';

interface Props {
    fileName: string
}

const DownloadFileButton = ({fileName}: Props) => {


    const downloadFile = async () => {
        try {
          const response = await fetch(`http://localhost:7000/api/assests/${fileName}`);
          
          if (response.ok && fileName) {
            const blob = await response.blob();
            const url = window.URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = `${fileName.substring(14, fileName.length)}`;
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
            toast.success(`تم تحميل الملف بنجاح...`)
          } else {
            console.error('Failed to download file');
            toast.error(`خطأ في تحميل الملف`)
          }
        } catch (error) {
          console.error('Error downloading file:', error);
        }
      };
      

    return (
        <div>
          
          {fileName ?
          (<Button outline onClick={downloadFile}>تنزيل الملف</Button>):(
            <p>لا يوجد ملف</p>
          )}
        </div>
    )
}

export default DownloadFileButton