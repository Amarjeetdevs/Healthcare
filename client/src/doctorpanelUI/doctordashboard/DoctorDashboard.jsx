import { Routes, Route } from "react-router-dom";

// import {
//   Sidenav,
//   DashboardNavbar,
//   Configurator,
//   Footer
// } from "../widgets/layout";

import DSidenav from "./DSidenav";


// import routes from "../routes";
import doctorroutes from "./DoctorRoutes";
// import { useMaterialTailwindController, setOpenConfigurator } from "../context/SocketProvider";
import { useMaterialTailwindController } from "../../context/SocketProvider";
export function DoctorDashboard() {
  const [controller, dispatch] = useMaterialTailwindController();
  const { sidenavType } = controller;

  return (
    <div className="min-h-screen bg-green-600 text-gray-800  text-xl">
      <DSidenav
        routes={doctorroutes}
        brandImg={
          sidenavType === "dark" ? "/img/logo-ct.png" : "/img/logo-ct-dark.png"
        }
      />
      <div className="p-4 xl:ml-80">
        {/* <DashboardNavbar /> */}
     
        {/* <Configurator /> */}
          {/* <IconButton
            size="lg"
            color="white"
            className="fixed bottom-8 right-8 z-40 rounded-full shadow-blue-gray-900/10"
            ripple={false}
            onClick={() => setOpenConfigurator(dispatch, true)}
          >
            <Cog6ToothIcon className="h-5 w-5" />
          </IconButton> */}
        
     
     
     
        <Routes>
          {doctorroutes.map(
            ({ layout, pages }) =>
              layout === "doctor" &&
              pages.map(({ path, element }) => (
                <Route exact path={path} element={element} />
              ))
          )}
        </Routes>
        <div className="text-blue-gray-600">
          {/* <Footer /> */}
        </div>
      </div>
    </div>
  );
}

DoctorDashboard.displayName = "/src/layout/dashboard.jsx";

export default DoctorDashboard;
