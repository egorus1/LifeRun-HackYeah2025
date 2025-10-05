import {MainPage} from "@/pages/MainPage.tsx";
import type {RouteProps} from "react-router-dom";
import {QuizPage} from "@/pages/QuizPage.tsx";
import {DashboardPage} from "@/pages/DashboardPage.tsx";

export type AppRoutes = "main" | "quiz" | "dashboard";

export const RoutePaths: Record<AppRoutes, string> = {
    main: "/",
    quiz: "/quiz",
    dashboard: "/dashboard",
};

export const routerConfig: Record<AppRoutes, RouteProps> = {
    main: {
        path: RoutePaths.main,
        element: <MainPage/>,
    },

    quiz: {
        path: RoutePaths.quiz,
        element: <QuizPage/>,

    },

    dashboard: {
        path: RoutePaths.dashboard,
        element: <DashboardPage/>,

    }
};
