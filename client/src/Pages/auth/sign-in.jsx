import React, { useState, useEffect } from "react";
import {
  Input,
  Checkbox,
  Button,
  Typography,
} from "@material-tailwind/react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { loginRoute, loginDoctorRoutes, registerRoute } from "../../chat_utils/APIRoutes";
import process from "process";
import {
  Tabs,
  TabsHeader,
  TabsBody,
  Tab,
  TabPanel,
} from "@material-tailwind/react";
import {
  Square3Stack3DIcon,
  UserCircleIcon,
  Cog6ToothIcon,
} from "@heroicons/react/24/solid";


export function SignIn() {
  const navigate = useNavigate();

  const [values, setValues] = useState({
    username: "",
    password: "",
    doctorName: "",
  });

  const toastOptions = {
    position: "bottom-right",
    autoClose: 1000,
    pauseOnHover: true,
    draggable: true,
    theme: "dark",
  };

  useEffect(() => {
    if (localStorage.getItem(process.env.REACT_APP_LOCALHOST_KEY)) {
      // localStorage.clear();
    }
  }, []);


  useEffect(() => {
    const fetchDoctorName = () => {
      const doctorData = localStorage.getItem(process.env.REACT_APP_LOCALHOST_KEY);
      console.log('dd', doctorData)
      if (doctorData) {
        const { doctorName } = JSON.parse(doctorData);
        if (!doctorName === undefined) {
          navigate('/doctor')
        }
        else {
          navigate("/user")
        }
      }
    };
    fetchDoctorName();
  }, []);


  const handleChange = (event) => {
    setValues({ ...values, [event.target.name]: event.target.value });
  };

  // const validateForm = () => {
  //   const { username, password } = values;
  //   if (username === "" || password === "") {
  //     toast.error("UserName and Password are required.", toastOptions);
  //     return false;
  //   }
  //   return true;
  // };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (validateForm()) {
      const { username, password } = values;
      try {
        const { data } = await axios.post(loginRoute, {
          username,
          password,
        });
        if (data.status === false) {
          toast.error(data.msg, toastOptions);
        }
        if (data.status === true) {
          localStorage.setItem(
            process.env.REACT_APP_LOCALHOST_KEY,
            JSON.stringify(data.user)
          );
          navigate("/user");
        }
      } catch (error) {
        console.error("Error signing in:", error);
        toast.error("An error occurred while signing in.", toastOptions);
      }
    }
  };

  // const handleDoctorSubmit = async (event) => {
  //   event.preventDefault();
  // {
  //     const { doctorName, password } = values;
  //     try {

  //       const { data } = await axios.post(loginDoctorRoutes, {
  //         doctorName,
  //         password,
  //       });
  //         console.log('data',data)
  //       if (data.status === false) {
  //         toast.error(data.msg, toastOptions);
  //         console.log(data.msg)
  //       }
  //       if (data.status === true) {
  //         localStorage.setItem(
  //           process.env.REACT_APP_LOCALHOST_KEY,
  //           JSON.stringify(data.doctor)
  //         );


  //         navigate("/doctor");
  //       } 
  //     } catch (error) {
  //       console.error("Error signing in:", error);
  //       toast.error("An error occurred while signing in.", toastOptions);
  //     }
  //   }
  // };

  const handleDoctorSubmit = async (event) => {
    event.preventDefault();
    const { doctorName, password } = values;
    try {
      const { data } = await axios.post(loginDoctorRoutes, {
        doctorName,
        password,
      });
      console.log('data', data);
      if (data.status === false) {
        toast.error(data.msg, toastOptions);
        console.log(data.msg);
      }
      if (data.status === true) {
        // Save data to local storage
        // localStorage.setItem(
        //   process.env.REACT_APP_LOCALHOST_KEY,
        //   JSON.stringify(data.doctor)
        // );

        // Destructure and extract specific fields for the alert
        const { doctorName, email, mobileNumber, age, department, qualification, password } = data.doctor;

        // Alert to display the saved data
    

        try {
          const registerResponse = await axios.post(registerRoute, {
            username: doctorName,
            email,
            mobileNumber,
            password,
          });
          alert(`Data saved to local storage:
          Doctor Name: ${doctorName}
          Email: ${email}
          Mobile Number: ${mobileNumber}
          Age: ${age}
          Department: ${department}
          Password: ${password}
  
          Qualification: ${qualification}`);
          const { data } = registerResponse;
console.log('rd',data);
          if (data.status) {
               localStorage.setItem(
              process.env.REACT_APP_LOCALHOST_KEY,
              JSON.stringify(data.user)
            );
          } else {
            console.error('Failed to register:', data.msg);
          }

        }
        catch (error) {
          console.log('white creating new registation', error)
        }

        navigate("/doctor");
      }
    } catch (error) {
      console.error("Error signing in:", error);
      toast.error("An error occurred while signing in.", toastOptions);
    }
  };



  return (
    <section className="m-8 tab-content flex p-12 bg-white text-black gap-4">
      <div className="flex">
        <div className="w-1/2 pt-20 p-20 ">
          <Tabs value="user-signin">
            <TabsHeader className="bg-cyan-600">
              <Tab value="user-signin">
                <div className="flex items-center gap-2">
                  {/* <UserIcon className="w-5 h-5" /> */}
                  User Sign In
                </div>
              </Tab>
              <Tab value="doctor-signin">
                <div className="flex items-center gap-2">
                  <UserCircleIcon className="w-5 h-5" />
                  Doctor Sign In
                </div>
              </Tab>
              <Tab value="admin-signin">
                <div className="flex items-center gap-2">
                  <Cog6ToothIcon className="w-5 h-5" />
                  Admin Sign In
                </div>
              </Tab>
            </TabsHeader>
            <TabsBody>
              <TabPanel value="user-signin">
                <div className="text-center">
                  <Typography variant="h2" className="font-bold mb-4">
                    Sign In as User
                  </Typography>
                  <form
                    onSubmit={(event) => handleSubmit(event, "user")}
                    className="mt-8 mb-2 mx-auto w-80 max-w-screen-lg lg:w-1/2"
                  >
                    {/* User Sign In Form */}
                    <div className="mb-1 flex flex-col gap-6">
                      <Typography
                        variant="small"
                        color="blue-gray"
                        className="-mb-3 font-medium"
                      >
                        Username
                      </Typography>
                      <Input
                        size="lg"
                        type="text"
                        name="username"
                        placeholder="name@mail.com"
                        className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
                        labelProps={{
                          className: "before:content-none after:content-none",
                        }}
                        onChange={(event) => handleChange(event)}
                      />
                      <Typography
                        variant="small"
                        color="blue-gray"
                        className="-mb-3 font-medium"
                      >
                        Password
                      </Typography>
                      <Input
                        type="password"
                        name="password"
                        size="lg"
                        placeholder="********"
                        className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
                        labelProps={{
                          className: "before:content-none after:content-none",
                        }}
                        onChange={(event) => handleChange(event)}
                      />
                    </div>
                    <Checkbox
                      label={
                        <Typography
                          variant="small"
                          color="gray"
                          className="flex items-center justify-start font-medium"
                        >
                          I agree the&nbsp;
                          <a
                            href="#"
                            className="font-normal text-black transition-colors hover:text-gray-900 underline"
                          >
                            Terms and Conditions
                          </a>
                        </Typography>
                      }
                      containerProps={{ className: "-ml-2.5" }}
                    />
                    <Button className="mt-6" fullWidth type="submit">
                      Sign In
                    </Button>
                  </form>
                  <Typography
                    variant="paragraph"
                    className="text-center text-blue-gray-500 font-medium mt-4"
                  >
                    Don't have an account?{" "}
                    <Link to="/auth/sign-up" className="text-blue-900 font-bold ml-1">
                      Sign Up
                    </Link>
                  </Typography>
                </div>
              </TabPanel>
              <TabPanel value="doctor-signin">

                <div className="text-center">
                  <Typography variant="h2" className="font-bold mb-4">
                    Sign In as Doctor
                  </Typography>


                  <form
                    onSubmit={(event) => handleDoctorSubmit(event, "doctor")}
                    className="mt-8 mb-2 mx-auto w-80 max-w-screen-lg lg:w-1/2"
                  >
                    {/* User Sign In Form */}
                    <div className="mb-1 flex flex-col gap-6">
                      <Typography
                        variant="small"
                        color="blue-gray"
                        className="-mb-3 font-medium"
                      >
                        Username
                      </Typography>
                      <Input
                        size="lg"
                        type="text"
                        name="doctorName"
                        placeholder="Doctor name"
                        className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
                        labelProps={{
                          className: "before:content-none after:content-none",
                        }}
                        onChange={(event) => handleChange(event)}
                      />
                      <Typography
                        variant="small"
                        color="blue-gray"
                        className="-mb-3 font-medium"
                      >
                        Password
                      </Typography>
                      <Input
                        type="password"
                        name="password"
                        size="lg"
                        placeholder="********"
                        className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
                        labelProps={{
                          className: "before:content-none after:content-none",
                        }}
                        onChange={(event) => handleChange(event)}
                      />
                    </div>
                    <Checkbox
                      label={
                        <Typography
                          variant="small"
                          color="gray"
                          className="flex items-center justify-start font-medium"
                        >
                          I agree the&nbsp;
                          <a
                            href="#"
                            className="font-normal text-black transition-colors hover:text-gray-900 underline"
                          >
                            Terms and Conditions
                          </a>
                        </Typography>
                      }
                      containerProps={{ className: "-ml-2.5" }}
                    />
                    <Button className="mt-6" fullWidth type="submit">
                      Sign In
                    </Button>
                  </form>

                </div>
              </TabPanel>
              <TabPanel value="admin-signin">
                {/* Admin Sign In Form */}
                <div className="text-center">
                  <Typography variant="h2" className="font-bold mb-4">
                    Sign In as Admin
                  </Typography>
                  {/* Admin Sign In Form */}
                </div>
              </TabPanel>
            </TabsBody>
          </Tabs>
        </div>
        <div className="w-1/2 hidden pl-12 lg:block">
          <img
            src="https://kraftmasonryinc.com/wp-content/uploads/kmi-projects-mckenzie-willamette-medical-center-springfield-01-e1573838568666.jpg"
            className="h-full w-full object-cover rounded-3xl"
            alt="Medical Center"
          />
        </div>
        <ToastContainer />
      </div>
    </section>

  );
}

export default SignIn;
