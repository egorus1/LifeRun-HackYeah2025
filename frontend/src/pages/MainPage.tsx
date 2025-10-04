import {Link} from "react-router-dom";
import {RoutePaths} from "@/shared/config/routeConfig.tsx";

export const MainPage = () => {
    return (
        <div className={"mt-20 flex"}>
            <div className="w-1/2">
                <div className="inline-block">
                    <h3 className={"text-9xl text-greenCustom font-bold"}>Welcome ...</h3>
                    <div className="w-[80%] h-5 bg-[#9498AE80] rounded-lg mx-auto"></div>
                </div>
                <div className={"w-[80%] mx-auto mt-20"}>
                    <p className={"text-2xl"}>Imagine it’s 2060. You’ve worked, traveled, and survived all the adulting
                        chaos… and now you
                        finally have the freedom to live wherever you want. Somewhere that makes your future self grin
                        every morning.</p>
                </div>
                <div className="mt-23 text-center">
                    <Link to={RoutePaths.quiz}>
                        <button className={"bg-purpleCustom px-8 py-2 rounded-2xl text-white"}>
                            Tell us about yourself.
                        </button>
                    </Link>
                </div>
            </div>
            <div className="w-1/2 flex flex-col gap-4">
                <div className="w-full h-60 bg-gray-400 rounded-lg"></div>
                <div className="w-full h-40 bg-gray-400 rounded-lg"></div>
            </div>
        </div>
    )
}