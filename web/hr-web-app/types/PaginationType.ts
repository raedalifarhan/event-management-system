
export interface Pagination
{
  currentPage: number
  totalItems: number
  totalPages: number
}

export class PaginatedResult<T> {
    data: T
    pagination: Pagination

    constructor(data: T, pagination: Pagination) {
        this.data = data
        this.pagination = pagination
    }
}

export class PagingParams
{
  pageNumber = 1 
  pageSize = 12

  constructor(pageNumber: number, pageSize: number) {
    this.pageNumber = pageNumber;
    this.pageSize = pageSize;
  }
}