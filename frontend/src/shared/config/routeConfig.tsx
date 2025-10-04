import {MainPage} from "@/pages/MainPage.tsx";
import type {RouteProps} from "react-router-dom";
import {QuizPage} from "@/pages/QuizPage.tsx";

export type AppRoutes = "main" | "quiz";

export const RoutePaths: Record<AppRoutes, string> = {
    main: "/",
    quiz: "/quiz"
};

export const routerConfig: Record<AppRoutes, RouteProps> = {
    main: {
        path: RoutePaths.main,
        element: <MainPage/>,
    },

    quiz: {
        path: RoutePaths.quiz,
        element: <QuizPage/>,
	
    }
};
