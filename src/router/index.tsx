import { RouteObject } from "react-router-dom";
import React, { lazy } from "react";

const Chat = lazy(() => import("@/views/Chat"));
const Settings = lazy(() => import("@/views/Settings"));
const NewChat = lazy(() => import("@/views/NewChat"));
const Mask = lazy(() => import("@/views/Mask"));

const routes: RouteObject[] = [
  {
    path: "/",
    element: <Chat />,
  },
  {
    path: "/chat",
    element: <Chat />,
  },
  {
    path: "/settings",
    element: <Settings />,
  },
  {
    path: "/new-chat",
    element: <NewChat />,
  },
  {
    path: "/masks",
    element: <Mask />,
  },
  {
    path: "/auth",
    element: "auth",
  },
];

export default routes;
