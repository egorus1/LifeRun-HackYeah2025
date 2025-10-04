import {AppRouter} from "@/app/providers/RouterProvider.tsx";

export function App() {
    return <div className="min-h-[100vh] bg-black-custom flex flex-col">
        <header className={"bg-[#20202078] h-20"}>

        </header>
        <main className={"flex-1 "}>
            <AppRouter/>
        </main>
    </div>
}