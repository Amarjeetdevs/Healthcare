
import {useEffect,useState} from "react";
import PropTypes from "prop-types";
import { Link, NavLink } from "react-router-dom";
import { XMarkIcon } from "@heroicons/react/24/outline";
import process from "process";
import {
  Button,
  IconButton,
  Typography,
} from "@material-tailwind/react";
import { useMaterialTailwindController } from "../../context/SocketProvider";
import React from "react";
import { GetIdForDoctor } from "../../chat_utils/APIRoutes";
import axios from "axios";
import Meeting from "./Meeting";

export function DSidenav({ brandImg, brandName, routes }) {
  const [controller, dispatch] = useMaterialTailwindController();
  const [doctoruser,setDoctoruser] = useState('');
  const [doctoremail,setDocotoremail] = useState('');
  const [doctorId,setDoctorId] = useState(''); 
  const { sidenavColor, sidenavType, openSidenav } = controller;
  const sidenavTypes = {
    white: "bg-white shadow-sm",
    dark: "bg-gradient-to-br from-gray-800 to-gray-900",
    transparent: "bg-transparent",
  };


  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = JSON.parse(localStorage.getItem(process.env.REACT_APP_LOCALHOST_KEY));
        console.log('data for local storage', data);
        setDoctoruser(data.username);
        setDocotoremail(data.email);
  
        const response = await axios.post(GetIdForDoctor, { email: doctoremail, username: doctoruser });
        setDoctorId(response.data.doctor._id);
        console.log('response', response);

      } catch (error) {
        console.error('Error:', error);
      }
    };
  
    fetchData();
  }, [doctoremail, doctoruser]);
  

  console.log('id,name,email',doctorId,doctoruser,doctoremail)





return (
    <aside
      className={`${sidenavTypes[sidenavType]} ${openSidenav ? "translate-x-0" : "-translate-x-80"
        } fixed inset-0 z-50 my-4 ml-4 h-[calc(100vh-32px)] w-72 rounded-xl transition-transform duration-300 xl:translate-x-0 border bg-black border-blue-gray-100`}
    >
      <div
        className={`relative`}
      >
        
        <Link to="/dashboard" className="py-6 px-8 text-center">
          <Typography
            variant="h6"
            className="text-black text-2xl  "
          // color={sidenavType === "dark" ? "white" : "blue-gray"}
          >
            {doctoruser}
          </Typography>
        </Link>
        <IconButton
          variant="text"
          color="white"
          size="sm"
          ripple={false}
          className="absolute right-0 top-0 grid rounded-br-none rounded-tl-none xl:hidden"
        // onClick={() => setOpenSidenav(dispatch, false)}
        >
          <XMarkIcon strokeWidth={2.5} className="h-5 w-5 text-white" />
        </IconButton>
      </div>
      <div className="m-4">
        {routes.map(({ layout, title, pages }, key) => (
          <ul key={key} className="mb-4 flex flex-col gap-1">
            {title && (
              <li className="mx-3.5 mt-4 mb-2">
                <Typography
                  variant="small"
                  color={sidenavType === "dark" ? "white" : "blue-gray"}
                  className="font-black uppercase opacity-75"
                >
                  {title}
                </Typography>
              </li>
            )}
            {pages.map(({ icon, name, path }) => (
              <li key={name}>
                <NavLink to={`/${layout}${path}`}>
                  {({ isActive }) => (
                    <Button
                      variant={isActive ? "gradient" : "text"}

                      color={isActive
                        ? sidenavColor
                        : sidenavType === "dark"
                          ? "gray"
                          : "blue-gray"
                      }

                      className="flex items-center gap-4 px-4 capitalize"
                      fullWidth
                    >
                      {icon}
                      <Typography
                        color="inherit"
                        className="font-medium text-gray-500 capitalize"
                      >
                        {name}
                      </Typography>
                    </Button>
                  )}
                </NavLink>
              </li>
            ))}
          </ul>
        ))}
        
      </div>
    <div className="hidden">
    {doctorId !== undefined && <Meeting doctorId={doctorId} />}


    </div>
    </aside>
    
  );
}

DSidenav.defaultProps = {
  brandImg: "/img/logo-ct.png",
  // brandName: doctoruser,
};

DSidenav.propTypes = {
  brandImg: PropTypes.string,
  brandName: PropTypes.string,
  routes: PropTypes.arrayOf(PropTypes.object).isRequired,
};

DSidenav.displayName = "/src/widgets/layout/sidnave.jsx";

export default DSidenav;
