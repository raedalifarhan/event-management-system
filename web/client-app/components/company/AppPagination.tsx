'use client';

import { Pagination } from 'flowbite-react';

interface Props {
    pageNumber: number
    pageCount: number
    pageChanged: (page: number) => void
}

const AppPagination = ({pageNumber, pageCount, pageChanged}: Props) => {
    return (
        <Pagination dir="ltr"
            previousLabel="السابق"
            nextLabel="التالي"
            currentPage={pageNumber}
            totalPages={pageCount}
            onPageChange={e => pageChanged(e)}
            showIcons={true}
            className='text-blue-500 mb-5 PaginationDitRTL'      
        />
    )
}

export default AppPagination