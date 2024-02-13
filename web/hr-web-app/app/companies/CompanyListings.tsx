'use client'

import { Company } from '@/types/companiesTypes';
import { useEffect, useState } from 'react';
import CompanyCard from './CompanyCard';
import agent from '../api/agent';
import LoadingComponent from '@/components/LoadingComponent';
import AppPagination from '@/components/company/AppPagination';
import { Pagination } from '@/types/PaginationType';
import Search from '@/components/Search';
import Link from 'next/link';
import { FaAddressCard } from "react-icons/fa";
import toast from 'react-hot-toast';
import Filters from './Filters';
import ExportExcel from '@/components/ExportExcel';

const CompanyListings = () => {

    const [companies, setCompanies] = useState<Company[]>();
    const [pagination, setPagination] = useState<Pagination>({ currentPage: 1, totalPages: 0, totalItems: 0 });
    const [pageSize, setPageSize] = useState(12);
    const [searchTerm, setSearchTerm] = useState('');

    const onPageChange = (page: number) => {
        setPagination({ ...pagination, currentPage: page })
    }

    const axiosParams = () => {
        const params = new URLSearchParams()

        params.append('pageNumber', pagination.currentPage.toString())
        params.append('pageSize', pageSize.toString())
        params.append('searchTerm', searchTerm)

        return params
    }

    useEffect(() => {
        const params = axiosParams();

        agent.Companies.list(params)
            .then(res => {
                setCompanies(res.data);
                setPagination(res.pagination);
            }).catch((error) => {
                toast.error(`${error}`)
            })
    }, [pagination.currentPage, pageSize, searchTerm])

    if (!companies) return <LoadingComponent label='جاري تحميل البيانات ...' />

    const handleSetPageSize = (size: number) => {
        setPageSize(size)
    }

    const search = (term: string) => {
        setSearchTerm(term);
    }

    const reset = () => {
        setSearchTerm('');
        setPageSize(12)
        setPagination({ ...pagination, currentPage: 1 })
        setSearchTerm('')
    }

    return (
        <>
            <div className='flex items-center gap-5 justify-between mb-7'>
                <Link href={'/companies/create'}
                    className="
                        flex items-center justify-between gap-2
                        rounded-md bg-orange-800 hover:bg-slate-900 text-slate-300
                        py-2 px-4 text-base">
                    <FaAddressCard />
                    <strong>إضافة شركة</strong>
                </Link>
                <Search search={search} reset={reset} />
                <div className='flex gap-4 items-center'>
                    <ExportExcel />
                    <Filters pageSize={pageSize} handleSetPageSize={handleSetPageSize} />
                </div>
            </div>

            <div className='grid grid-cols-2 md:grid-cols-4 gap-6'>

                {companies && companies.map(company => (
                    <CompanyCard company={company} key={company.id} />
                ))}
            </div>
            <div className='flex justify-center mt-4'>

                <AppPagination pageChanged={onPageChange}
                    pageCount={pagination!.totalPages} pageNumber={pagination!.currentPage} />
            </div>
        </>
    )
}

export default CompanyListings