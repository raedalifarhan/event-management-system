import { Button } from "flowbite-react";

// import { AiOutlineSortAscending, AiOutlineClockCircle } from "react-icons/ai"

// const orderButtons = [
//     {
//         label:'Alphabetical',
//         icon: AiOutlineSortAscending,
//         value: 'Company Name'
//     },
//     {
//         label:'Alphabetical',
//         icon: AiOutlineClockCircle,
//         value: 'Code'
//     },
//     {
//         label:'Alphabetical',
//         icon: AiOutlineSortAscending,
//         value: 'Company Name'
//     }
// ]
const PageSizeButtons = [2, 4, 8, 12]

interface Props {
    handleSetPageSize: (page: number) => void;
    pageSize: number
}

const Filters = ({ handleSetPageSize, pageSize }: Props) => {

    return (
        <div>
            <span className='uppercase text-sm text-gray-500 ml-2'>عدد العناصر</span>
            <Button.Group dir="ltr">
                {PageSizeButtons.map((value, i) => (
                    <Button
                        key={i}
                        onClick={() => handleSetPageSize(value)}
                        color={`${pageSize === value ? 'red' : 'gray'}`}
                        className='focus-ring-0' >
                        {value}
                    </Button>
                ))}
            </Button.Group>
        </div>
    )
}

export default Filters