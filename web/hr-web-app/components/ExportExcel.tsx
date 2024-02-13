import axios from 'axios';
import { Button } from 'flowbite-react';
import { useSession } from 'next-auth/react';
import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';

const ExportExcel = () => {
  const [loading, setLoading] = useState(false);

  const handleExportExcel = async () => {
    try {
      setLoading(true);
      const response = await axios.get('http://localhost:7000/api/assests', { responseType: 'blob' }); // تعيين نوع الاستجابة للـ blob
      const blob = new Blob([response.data], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' }); // تغيير نوع البلوب
      const downloadUrl = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = downloadUrl;
      link.download = 'companies.xlsx';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      toast.success(`جاري استخراج بيانات الشركات في ملف اكسل.`)
    } catch (error) {
      toast.error(`خطأ في استخراج الملف`)
      console.error('Error exporting Excel:', error);
    } finally {
      setLoading(false);
    }
  };

  const { data: session } = useSession();

  return (
    <div>
      {session?.user?.role === 'ADMIN' &&
      <Button outline onClick={handleExportExcel} disabled={loading} >
        {loading ? ' جاري استخراج البيانات...' : 'استخراج بيانات الشركات'}
      </Button>
      }
    </div>
  );
};

export default ExportExcel;
