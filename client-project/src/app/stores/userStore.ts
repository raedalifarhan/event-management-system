import { makeAutoObservable, runInAction } from "mobx";
import { User, UserFormValues } from "../models/user";
import agent from "../api/agent";
import { store } from "./store";
import { router } from "../router/Routes";

export default class UserStore {

    user: User | null = null;

    constructor () {
        makeAutoObservable(this);
    }


    get isLoggedIn() {
        return !!this.user;
    }

    login = async (creds: UserFormValues) => {
        store.commonStore.loading = true;
        try {
            const user = await agent.account.login(creds);
            store.commonStore.setToken(user.token!);
            runInAction(() => {
                this.user = user;
                store.commonStore.loading = false;
            })
            router.navigate('/departments');
        } catch (error) {
            runInAction(() => {
                store.commonStore.loading = false;
            })
            throw error;
        }
    }
    
    register = async (creds: UserFormValues) => {
        store.commonStore.loading = true;
        try {
            const user = await agent.account.register(creds);
            store.commonStore.setToken(user.token!);
            runInAction(() => {
                this.user = user;
                store.commonStore.loading = false;
            })
            router.navigate('/departments');
        } catch (error) {
            runInAction(() => {
                store.commonStore.loading = false;
            })
            throw error;
        }
    }

    logout = () => {
        store.commonStore.setToken(null);
        this.user = null;
        router.navigate('/');
    }

    getUser = async () => {
        try {
            const user = await agent.account.current();
            runInAction(() => this.user = user)
        } catch (error) {   
            console.log(error);
        }
    }
}