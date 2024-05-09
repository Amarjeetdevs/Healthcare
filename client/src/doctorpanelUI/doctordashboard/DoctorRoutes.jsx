import {
    HomeIcon,
    UserCircleIcon,
    TableCellsIcon,
    InformationCircleIcon,
    ServerStackIcon,
    RectangleStackIcon,
  } from "@heroicons/react/24/solid";

  import { SignIn,SignUp } from "../../pages/auth";

import Meeting from "./Meeting";
// import { Dnotivication } from "./Dnotivication";
  import Dnotivication from "./Dnotivication";
import Chat from "../../chat_pages/Chat";
  const icon = {
    className: "w-5 h-5 text-inherit",
  };
  
  export const doctorroutes = [
    {
      layout: "doctor",
      pages: [
        // {
        //   icon: <HomeIcon {...icon} />,
        //   name: "dashboard",
        //   path: "/",
        //   element: <Home />,
        // },
        // {
        //   icon: <UserCircleIcon {...icon} />,
        //   name: "profile",
        //   path: "/profile",
        //   element: <Profile />,
        // },
        {
          icon: <TableCellsIcon {...icon} />,
          name: "Chat",
          path: "/newchat",
          element: < Chat/>,
        },
        {
          icon: <InformationCircleIcon {...icon} />,
          name: "Meeting",
          path: "/meeting",
          element: <Meeting />,
        },
        {
          icon: <InformationCircleIcon {...icon} />,
          name: "Notification",
          path: "/notification",
          element: <Dnotivication />,
        },
        // {
        //   icon: <InformationCircleIcon {...icon} />,
        //   name: "Doctor",
        //   path: "/doctors",
        //   element: <Doctors />,
        // },
        // {
        //   icon: <TableCellsIcon {...icon} />,
        //   name: "Schedule Time",
        //   path: "/schedule-time",
        //   element: <AddAvailabilityForm />,
        // },
        // {
        //   icon: <TableCellsIcon {...icon} />,
        //   name: "Appointment",
        //   path: "/appointment",
        //   element: <Appointment />,
        // },
      ],
    },
    {
      title: "auth pages",
      layout: "auth",
      pages: [
        {
          icon: <ServerStackIcon {...icon} />,
          name: "sign in",
          path: "/sign-in",
          element: <SignIn />,
        },
        {
          icon: <RectangleStackIcon {...icon} />,
          name: "sign up",
          path: "/sign-up",
          element: <SignUp />,
        },
      ],
    },
  ];
  
  export default doctorroutes;
  