import {
  HomeIcon,
  UserCircleIcon,
  TableCellsIcon,
  InformationCircleIcon,
  ServerStackIcon,
  RectangleStackIcon,
} from "@heroicons/react/24/solid";
import { Home, Profile, Tables, Notifications } from "./Pages/dashboard";
import { SignIn, SignUp } from "./pages/auth";
import Patients from "./Pages/dashboard/Patients";
import Doctors from "./Pages/dashboard/Doctors";
import AppointmentForm from "./components/form/AppointmentForm";
import AddAvailabilityForm from "./Pages/dashboard/ScheduleDoctor";
import Appointment from "./Pages/dashboard/Appointment";

const icon = {
  className: "w-5 h-5 text-inherit",
};

export const routes = [
  {
    layout: "dashboard",
    pages: [
      {
        icon: <HomeIcon {...icon} />,
        name: "dashboard",
        path: "/",
        element: <Home />,
      },
      // {
      //   icon: <UserCircleIcon {...icon} />,
      //   name: "profile",
      //   path: "/profile",
      //   element: <Profile />,
      // },
      // {
      //   icon: <TableCellsIcon {...icon} />,
      //   name: "tables",
      //   path: "/tables",
      //   element: <Tables />,
      // },
      {
        icon: <InformationCircleIcon {...icon} />,
        name: "notifications",
        path: "/notifications",
        element: <Notifications />,
      },
      {
        icon: <InformationCircleIcon {...icon} />,
        name: "Patients",
        path: "/patients",
        element: <AppointmentForm />,
      },
      {
        icon: <InformationCircleIcon {...icon} />,
        name: "Doctor",
        path: "/doctors",
        element: <Doctors />,
      },
      {
        icon: <TableCellsIcon {...icon} />,
        name: "Schedule Time",
        path: "/schedule-time",
        element: <AddAvailabilityForm />,
      },
      {
        icon: <TableCellsIcon {...icon} />,
        name: "Appointment",
        path: "/appointment",
        element: <Appointment />,
      },
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

export default routes;
