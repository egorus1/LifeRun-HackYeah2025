import {MainPage} from "@/pages/MainPage.tsx";
import type {RouteProps} from "react-router-dom";

export type AppRoutes = "main";

export const RoutePaths: Record<AppRoutes, string> = {
    main: "/",
};

export const routerConfig: Record<AppRoutes, RouteProps> = {
    main: {
        path: RoutePaths.main,
        element: <MainPage/>,
    },
};
