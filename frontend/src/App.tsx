import {AppRouter} from "@/app/providers/RouterProvider.tsx";
import {Header} from "@/components/Header.tsx";

export function App() {
    return <div className="min-h-[100vh] bg-bgColor flex flex-col">
        <Header/>
        <main className={"flex-1"}>
            <AppRouter/>
        </main>
    </div>
}