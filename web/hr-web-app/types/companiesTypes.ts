import { PagingParams } from "./PaginationType";

export class CompanyParams extends PagingParams {
  searchTerm: string;

  constructor(searchTerm: string, pageNumber: number = 1, pageSize: number = 12) {
    super(pageNumber, pageSize);
    this.searchTerm = searchTerm;
  }
}

export interface Company {
  id: string;
  code: string;
  companyName: string;
  licenceStatus: string;
  address: string;
  phoneNumber: string;
  imageUrl: string;
  companyCapital: number;
}

export interface CompanyFormType {
  code: string
  companyName: string
  oldComericalName: string
  phoneNumber: string
  address: string
  companyCapital: number
  licenceStatus: string
  info: string
  companyType: string
  namesOfPartners: string
  typeOfActivity: string
  commercialRegistrationNo: string
  violationsAndPenalties: string
  geographicalLocation: string
  complianceOfficer: string
  branchId: string
}

export interface CompanyDetailedView extends CompanyFormType
{
  imageUrl: string
  fileUrl: string
  createDate: string
  updateDate: string
  branchId: string
  id: string
  lastUpdateDate: string
}

