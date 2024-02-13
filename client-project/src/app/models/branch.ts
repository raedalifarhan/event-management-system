export interface Branch {
  id?: string
  address?: string;
  branchName: string
  createDate?: string
  description?: string
  lastUpdateDate?: string
}

export interface BranchKeyValue {
  id: string;
  branchName: string;
}