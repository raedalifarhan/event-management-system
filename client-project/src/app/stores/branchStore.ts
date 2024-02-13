import { makeAutoObservable, runInAction } from "mobx";
import agent from "../api/agent";
import { BranchKeyValue } from "../models/branch";

export default class BranchStore {

    branchesKeyValueList: BranchKeyValue [] = [];

    constructor () {
        makeAutoObservable(this);
    }

    loadBranches = async () => {
        try {
            const result = await agent.branches.list();
            runInAction(() => {
                this.branchesKeyValueList = result.data;
            });
        } catch (error) {
            console.log(error);
        }
    }
}