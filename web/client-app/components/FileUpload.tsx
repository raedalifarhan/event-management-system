"use client"

import { Button } from 'flowbite-react';
import React, { useState, ChangeEvent } from 'react';

interface Props {
  label: string;
  id: string,
}

function FileUpload({label, id}: Props, ) {
  const [file, setFile] = useState<File | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const selectedFile = e.target.files && e.target.files[0];
      setFile(selectedFile);
  };

    const handleFileUpload = async () => {
        if (!file) {
            console.error('No file selected');
            return;
        }

        const formData = new FormData();
        formData.append('file', file);
        formData.append('id', id);

        // try {
        //     const response = await UploadFile(formData);

        //     if (response.ok) {
        //         console.log(`${label} uploaded successfully`);
        //     } else {
        //         console.error(`Failed to upload ${label}`);
        //     }
        // } catch (error) {
        //     console.error(`Error uploading ${label}`, error);
        // }
    };

    return (
        <div className='flex items-center gap-2 text-sm'>
            <input
              className='hover:bg-slate-600 hover:text-slate-200 border-2 rounded-lg pr-2 py-1.5 border-slate-900'
              type="file"
              onChange={handleFileChange} />

            <Button onClick={handleFileUpload} className='py-2 outline' >حفظ</Button>
        </div>
    );
}

export default FileUpload;
