import { useStore } from "../stores/store"

const ServerError = () => {
    const { commonStore } = useStore();

    return (
        <div className="bg-slate-200 p-5 m-5 flex flex-col gap-5">
            <h3 className="p-3 m-1">Server Error</h3>
            <p className="text-red-600 p-3 m-1">{commonStore.error?.message}</p>
            <section className="bg-slate-300 p-3 m-1">
                {commonStore.error?.details &&
                <div>{commonStore.error.details}</div>}
            </section>
        </div>
    )
}

export default ServerError