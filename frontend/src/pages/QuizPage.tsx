import {Quiz} from "@/components/Quiz.tsx";
import {useEffect} from "react";
import {useNavigate} from "react-router-dom";
import {hasToken} from "@/shared/lib/token.ts";
import {RoutePaths} from "@/shared/config/routeConfig.tsx";
import bg from "@/shared/assets/bg.png";

export const QuizPage = () => {
    const navigate = useNavigate();

    useEffect(() => {
        if (hasToken()) {
            navigate(RoutePaths.dashboard);
        }
    }, [navigate]);

    return (
        <div className="flex justify-center items-center h-screen bg-cover bg-center bg-no-repeat" style={{backgroundImage: `url(${bg})`}}>
            <Quiz/>
        </div>
    )
}