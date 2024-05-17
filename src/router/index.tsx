import { Outlet, createBrowserRouter } from "react-router-dom";
import { getAllModulesRoutes } from "./router-utils";
import Home from "../modules/home/pages/Home/Home";
import { Stack } from "@mui/material";
import Sidebar from "../modules/layout/components/sidebar";

const router = createBrowserRouter([
  {
    path: "",
    element: (
      <Stack direction={"row"}>
        <Sidebar />
        <Outlet />
      </Stack>
    ),
    children: [
      {
        index: true,
        element: <Home />,
      },
      ...getAllModulesRoutes(),
    ],
  },
]);

export default router;
