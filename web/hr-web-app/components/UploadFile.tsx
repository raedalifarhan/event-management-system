"use client"

import agent from '@/app/api/agent';
import { Button } from 'flowbite-react';
import { usePathname, useRouter } from 'next/navigation';
import React, { useState, ChangeEvent } from 'react';
import toast from 'react-hot-toast';

interface Props {
    label: string;
    id: string;
    updatePage: () => void;
}

function UploadFile({ label, id, updatePage }: Props,) {

    const [loading, setLoading] = useState(false);
    const [file, setFile] = useState<File | null>(null);
    const router = useRouter();

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const selectedFile = e.target.files && e.target.files[0];
        setFile(selectedFile);
    };

    const handleFileUpload = async () => {

        setLoading(true);

        if (!file) {
            console.error('No file selected');
            toast.error(`لم تختر ملف`)
            setLoading(false)
            return;
        }

        const formData = new FormData();
        formData.append('file', file);
        formData.append('id', id);

        try {
            const response = await agent.Assests.addFile(formData)

            if (response) {
                toast.success('تم تحميل الملف');
                console.log(`${label} uploaded successfully`);
            } else {
                toast.success('فشل تحميل الملف');
                console.error(`Failed to upload ${label}`);
            }
        } catch (error) {
            console.error(`Error uploading ${label}`, error);
        } finally {
            setLoading(false)
        }
    };

    return (
        <div className='flex items-center gap-2 text-sm' onClick={updatePage}>
            <input
                className='hover:bg-slate-600 hover:text-slate-200 border-2 rounded-lg pr-2 py-1.5 border-slate-900'
                type="file"
                onChange={handleFileChange} />

            <Button onClick={handleFileUpload} className='py-2' disabled={loading} >
                {loading ? 'جاري رفع الملف...' : 'حفظ الملف'}
            </Button>
        </div>
    );
}

export default UploadFile;