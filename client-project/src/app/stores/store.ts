
import BranchStore from "./branchStore";
import DepartmentStore from "./departmentStore";
import { createContext, useContext } from "react";
import userStore from "./userStore";
import UserStore from "./userStore";
import CommonStore from "./CommonStore";

interface Store {
    departmentStore: DepartmentStore;
    branchStore: BranchStore;
    userStore: userStore;
    commonStore: CommonStore;
}

export const store: Store = {
    departmentStore: new DepartmentStore(),
    branchStore: new BranchStore(),
    userStore: new UserStore(),
    commonStore: new CommonStore(),
}

export const StoreContext = createContext(store);

export function useStore() {
    return useContext(StoreContext);
}