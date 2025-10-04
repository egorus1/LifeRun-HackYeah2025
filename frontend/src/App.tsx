import {AppRouter} from "@/app/providers/RouterProvider.tsx";
import {Header} from "@/components/Header.tsx";

export function App() {
    return <div className="min-h-[100vh] bg-bgColor flex flex-col">
        <Header/>
        <div className="w-full h-5 bg-[#9498AE80] rounded-b-lg"></div>
        <main className={"flex-1 px-12"}>
            <AppRouter/>
        </main>
    </div>
}