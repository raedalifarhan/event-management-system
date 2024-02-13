'use client'

import React, { useState } from 'react'
import { FaSearch } from 'react-icons/fa'
import { GrPowerReset } from "react-icons/gr";

interface Props {
    search: (term: string) => void
    reset: () => void
}

const Search = ({search, reset}: Props) => {
    const [searchValue, setSearchValue] = useState('')

    function onChange(event: any) {
        setSearchValue(event.target.value)
    }

    const resetSearchValue = () => {
        setSearchValue('')
    }

    return (
        <div className='flex w-[30%] items-center border-2 rounded-full py-2 shadow-sm bg-gray-50'>
            <input
                value={searchValue}
                onChange={onChange}
                type="text"
                placeholder='البحث عن طريق اسم او زمر الشركة'
                className='
                    flex-grow
                    pl-5
                    bg-transparent
                    focus:outline-none
                    border-transparent
                    focus:border-transparent
                    focus:ring-0
                    text-base
                  text-gray-600
                '
            />
            <button onClick={() => search(searchValue)}>
                <FaSearch
                    size={34}
                    className={'bg-red-400 text-white rounded-full p-2 curser-pointer mx-2'} />
            </button>

            <button onClick={reset}>
                <GrPowerReset onClick={resetSearchValue}
                    size={34}
                    className={'bg-sky-400 text-white rounded-full p-2 curser-pointer mx-2'} />
            </button>
        </div>
    )
}

export default Search