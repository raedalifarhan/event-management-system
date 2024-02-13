interface Props {
    currentPage: number;
    totalPages: number;
    onPageChange: (page: number) => void;
}

const Pagination = ({ currentPage, totalPages, onPageChange }: Props) => {
  const isFirstPage = currentPage === 1;
  const isLastPage = currentPage === totalPages;

  const handleFirstPage = () => {
    if (!isFirstPage) {
      onPageChange(1);
    }
  };

  const handlePrevPage = () => {
    if (!isFirstPage) {
      onPageChange(currentPage - 1);
    }
  };

  const handleNextPage = () => {
    if (!isLastPage) {
      onPageChange(currentPage + 1);
    }
  };

  const handleLastPage = () => {
    if (!isLastPage) {
      onPageChange(totalPages);
    }
  };

  const handlePageNumber = (pageNumber: number) => {
    onPageChange(pageNumber);
  };

  const generatePageNumbers = () => {
    const pageNumbers = [];
    const maxVisiblePages = 5; // Change this value to adjust the number of visible page numbers

    let startPage = Math.max(1, currentPage - Math.floor(maxVisiblePages / 2));
    let endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);

    if (totalPages > maxVisiblePages && endPage - startPage + 1 < maxVisiblePages) {
      startPage = endPage - maxVisiblePages + 1;
    }

    for (let i = startPage; i <= endPage; i++) {
      pageNumbers.push(i);
    }

    return pageNumbers;
  };

  const pageNumbers = generatePageNumbers();

  return (
    <div className="flex justify-center mt-4">
      <ul className="flex list-none rounded border border-gray-300">
        <li
          className={`cursor-pointer ${
            isFirstPage ? 'pointer-events-none opacity-50' : 'hover:bg-blue-200'
          } px-3 py-1 border-r border-gray-300`}
          onClick={handleFirstPage}
        >
          First
        </li>
        <li
          className={`cursor-pointer ${
            isFirstPage ? 'pointer-events-none opacity-50' : 'hover:bg-blue-200'
          } px-3 py-1 border-r border-gray-300`}
          onClick={handlePrevPage}
        >
          Previous
        </li>
        {pageNumbers.map((number) => (
          <li
            key={number}
            className={`cursor-pointer ${
              currentPage === number ? 'bg-blue-500 text-white' : 'hover:bg-blue-200'
            } px-3 py-1 border-r border-gray-300`}
            onClick={() => handlePageNumber(number)}
          >
            {number}
          </li>
        ))}
        <li
          className={`cursor-pointer ${
            isLastPage ? 'pointer-events-none opacity-50' : 'hover:bg-blue-200'
          } px-3 py-1 border-r border-gray-300`}
          onClick={handleNextPage}
        >
          Next
        </li>
        <li
          className={`cursor-pointer ${
            isLastPage ? 'pointer-events-none opacity-50' : 'hover:bg-blue-200'
          } px-3 py-1 border-r border-gray-300`}
          onClick={handleLastPage}
        >
          Last
        </li>
      </ul>
    </div>
  );
};

export default Pagination;
